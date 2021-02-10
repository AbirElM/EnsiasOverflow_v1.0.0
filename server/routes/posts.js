const router = require("express").Router();
const User = require("../model/user");
const Question = require("../model/question");
var mongoose = require("mongoose");
const verify = require("../routes/verifyToken");
const { findById } = require("../model/user");
const multer = require("multer");


/** =================================== 
 *             UPLOAD IMAGES 
 * ======================================/
 **/
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, "../client/public/uploads/");
  },
  filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
      const ext = path.extname(file.originalname)
      if (ext !== '.jpg' && ext !== '.png' && ext !== '.mp4') {
          return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
      }
      cb(null, true)
  }
});

const upload = multer({ storage: storage }).single("file");

router.post("/uploadfiles", (req, res) => {
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err });
        }
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename });
    });
});


/** to ask questions */
router.post("/ask", verify, async (req, res) => {
  // const user_id = await User.findOne({user_id :req.body.user_id});
  // if(!user_id) {
  //     res.status(400)
  // }
  let user_id = req.user;
  let title = req.body.qst_title;
  let content = req.body.qst_content;

  if (!title || !content)
    return res.status(400).json({ msg: "Not all fields have been entered." });

  // const result = await User.find({}, null, { sort: { email: 1 }});
  const result = await User.findById(user_id);

  const question = new Question({
    user: user_id,
    qst_title: title,
    username: result.username,
    qst_content: content,
  });

  try {
    const savedQuestion = await question.save();
    res.send({ question_id: question._id });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
/** to get all questions */
router.get("/all", async (req, res) => {

  await Question.find().sort({ asked_date: -1 })
        .populate("user")
        .exec((err, questions) => {
            if (err) return  res.status(500).send(err);
            res.status(200).json(questions);
            
        });
       
});

// router.get('/all/unanswred',async (req,res)=>{
//   await Question.find().populate('user').exec((err,questions)=>{
//         if (err) res.status(500).send(err)
//         res.status(200).json(questions)
//   }).filter(qst => qst.responses.length<0)
//   console.log(questions.length)
// })


/** Displays the question by its id */
// router.get("/all/qst", async (req, res) => {
//   try {
//     const qst = await Question.findById({ _id: req.body.id });
//     res.json(qst);
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// });

// @route       GET api/questions/:questionid
// @desc        find a question by id
// @access      public
router.get("/:questionId", async (req, res) => {
  // try {
  //   const question = await Question.findById();
  //   if (!question) {
  //     return res.status(404).json({ msg: "Question not found." });
  //   }
  //   res.send(question);
  // } catch (err) {
  //   res.status(401).send({ nsg: err });
  // }
  // console.log("Hello");
 Question.findById({"_id": req.params.questionId})
        .populate('user')
        .exec((err, question) => {
          if (!question) {
                return res.status(404).json({ msg: "Question not found." });
          }
          if (err) return res.status(401).send({ nsg: err });
            res.send(question);
            
        })
        
});

// @route       POST api/questions/respond/:questionid
// @desc        RESPOND to a question
// @access      Private
router.post("/respond/:questionid", verify, async (req, res) => {
  try {
    const resp_user = await User.findById(req.user);
    const qst = await Question.findById(req.params.questionid);
    const newResponse = {
      user: req.user,
      username: resp_user.username,
      rep_content: req.body.rep_content,
    };
    qst.responses.unshift(newResponse);
    await qst.save();
    res.json(newReponse);
  } catch (err) {
   
    res.status(400).send({msg : err});
  }
});

/** Display one user's questions */
router.get("/my_questions", verify, async (req, res) => {
  const questions = await Question.find({ user: req.user });
  res.json(questions);
});

/**  DELETE api/posts/:questionid*/
// @route       DELETE api/questions/:questionid
// @desc        delete  a question
// @access      Private
router.delete("/:questionid", verify, async (req, res) => {
  try {
    const question = await Question.findById(req.params.questionid);
    if (question.user.toString() !== req.user._id)
      return res.send("Action not authorized");
    await question.remove();
    res.json({ msg: "Question removed" });
  } catch (err) {
   
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "Post not found." });
    }
    res.status(500).json({msg : err});
  }
});

router.get("/", verify, (req, res) => {
  // res.json({posts :
  //     {
  //       title : 'my first post',
  //       description : 'Random data you should not have access to without being logged in'
  // }})
  res.send(req.user._id); // The user_id is accessible to all the routes that verify the token
});

/** Modify Question */
// @route       PUT api/questions/:questionid
// @desc        update  a question
// @access      Private
router.put("/:questionid", verify, async (req, res) => {
  try {
    const question = await Question.findById(req.params.questionid);
    if (!question) return res.json({ msg: "question no found" });
    Object.assign(question, req.body);
    await question.save();
    res.json({ msg: "question updated" });
  } catch (err) {
    if (err.kind == "ObjectId") {
      /** Post not found ? */
      return res.status(404).json("post not found");
    }
    res.status(500).send("Server error.");
  }
});

/** Respond to a question * */
// @route       POST api/questions/respond/:questionid
// @desc        respond to a question
// @access      Private
// router.post("/respond/:questionid", verify, async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id).select("-password");
//     const username = user
//     const question = await Question.findById(req.params.questionid);
//     console.log(user);
//     const newReponse = {
//       user: user._id,
//       // name: user.name,
//       username : username,
//       rep_content: req.body.rep_content,
//     };
//     question.responses.unshift(newReponse);
//     await question.save();
//     console.log(user);
//     res.json(question.responses);
//   } catch (err) {
//     console.error(err.message);
//     //res.status(400).send('Server error.');
//   }
// });

/*
 ** Display the responses to a question
 */
// @route       GET api/questions/reponses/:questionid
// @desc        get the respones of a question
// @access      Public
router.get("/reponses/:questionid", async (req, res) => {
  try {
    const question = await Question.findById(req.params.questionid);
    res.send(question.responses);
  } catch (err) {
   
    res.status(400).send("Server error.");
  }
});

/** Get if user already liked the question */
// router.get("/like/:questionid", verify, async (req, res) => {
//         try {
//             const qst = await Question.findById(req.params.questionid);
//             if (!qst) return res.send({ msg: "question not found" });
//             if (
//               qst.qst_likes.filter((like) => like.user.toString() === req.user._id)
//                 .length > 0
//             ) {
//               return res.json({
//                   "liked" : 1,
//                });
//             }
//           } catch (err) {
//             console.error(err.message);
//             res.status(500).send(err);
//           }
// })
// **

// **

/**
 *Upvote a question
 */
router.put("/like/:questionid", verify, async (req, res) => {
  try {
    const qst = await Question.findById(req.params.questionid);
   
    if (!qst) return res.send({ msg: "question not found" });
    
    if (
      qst.qst_likes.filter((like) => like.user.toString() === req.user._id)
        .length > 0
    ) {
      const item = qst.qst_likes.filter((like) => like.user.toString() === req.user._id)
   
      qst.qst_likes.splice(item,1)
      //return res.status(400).json({ msg: "question already liked" });
    }
    else qst.qst_likes.unshift({ user: req.user._id });

    await qst.save();
    res.json(qst);
  } catch (err) {
  
    res.status(500).send(err);
  }
});

router.put(
  "/like/:questionid/responses/:responseid",
  verify,
  async (req, res) => {
    try {
      const question = await Question.findById(req.params.questionid);
      if (!question) return res.send({ msg: "question not found" });

      const response = question.responses.filter(
        (response) => response._id.toString() === req.params.responseid
      );

      if (
        response[0].rep_likes.filter(like => like.user.toString() === req.user._id).length > 0
      ) {
        const item = response[0].rep_likes.filter((like) => like.user.toString() === req.user._id)
        response[0].rep_likes.splice(item[0],1)

      }else{
        response[0].rep_likes.unshift({ user: req.user._id });
      }
      await question.save();
      res.json(response[0]);
     
    } catch (err) {
      
      res.status(500).send("Server error.");
    }
  }
);


// @route       PUT api/questions/like/:questionid
// @desc        unlike a question
// @access      Private
router.put("/unlike/:questionid", verify, async (req, res) => {
  try{
  const question = await Question.findById(req.params.questionid);
  if (!question) return res.send({ msg: "question not found" });
  
  if (
      question.qst_dislikes.filter((like) => like.user.toString() === req.user._id)
       .length > 0
   ) {
     return res.status(400).json({ msg: "question already disliked " });
   }
  
  const item = question.qst_likes.filter(like => like.user.toString() === req.user._id);
  
  if (
      item && question.qst_likes.filter((like) => like.user.toString() === req.user._id).length >0
   ) {
       
      question.qst_likes.splice(item,1)
   }
 
  question.qst_dislikes.unshift({user : req.user._id})
  await question.save()
  res.json(question.qst_dislikes.length)
  }catch(err){
     
      res.status(500).send('Server error.');
  }
});




/**
 * Upvote a response to a question
 */
// @route       PUT api/questions/like/:questionid/responses/:responseid
// @desc        like a response of a question
// @access      Private
router.put(
  "/like/:questionid/responses/:responseid",
  verify,
  async (req, res) => {
    try {
      const question = await Question.findById(req.params.questionid);
      if (!question) return res.send({ msg: "question not found" });
      const response = question.responses.filter(
        (response) => response._id.toString() === req.params.responseid
      );
     
      if (
        response[0].rep_likes.filter(
          (like) => like.user.toString() === req.user._id
        ).length > 0
      ) {
        return res
      .status(400)
      .json({ msg: "Response already liked." });
        // return res.status(400).json({ msg: "response already liked" });
      }
    
      response[0].rep_likes.unshift({ user: req.user._id });
      await question.save();
      res.json(response[0]);
      // res.json(question.responses.rep_likes)
    } catch (err) {
   
      res.status(500).send("Server error.");
    }
  }
);

/**
 * Downvote a response to a question
 */

// @route       PUT api/questions/unlike/:questionid/responses/:responseid
// @desc        unlike a response
// @access      Private
// router.put(
//   "/unlike/:questionid/responses/:responseid",
//   verify,
//   async (req, res) => {
//     try {
//       const question = await Question.findById(req.params.questionid);
//       if (!question) return res.send({ msg: "question not found" });
//       const response = question.responses.filter(
//         (response) => response._id.toString() === req.params.responseid
//       );
//       if (
//         response[0].rep_likes.filter(
//           (like) => like.user.toString() === req.user._id
//         ).length === 0
//       ) {
//         return res.status(400).json({ msg: "response not liked yet" });
//       }
//       const item = response[0].rep_likes
//         .map((like) => like.user)
//         .indexOf(req.user._id);
//       response[0].rep_likes.splice(item, 1);
//       await question.save();
//       res.json(response[0].rep_dislikes.length);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send("Server error.");
//     }
//   }
// );

// @route       PUT api/questions/unlike/:questionid/responses/:responseid
// @desc        unlike a response
// @access      Private
router.put(
  "/unlike/:questionid/responses/:responseid",
  verify,
  async (req, res) => {
    try {
      const question = await Question.findById(req.params.questionid);
      if (!question) return res.send({ msg: "question not found" });
      const response = question.responses.filter(
        (response) => response._id.toString() === req.params.responseid
      );

      if (
        response[0].rep_dislikes.filter(
          (like) => like.user.toString() === req.user._id
        ).length > 0
      ) {
        return res.status(400).json({ msg: "response already disliked" });
      }

      // if(response[0].rep_likes.filter(like => like.user.toString() === req.user).length === 0){
      //     return res.status(400).json({msg : "response not disliked yet"})
      // }
      const item = response[0].rep_likes
        .map((like) => like.user)
        .indexOf(req.user);
      response[0].rep_likes.splice(item, 1);
      response[0].rep_dislikes.unshift({ user: req.user });
      await question.save();
      res.json(response[0]);
    } catch (err) {
     
      res.status(500).send("Server error.");
    }
  }
);

module.exports = router;

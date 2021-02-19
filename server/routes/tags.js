const router = require("express").Router();
const User = require("../model/user");
const Question = require("../model/question");
const tag = require("../model/tag");

var mongoose = require("mongoose");
const verify = require("../routes/verifyToken");
const { findById } = require("../model/user");
const multer = require("multer");

router.post("/addtag/:qstid", (req, res) => {
  // let user_id = req.user;
  const Tag = new tag({
    tag: req.body.tag,
    question:req.params.qstid
    
  });
  try {
    Tag.save();
    res.json({
       tag_id: Tag._id,
      
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get("/all", async (req,res)=>{
     await tag.find().distinct("tag")
     .exec((err, tags) => {
         if (err) return  res.status(500).send(err);
         res.status(200).json(tags);        
     });
    // try{
    //   const tags = await tag.find()
    //   res.status(200).send(tags)
    // }catch(err){
    //   res.status(500).send({msg: err})
    // }
})

router.get('/all/tag/:tagname',async (req,res)=>{
    await tag.find({tag: req.params.tagname}).exec((err, tags) => {
    if (err) return  res.status(500).send(err);
    res.status(200).send(tags);        
});
})
module.exports = router;

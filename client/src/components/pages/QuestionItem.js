import React, { Fragment, useState, useContext } from "react";
import { Container, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import "font-awesome/css/font-awesome.min.css";
import { Link } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/UserContext";
import { message } from "antd";
import moment from "moment";
import Avatar from "antd/lib/avatar/avatar";

function QuestionItem({ qst }) {
  /**
   * Here we Initialize the states with the Number values :
   *  Like & dislike which we call in the render method
   */
  const dt = new Date(Date.now - qst.asked_date);
  const [like, setlikes] = useState([qst.qst_likes.length]);
  const [dislike, setdislikes] = useState([qst.qst_dislikes.length]);
  const userData = useContext(UserContext);
  // const [profileUrl, setprofileUrl] = useState();

  // setprofileUrl("http://localhost:3000/posts/all/UserslList/user/"+userData.userData.user)
  const url = "http://localhost:3000/posts/all/UserslList/user/";
  
  
  //   useEffect(() => {
  //     axios.get('h')
  //     .then(res => {setQsts(res.data) })
  //     .catch(err => console.log(err))
  // }, []);

  // useEffect(() => {
  //   axios
  //     .get("/posts/like")
  //     .then((res) => {
  //       setQsts(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  const handleLike = (id) => {
    // const id = _id;
    const token = userData.userData.token;
    if (token == undefined) {
      message.error("You must be logged in to perform this action.");

      setTimeout(() => {}, 2500);
    }

    axios
      .put("/posts/like/" + id, null, {
        headers: { "auth-token": localStorage.getItem("auth-token") },
      })
      .then((result) => {
        // console.log(result.data.qst_likes.length);
        setlikes(result.data.qst_likes.length);
        setdislikes(result.data.qst_dislikes.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const handleDislike = (id) => {
  //   axios
  //     .put("/posts/unlike/" + id, null, {
  //       headers: { "auth-token": localStorage.getItem("auth-token") },
  //     })
  //     .then((result) => {
  //       /**
  //        * Here the result displays the dislikes.lenght
  //        */
  //       // console.log(result.data.qst_likes.length);
  //       setlikes(result.data.qst_likes.length);
  //       setdislikes(result.data.qst_dislikes.length);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <Fragment>
      <Card style={{ width: "70vw", margin: "5px" }}>
        <Card.Body>
          <Card.Title>{qst.qst_title}</Card.Title>

          <Card.Subtitle className="mb-2 text-muted">
          <Avatar src={qst.user.pic}></Avatar>
            By :<Card.Link href={url + qst.user._id }> {qst.user.username} </Card.Link>
          </Card.Subtitle>
          <Card.Subtitle className="mb-1 text-muted">
            {" "}
            On : {qst.asked_date.substring(0, 10)}{" "}
          </Card.Subtitle>
          <Card.Subtitle className="mb-1 text-muted primary">
            {" "}
            Asked : {moment(qst.asked_date).fromNow()}
          </Card.Subtitle>
        
         

          <Card.Text>
            <div dangerouslySetInnerHTML={{ __html: qst.qst_content }}></div>
          </Card.Text>

          <Card.Text>
            <div className="tag_chip">

            <ul className='pagination'>
                {qst.tags.map((tag) => (
                  <li className='page-item' key={tag._id}>
                    <p className="page-link">{tag.tag}</p>
                  </li>
                ))}
            </ul>

            </div>
          </Card.Text>
          <div className="ml-auto">
          
            <button
              type="button"
              className="btn btn-success mr-2"
              onClick={() => {
                handleLike(qst._id);
              }}
            >
            <i className="fa fa-thumbs-up"></i>

              <span> {like} </span>
            </button>
            {/* <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                handleDislike(qst._id);
              }}
            >
              <i className="fa fa-thumbs-down"></i>{" "}
              {qst.qst_dislikes.length > 0 && <span> {dislike}</span>}
            </button> */}
            <Link
              to={`/posts/all/question/${qst._id}`}
              className="btn btn-outline-success margin"
            >
              View answers{" "}
              {qst.responses.length > 0 && (
                <span className="comment-count">{qst.responses.length}</span>
              )}
            </Link>
         
              <Button
                className=" ml-1 "
                value="Spam"
                variant="outline-warning"
              >
                {" "}
                Spam
              </Button>
            <div className="d-flex p-2 bd-highlight" >
           
            </div>
          </div>
        </Card.Body>
      </Card>
      <>
        <br></br>
      </>
    </Fragment>
  );
}

export default QuestionItem;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";

import Card from "react-bootstrap/Card";
import { Container, Button } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import { Avatar } from "@material-ui/core";

function TagDetail({ match }) {
  const [mytags, setMyTags] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [qsts, setQsts] = useState([]);
  const qstids = [];

  useEffect(async () => {
    try {
      const tags = await axios.get("/tags/all/tag/" + match.params.tagname);
      var arr = tags.data;
      arr.forEach((element, index, array) => {
        qstids.push(element.question);
      });
      console.log(qstids)
      qstids.map((qst_id) => {
        axios
          .get("/posts/" + qst_id)
          .then((res) => {
            console.log(res.data);
            qsts.push(res.data);
            setQuestions((questions) => [
              ...questions,
              questions.concat(res.data),
            ]);
          })
          .catch((err) => console.log("something wromg" + err));
      });
     setMyTags(arr)
    } catch (err) {
      console.log("catched err" + err);
    }
   
  }, []);

    
      

  
  return (
    <div className="container-fluid">
      <div>
        <div
          style={{
            // margin: "0 auto ",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card
            style={{
              width: "150px",
              justifyContent: "center",
              margin: "15px",
              backgroundColor: "#f4fdff",
            }}
          >
            <Card.Body>
              <Card.Title>{match.params.tagname}</Card.Title>
            </Card.Body>
          </Card>
        </div>
      </div>
      <div className="row">
        <div
        // style={{ backgroundSize: "10%" }}
        >
          <p style={{ justifyContent: "center", justifyItems: "center" }}>
            <h3 level={2} className="ml-5">
              {" "}
              Questions associeted {mytags.length} {" "}
            </h3>
          </p>

          <div
            style={{
              height: "2px",
              margin: "10px auto",
              background: "grey",
            }}
          ></div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {qsts.map((qst, key) => (
              <Card style={{ width: "70vw", margin: "5px" }}>
        <Card.Body>
          <Card.Title>
            
           <Link to={'/posts/all/question/'+qst._id}> {qst.qst_title}</Link>
          </Card.Title>

          <Card.Subtitle className="mb-2 text-muted">
          <Avatar src={qst.user.pic}></Avatar>
            By :<Card.Link href={qst.user._id }> {qst.user.username} </Card.Link>
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
              // onClick={() => {
              //   handleLike(qst._id);
              // }}
            >
            <i className="fa fa-thumbs-up"></i>

              {/* <span> {like} </span> */}
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TagDetail;

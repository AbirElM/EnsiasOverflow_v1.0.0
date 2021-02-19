import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Card from "react-bootstrap/Card";

import "bootstrap/dist/css/bootstrap.min.css";


function TagDetail({ match }) {
  const [mytags, setMyTags] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [qsts, setQsts] = useState([]);
  const qstids = [];

  useEffect(async () => {
    try {
      const tags = await axios.get("/tags/all/tag/" + match.params.tagname);
      // const obj = {tag: tags.data}
      // console.log(tags.data);
      const arr = tags.data;
      // const arr = [{x:100}, {x:200}, {x:300}];
      arr.forEach((element, index, array) => {     
        qstids.push(element.question);
      });
      console.log(qstids);

      qstids.map((qst_id) => {
         axios
          .get("/posts/" + qst_id)
          .then((res) => {
            console.log(res.data);
            qsts.push(res.data);
            setQuestions(questions=>[...questions,questions.concat(res.data)])
          })
          .catch((err) => console.log("something wromg" + err));
      });



      // const obj_qst = axios
      //   .get("/posts/" + qstids[0])
      //   .then((res) => {
      //     // qsts.push(res.data);
      //     console.log(res.data);
      //   })
      //   .catch((err) => console.log("something wromg" + err));
      // console.log(qstids); // 0, 1, 2

      // console.log(obj)
      // const obj = {tag: tags.data}
      // setMyTags((mytags)=> [...mytags, obj])
      // console.log(mytags)
      // await qst.map(tag=>{
      //   setQuestions(questions=>[...questions,questions.concat(tag.question)])
      //   console.log("question is"+tag.question)
      // })
    } catch (err) {
      console.log("catched err" + err);
    }
    // const fqsts = getQuestions();
    // console.log(fqsts);
  }, []);

  const getQuestions = async () => {
    try {
      await qstids.forEach((qst, index, array) => {
        axios
          .get("/posts/" + qst)
          .then((res) => {
            qsts.push(res.data);
          })
          .catch((err) => console.log("something wromg" + err));
      });
      console.log(qsts);
    } catch (err) {
      console.log(err);
    }
    // setQuestions(qsts);
    return qsts;
  };


  return (
    <div className="container-fluid">
      <div>
        <div
          style={{
            margin: "0 auto ",
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
            <h1 level={2} className="ml-5"> {" "} Questions asked </h1>
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
              <Card
                style={{
                  width: "60rem",
                  cursor: " pointer",
                  margin: "5px",
                  backgroundColor: "#f4fdff",
                }}
              >

              
                <Card.Body>
                  <Card.Text>Liked time : {qst.qst_likes.length}</Card.Text>
                  <Card.Text>
            <div dangerouslySetInnerHTML={{ __html: qst.qst_content }}></div>
          </Card.Text>

                  <Card.Text>{qst.qst_title}</Card.Text>
                  <Card.Text style={{ color: "green" }}>
                    Asked on {qst.asked_date}:
                  </Card.Text>
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

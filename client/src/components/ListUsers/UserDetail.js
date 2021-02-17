import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { Container, Button } from "react-bootstrap";

import img from "../images/avatar.png";
import "bootstrap/dist/css/bootstrap.min.css";
function UserDetail({ match }) {
  const [questions, setQuestions] = useState();
  const [user, setUser] = useState();
  console.log(match.params.id);

  useEffect(async () => {
    try {
      await axios
        .get("http://localhost:5000/api/user/userId/" + match.params.id, {
          headers: { "auth-token": localStorage.getItem("auth-token") },
        })
        .then((res) => setUser(res.data))
        .catch((err) => console.log(err));

      await axios
        .get(
          "http://localhost:5000/api/posts/questions/user/" + match.params.id,
          {
            headers: { "auth-token": localStorage.getItem("auth-token") },
          }
        )
        .then((res) => {
          setQuestions(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  }, []);
  if (questions) {
    return (
      <div className="container-fluid">
        <div className="row">
          <div
            style={{
              margin: "0 auto ",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card
              style={{ width: "70vh", justifyContent: "center", margin: "0px" }}
            >
              <Card.Body>
                <div className="row">
                  <div className="col-lg-4">
                    <Card.Img
                      src={user.pic}
                      style={{ width: "100px", height: "100px" }}
                    />
                  </div>
                  <div className="col-lg-8">
                    <Card.Title>
                      {user.fname} {user.lname}
                    </Card.Title>
                    <Card.Subtitle>{user.username}</Card.Subtitle>
                    <Card.Subtitle style={{ margin: "2px 0", color: "green" }}>
                      Total questions : {questions.length}
                    </Card.Subtitle>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
        <div className="row">
          <div style={{ backgroundSize: "70%" }} className="col-lg-12">
            <p style={{ justifyContent: "center", justifyItems: "center" }}>
              Questiosn asked
            </p>

            <div
              style={{
                width: "100%",
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
              {questions.map((value, key) => (
                <Card
                  style={{
                    width: "25%",
                    padding: "10px",
                    cursor: " pointer",
                    margin: "5px",
                    padding: "30px",
                    color: "gray",
                    borderColor: "black",
                  }}
                >
                  <Card.Body>
                    <Card.Text>{value.qst_likes.lenght}</Card.Text>
                    <Card.Text>{value.qst_title}</Card.Text>

                    <Card.Text style={{ color: "green" }}>
                      Asked on :{value.asked_date.substring(0, 10)}
                    </Card.Text>
                    <Button className="btn-danger ml-1" value="Delete">
                      {" "}
                      Delete
                    </Button>
                    <Button className="btn-info ml-1" value="Edit">
                      {" "}
                      Edit
                    </Button>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
}

export default UserDetail;

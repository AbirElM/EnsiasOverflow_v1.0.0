import React, { Fragment, useEffect, useState, useContext } from "react";
import axios from "axios";
import UserContext from "../../context/UserContext";
import { Typography } from "antd";
import Card from "react-bootstrap/Card";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { message } from "antd";
import img from "../images/avatar.png";
import "bootstrap/dist/css/bootstrap.min.css";
function UserDetail({ match }) {
  const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });

  const classes = useStyles();

  const [questions, setQuestions] = useState();
  const [user, setUser] = useState();

  const userData = useContext(UserContext);

  console.log(userData.userData.user);

  //   console.log(match.params.id);

  const { Title } = Typography;

  /**
   * Modal Card ----
   */

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const del_qst = async (e,qst_id) => {
    e.preventDefault();
    try {
      const res = await axios.delete(
        "/posts/questions/user/" + userData.userData.user + "/" + qst_id,
        {
          headers: {
            "auth-token": userData.userData.token,
          },

        },
      );
      console.log(res);
      setShow(false);
      message.success("Successfully deleted !");
      setTimeout(() => {}, 2000);
      window.location.reload();

    } catch (error) {
        message.error(error);
    }
  };

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
          //   console.log(res.data);
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
              style={{
                width: "70vh",
                justifyContent: "center",
                margin: "15px",
              }}
              className={classes.root}
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
                      Total questions :
                      <Title level={2}>{questions.length}</Title> questions
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
              <Title level={2}>Questions asked </Title>
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
                  {/* 
            _______ Model Changes_____ */}
                  <>
                    <Modal show={show} onHide={handleClose} animation={false}>
                      <Modal.Body>
                        Are you sure you want to delete this post ?
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Cancel
                        </Button>
                        <Button variant="danger" 
                        // onChange={(e) => onChange(e)}
                        onClick={(e)=> del_qst(e,value._id)}>
                          Delete
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </>

                  <Card.Body>
                    <Card.Text> {value._id}</Card.Text>
                    <Card.Text>{value.qst_likes.lenght}</Card.Text>
                    <Card.Text>{value.qst_title}</Card.Text>

                    <Card.Text style={{ color: "green" }}>
                      Asked on :{value.asked_date.substring(0, 10)}
                    </Card.Text>

                    {userData.userData.user == match.params.id ? (
                      <>
                        <Button
                          className="btn-danger ml-1"
                          value="Delete"
                          onClick={handleShow}
                        >
                          {" "}
                          Delete
                        </Button>
                        <Button className="btn-info ml-1" value="Edit">
                          {" "}
                          Edit
                        </Button>
                      </>
                    ) : (
                      <></>
                    )}
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

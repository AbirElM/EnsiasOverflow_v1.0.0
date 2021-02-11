import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import UserContext from "../../context/UserContext";
import profilepic from "../images/profile_pic.jpg";
import axios from "axios";
import {message} from 'antd';
export default function UserList() {
  const userData = useContext(UserContext);
  const [userInfo, setUserInfo] = useState([]);

  const [email, setEmail] = useState();
  const [username, setUsername] = useState();

  /**
   * Context UserID
   */
  const userId = userData.userData.user;

  const getUser = () => {
    axios
      .get("/posts/all/users/" + userId)
      .then((res) => {
        console.log(res.data);
        setUserInfo(res.data);
      })
      .catch((err) => console.log(err));
    // setUserInfo(userinfo);
  };

  // const [user, setUser] = useState({})

  useEffect(() => {
    getUser();
  }, [userId]);
  console.log("User Id :" + userId);


  const submit = async(e) => {
    //   e.preventDefault();
    console.log("submitted");

  }

  // console.log(userData.userData.user);

  if (userInfo) {
    return (
      <Container>
        <Row>
          <Col>
            <Form className="form">
              <br></br>
              <br></br>
              <img
                src={profilepic}
                alt="profils pic"
                width="60%"
                style={{
                  borderRadius: "150px",
                  marginTop: "10%",
                  marginLeft: "10%",
                }}
              />
              <Form.Group controlId="formCategory4">
                {/* <Form.Label>Profile Image</Form.Label> */}
                <Form.Control
                  type="file"
                  name="profileImage"
                  style={{
                    borderRadius: "200px",
                    marginTop: "10%",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                  }}
                />
              </Form.Group>
            </Form>
            <Col>
              <div>First registered : {userInfo.date}</div>
            </Col>
          </Col>
          <Col>
            <h1>User Profile</h1>
            <Form className="form">
              <p> Check your profile, and update your info ! </p>
              <Form.Group controlId="formCategory1">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" defaultValue={userInfo.username}
                onChange={(e) => setUsername(e.target.value)}
                
                 />
              </Form.Group>
              <Form.Group controlId="formCategory2">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" defaultValue={userInfo.email}
                onChange={(e) => setEmail(e.target.value)}
                
                 />
              </Form.Group>
              <Form.Group controlId="formCategory2">
                <Form.Label>First name</Form.Label>
                <Form.Control type="text" defaultValue={userInfo.fname} 

                />
              </Form.Group>
              <Form.Group controlId="formCategory2">
                <Form.Label>Last name</Form.Label>
                <Form.Control type="text" defaultValue={userInfo.lname} />
              </Form.Group>

              <Button variant="primary" type="submit">Update your Profile</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  } else {
    return <Container>Waiting</Container>;
  }
}

// export default UserList;

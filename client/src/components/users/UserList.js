import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import profilepic from "../images/profile_pic.jpg";
import axios from "axios";
import Modal from "antd";
import { message, avatar } from "antd";
// import Avatar from "antd/lib/avatar/avatar";
import Progress from "./Progress";

export default function UserList() {
  const userData = useContext(UserContext);

  const [userInfo, setUserInfo] = useState([]);
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [lname, setLn] = useState();
  const [fname, setFn] = useState();

  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});
  const [msg, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const [pbvisible, setPbvisible] = useState();

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
    console.log(file);
  };

  const changePicture = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    try {
      setPbvisible("visible");
      const res = await axios.put(
        "/posts/all/users/" + userId + "/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            setUploadPercentage(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              )
            );
            // Clear percentage
            setTimeout(() => setUploadPercentage(0), 5000);
            setPbvisible("hidden");
          },
        }
      );

      const { fileName, filePath } = res.data;
      setUploadedFile({ fileName, filePath });
      message.success("Profile updated successfully");
      setMessage("File Uploaded");
      console.log(message);
    } catch (err) {
      if (err.response.status === 500) {
        setMessage("There was a problem with the server");
        console.log(message);
      } else {
        setMessage(err.response.data.msg);
        console.log(message);
      }
      window.location.reload();
    }
  };
  /**
   * Context UserID
   */
  const userId = userData.userData.user;
  const currentUser = userData;
  console.log(currentUser);
  const getUser = async () => {
    await axios
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
  }, [userId, file]);
  console.log("User Id :" + userId);

  //   setPic({pic: e.target.files[0]});

  const submit = async (e) => {
    // e.preventDefault();
    const user = {
      email,
      username,
      lname,
      fname,
    };
    axios
      .put("/posts/all/users/" + userId, user)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    message.success("Profile updated successfully");

    //   history.push("/posts/all/users");

    // console.log("submitted");
  };

  // console.log(userData.userData.user);

  if (userInfo) {
    return (
      <Container>
        <Row>
          <Col>
            <Form className="form" onSubmit={changePicture}>
              <br></br>
              <br></br>
              {/* <Avatar size={64} src={profilepic}>
              </Avatar> */}
              <img
                src={userInfo.pic}
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
                  name="photo"
                  accept=".png, .jpg, .jpeg"
                  style={{
                    borderRadius: "200px",
                    marginTop: "10%",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onChange={(e) => onChange(e)}
                />
                <div
                  className=" m-auto m mt-4 mb-4"
                  style={{ visibility: pbvisible ? "visible" : "hidden" }}
                >
                  <Progress percentage={uploadPercentage} />
                </div>

                <Button
                  variant="secondary"
                  type="submit"
                  style={{
                    borderRadius: "200px",
                    marginLeft: "20%",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Update your picture
                </Button>
              </Form.Group>
            </Form>
            <Col>
              <div>First registered : {userInfo.date}</div>
            </Col>
          </Col>
          <Col>
            <h1>{userInfo.username}</h1>
            <Form className="form" onSubmit={submit}>
              <p> Check your profile, and update your info ! </p>
              <Form.Group controlId="formCategory1">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={userInfo.username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formCategory2">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  defaultValue={userInfo.email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formCategory2">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={userInfo.fname}
                  onChange={(e) => setFn(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formCategory2">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={userInfo.lname}
                  onChange={(e) => setLn(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Update your Profile
              </Button>
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

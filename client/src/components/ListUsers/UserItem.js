import React, { useState, useEffect, useContext } from "react";
import img from "../../components/images/avatar.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/esm/Card";
import axios from 'axios'


import UserContext from "../../context/UserContext";
import { Container, Button } from "react-bootstrap";
function UserItem(props) {
  const userData = useContext(UserContext);
  const [currentUser,setCurrentUser]= useState()
  const [show, setShow] = useState(false);
  const handleCloseS = () => setShow(false);
  const handleShowS = () => setShow(true);
 const user = userData.userData.user
 console.log("user is"+user)
   useEffect(async () => {
    try {
      await axios
      .get("http://localhost:5000/api/user/userId/" + userData.userData.user, {
        headers: { "auth-token": localStorage.getItem("auth-token") },
      })
      .then((res) => setCurrentUser(res.data))
      .catch((err) => console.log(err));
   }catch(err){
     console.log(err)
     }
     
    },[])
     
    
    return (
    <div className="row">
      <Card style={{ width: "100%", margin: "0 5px" }}>
        <div className="row">
          <div style={{ width: "50%" }}>
            <img
              src={props.user.pic}
              className="img-fluid"
              style={{ width: "80px", height: "80px" }}
            />
          </div>
          <div>
            <Link to={`/posts/all/UserslList/user/${props.user._id}`}>
              <Card.Text>
                {props.user.fname} {props.user.lname}
              </Card.Text>
            </Link>
            <Card.Text style={{ fontSize: "10px" }}>
              {props.user.username}
            </Card.Text>
           
                       {/* {currentUser.role === "admin" ? (
                        <>
                        <p></p>
                          <Button
                            className="btn-danger ml-1"
                            value="Signaler"
                            onClick={handleShowS}
                          >
                            {" "}
                            spam
                          </Button>
                         
                        </>
                      ) : (
                        <></>
                      )}  */}
           
          </div>
        </div>
      </Card>
    </div>
  );
}

export default UserItem;

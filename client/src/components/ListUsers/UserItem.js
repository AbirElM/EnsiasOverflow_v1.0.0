import React from 'react'
import img from '../../components/images/avatar.png'
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/esm/Card';
function UserItem(props) {
    return (
        <div className="row">
            
                <Card style={{width:"100%", margin:"0 5px"}}>
                    <div className="row">
                        <div style={{width:"50%"}}>
                            <img src={props.user.pic} className="img-fluid" style={{width:"80px", height:"80px"}} />
                        </div>
                        <div>
                            <Link to={`/posts/all/UserslList/user/${props.user._id}`} >
                                <Card.Text>{props.user.fname} {props.user.lname}</Card.Text>
                                
                            </Link>
                            <Card.Text style={{fontSize:"10px"}}>{props.user.username}</Card.Text>
                        </div>
                    </div>
                </Card>
           
        </div>
       
    )
}

export default UserItem

import React from 'react'
import img from '../../components/images/avatar.png'
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/esm/Card';
function UserItem(props) {
    return (
        
             <Card style={{
             padding: "10px",
             margin:"10px",
             cursor:"pointer",
             borderColor:'black'}}>
                <div className="col-lg-2">
                    <img src={img} className="img-fluid" />
                </div>
                <div>
                    <Link to={`/posts/all/UserslList/user/${props.user._id}`} >
                        <p>{props.user.fname} {props.user.lname}</p>
                    </Link>
            
                </div>
            
        </Card>
      
       
    )
}

export default UserItem

import React from 'react'
import img from '../../components/images/avatar.png'
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
function UserItem(props) {
    return (
        <div className="col-lg-4">
            <div className="col-lg-2">
                <img src={img} className="img-fluid" />
            </div>
            <div className="col-lg-2">
            <Link to={`/posts/all/UserslList/user/${props.user._id}`} >
                <p>{props.user.fname} {props.user.lname}</p>
            </Link>
           
            </div>
            
        </div>
    )
}

export default UserItem

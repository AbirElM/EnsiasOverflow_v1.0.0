import React ,{useState,useContext,useEffect} from 'react'
import axios from 'axios'
import UserItem from './UserItem'
import "bootstrap/dist/css/bootstrap.min.css";
function Users() {
    const [users,setUsers]= useState()
    useEffect(()=>{
        try{
            
            axios.get('http://localhost:5000/api/user/users',{
                headers: { "auth-token": localStorage.getItem("auth-token") },
              }).then(res=> setUsers(res.data)).catch(err=> console.log(err))
        }catch(err){
            console.log(err)
        }
    })
    if(users){
    return (
        <div className="container">
            {users.map((value,key)=>(
                <div className="row">
                    <div className='col-lg-12'>
                    <UserItem user={value}/>
                    </div>
                </div>
                  
                
            ))}
        </div>
    )}else{
        return(
            <div>loading</div>
        )
    }
}

export default Users

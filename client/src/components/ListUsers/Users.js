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
        <div className="container-fluid">
            {users.map((value,key)=>(
                <div style={{display: "flex",flexWrap: "wrap", justifyContent:"center"}} >
                        <UserItem style={{maxWidth: "25%",
                
                    cursor:" pointer",
                  
                   }} user={value}/>
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

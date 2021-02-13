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
             <div className="row">
                <h4 style={{justifyContent:"center"}}>List of users</h4>
            </div>
            <div className="row">
                <div style={{backgroundSize: "cover"}} className="col-lg-12">
                    <div style={{ display: "flex",  flexWrap: "wrap",justifyContent: "center"}}>
                        {users.map((value,key)=>(
                            <div  style={{padding: "10px",margin:"10px",width:"25%",cursor:"pointer",borderColor:'black'}}>
                                    <UserItem user={value}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
          
        </div>
    )}else{
        return(
            <div>loading</div>
        )
    }
}

export default Users

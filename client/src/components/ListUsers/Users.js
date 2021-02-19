import React ,{useState,useContext,useEffect} from 'react'
import axios from 'axios'
import UserItem from './UserItem'
import UserContext from "../../context/UserContext";
import "bootstrap/dist/css/bootstrap.min.css";
function Users() {
    const [users,setUsers]= useState()
    const userData = useContext(UserContext);
    const [curentUser,setCurrentUser]= useState()
    const idUser = userData.userData.user
    console.log(idUser)
    useEffect(async ()=>{
        try{
            await axios
            .get("http://localhost:5000/api/user/userId/"+ idUser, {
              headers: { "auth-token": localStorage.getItem("auth-token") },
            })
            .then((res) => {
              const arr = res.data;
              console.log(arr)
              setCurrentUser(res.data)
            })
            .catch((err) => console.log(err));
             axios.get('http://localhost:5000/api/user/users',{
                headers: { "auth-token": localStorage.getItem("auth-token") },
              }).then(res=> setUsers(res.data)).catch(err=> console.log(err))
        }catch(err){
            console.log(err)
        }
    },[curentUser])
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
                                    <UserItem user={value} id={idUser} cuser={curentUser}/>
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

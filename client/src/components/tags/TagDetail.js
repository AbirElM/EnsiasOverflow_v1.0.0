import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'

import Card from "react-bootstrap/Card";

import "bootstrap/dist/css/bootstrap.min.css";
function TagDetail({match}) {
  const [mytags, setMyTags] = useState([]);
    const [questions,setQuestions]=useState([])
    const [qsts,setQsts]= useState([])
    useEffect( ()=>{
      const fetchTags= async ()=>{
        const tags=await  axios.get('/tags/all/tag/'+match.params.tagname)
          const  tgs= await tags.data
          setMyTags(tgs)
          console.log(mytags)
      }
      const fetchQsts= ()=>{
         mytags.map((tag)=>{
          axios.get('/posts/'+tag.question).then(res=> {
            qsts.push(res.data);
            
        }).catch(err=>console.log(err))
        })
         setQuestions(qsts)
        console.log(qsts)
      }
      if(match.params.tagname){
        fetchTags()
      
      }
      if(qsts !== []){
        fetchQsts()
      }
      
    
    },[match.params.tagname, questions])

    const getQuestions = async ()=>{
      try{
        await mytags.map((tag, key)=>{

          axios.get('/posts/'+tag.question).then(res=> {
            qsts.push(res.data);
            
          }).catch(err=>console.log('something wromg'+err))
        })
      }catch(err){
        console.log(err)
      }
      console.log(qsts)
      setQuestions(qsts)
      return (qsts)
    }
    return (
      <div className="container-fluid">
      <div>
        <div
          style={{
            margin: "0 auto ",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card
            style={{
              width: "150px",
              justifyContent: "center",
              margin: "15px",
              backgroundColor: "#ebebff",
            }}
            
          >
            <Card.Body>
                  <Card.Title>
                    {match.params.tagname} 
                  </Card.Title>
            </Card.Body>
          </Card>
        </div>
      </div>
      <div className="row">
        <div style={{ backgroundSize: "70%" }} className="col-lg-12">
          <p style={{ justifyContent: "center", justifyItems: "center" }}>
            <h1 level={2}>Questions asked </h1>
          </p>

          <div
            style={{
              height: "2px",
              margin: "10px auto",
              background: "grey",
            }}
          ></div>

          <div style={{display: "flex",flexWrap: "wrap",justifyContent: "center",}}>
             {questions.map((qst, key) => (
              
                <Card
                  
                  style={{
                    width: "90rem",
                    cursor: " pointer",
                    margin: "5px",
                    backgroundColor: "#e3e7ff",
                  }}
                >
               

                  <Card.Body>
                   
                    <Card.Text>
                    Liked  time
                    </Card.Text>
                    <Card.Text>{qst.qst_title}</Card.Text>
                    <Card.Text style={{ color: "green" }}>
                      Asked on {qst.asked_date}:
                    </Card.Text>
                  </Card.Body>
                </Card>

                
             
                ))}
          </div>
        </div>
      </div>
    </div>
    )
}

export default TagDetail

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './tags.css'
function TagList() {
    const [tags,setTags]= useState()

    useEffect(async ()=>{
      try{
         await axios.get('/tags/all').then(res=>setTags(res.data)).catch(err=> console.log(err))
       
      }catch(err){
        console.log(err)
      }
    },[])
    if(tags){return (
        <div>
            <h1>List of tags</h1>
            <div className="tags">
            {tags.map((tag)=>(

                <button className="tag">{tag}</button>
            ))}
            </div>
           
        </div>
    )}else{
        return(
            <div>Hello</div>
        )
    }
}

export default TagList

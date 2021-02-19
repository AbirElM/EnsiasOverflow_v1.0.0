import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './tags.css'
import { Link } from 'react-router-dom';
function TagList() {
    const [tags,setTags]= useState()
    const [filtertags,setFiltrtags]= useState()
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
                <div className="tag">
                <Link to={`/tags/all/tag/${tag}`} className='tg'>{tag}</Link>
                </div>
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

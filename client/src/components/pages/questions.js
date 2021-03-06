import React, { Fragment, useEffect, useState, useContext } from "react";

import axios from "axios";
import QuestionItem from "../pages/QuestionItem";
import Pagination from "./pagination";
import 'bootstrap/dist/css/bootstrap.min.css'
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { message } from "antd";
import './pages.css'
import SideBar from "../layout/SideBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import QuestionList from "./questionsList";
import TagList from '../tags/TagList'
import UserList from '../users/UserList'
import Question from '../Question/Question'
import Users from '../ListUsers/Users'
import UserDetail from "../ListUsers/UserDetail";
import TagDetail from '../tags/TagDetail'
const inputstyle = {
  marginTop: "40px",
  width: "90%",
  height: "40px",
  fontSize: "20px",
  paddingLeft: "10px",
  margin: "autp",
};

const active ={
  active : true
}
const Questions = () => {
  const [qsts, setQsts] = useState([]);
  const [filtredQuestions,setfiltredQuestions]=useState(qsts)
  const [searchItem, setSearchItem] = useState("");
  const [user, setUser] = useState({});
  const [visible, setVisible] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [active,setActive] = useState(false)
  const key = qsts;

  // useEffect(() => {
  //   message.loading({ content: "Loading...", key });
  //   axios
  //     .get("/posts/all")
  //     .then((res) => {
  //       setQsts(res.data);
  //       setfiltredQuestions(res.data)
  //       setTimeout(() => {
  //         message.success({ content: "Loaded!", key, duration: 1 });
  //       }, 700);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  const questionsByFilter = (e)=>{
   if(e==='unanswred')
   { const filtredbyanswer = qsts.filter(qst => qst.responses.length<=0)
 
    setfiltredQuestions(filtredbyanswer)
    setActive(true)
   }

    if(e==='answred'){
      const filtred = qsts.filter(qst => qst.qst_likes.length>2)
 
      setfiltredQuestions(filtred)
   
    }
    if(e==='newest'){
      setfiltredQuestions(qsts)
    }
    
  }
  const loadmore = () => {
    setVisible(qsts.length);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = qsts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);





  return (
   
    <Fragment>
      <div className="page">
        <Router >
          <SideBar/>
          <Route path="/posts/all" exact component={QuestionList}/>
          <Route path="/posts/all/tags" exact  component={TagList}/>
          <Route path="/posts/all/users" exact component={UserList}/>
          <Route path="/posts/all/question/:id" exact component={Question} />
          <Route path="/posts/all/UserslList" exact component={Users} />
          <Route path="/posts/all/UserslList/user/:id" exact component={UserDetail}/>
           <Route path="/tags/all/tag/:tagname" exact component={TagDetail}/> 
        </Router>
      </div>
     
    </Fragment>
  );
};
export default Questions;

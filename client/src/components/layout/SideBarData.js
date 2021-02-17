import React from 'react'
import HomeIcon from '@material-ui/icons/Home'
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import PeopleIcon from '@material-ui/icons/People';
import profilepic from "../images/profile_pic.jpg";
import FaceIcon from '@material-ui/icons/Face';
import Avatar from "antd/lib/avatar/avatar";
import Axios from 'axios';
import {useState, useContext} from 'react';



export const  SideBarData= [
    {
        title: 'HomePage',
        icon: <HomeIcon/>,
        // link: '/posts/all',
      

        // icon: <HomeIcon/>,
        link: '/posts/all'
    },
    {
        title: 'Tags',
        icon: <LabelImportantIcon/>,
        link: '/posts/all/tags'
    },
    {
        title: 'Profile',
        icon: <FaceIcon></FaceIcon>,
        link: '/posts/all/users'
    },
    {
        title: 'Users',
        icon: <PeopleIcon/>,
        link: '/posts/all/UserslList'
    },
    
]


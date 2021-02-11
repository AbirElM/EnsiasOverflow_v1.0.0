import React from 'react'
import HomeIcon from '@material-ui/icons/Home'
import profilepic from "../images/profile_pic.jpg";
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
       
        link: '/posts/all/tags'
    },
    {
        title: 'Profile',
        icon: <Avatar src={profilepic} size='60' />,
        link: '/posts/all/users'
    },
    {
        title: 'Users',
      
        link: '/posts/all/UserslList'
    },
]


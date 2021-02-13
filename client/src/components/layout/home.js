import React from "react";
import { Fragment } from "react";
import Register from "../auth/reg";
import Login from "../auth/login";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import ErrorNotice from "../misc/ErrorNotice";
import Post_question from "../pages/post_question";
import image from '../../../src/codingitem.jpg';
import "./style.css";
export default function home() {
  return (
    <Fragment>
      <div className="container-fluid mb-5">
        <div className="row">
          <div className="col-lg logan">
            <h1 className="label">Bienvenue au EnsiasOverflow</h1>
            <p>Votre propre monde professionel</p>
            <img
              src={image}
              alt="profils pic"
              width="70%"
              style={{
                borderRadius: "150px",
                marginTop: "10%",
                marginLeft: "10%",
              }}
              
            />
          </div>
          <div className="col-lg">
            {/* <Login/> */}
            <Post_question></Post_question>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <Footer />
      </div>
    </Fragment>
  );
}

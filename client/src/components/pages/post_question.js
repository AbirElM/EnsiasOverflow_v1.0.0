import React, { useState, useContext, useEffect, Fragment } from "react";

import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";
import SuccessNotice from "../misc/SuccessNotice";
// import List from '@editorjs/list';
import ChipInput from "material-ui-chip-input";
import QuillEditor from "./editor/QuillEditor";
import { message } from "antd";
import underscore from "underscore";
export default function Post_question() {
  const userData = useContext(UserContext);

  const onEditorChange = (value) => {
    setContent(value);
    console.log(value)
  };
  const onFilesChange = (files) => {
    setFiles(files);
  };

  
  const [files, setFiles] = useState([]);
  const [qst_title, setTitle] = useState();
  const [qst_content, setContent] = useState("Default text");

  const [error, setError] = useState();

  const [success, setSuccess] = useState();
  const [tags, setTags] = useState([]);
  const [newtag, setNewtag] = useState([]);

  // Add Chips
  const handleAddChip = (chip) => {
    // setTags(tags,chip);
    setTags((tags) => [...tags, chip.toLowerCase()]);
    const obj = {tag: chip.toLowerCase()}
    setNewtag(newtag.concat(obj));

    // console.log(chip);
    console.log(newtag);
  };
  // Delete Chips
  const handleDeleteChip = (chip) => {
    setTags(underscore.without(tags, chip));
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const token = userData.userData.token;
      if (token == undefined) {
        message.error("You must be logged in to post a question.");
        setTimeout(() => {}, 2500);
      }

      const newQuestion = {
        qst_title,
        qst_content,
        newtag,
      };

      const postres = await Axios.post("/posts/ask/", newQuestion, {
        headers: { "auth-token": userData.userData.token },
      });
      console.log('qst id is'+postres.data)
      const id = postres.data
      await newtag.forEach((tg)=>{
        const tag = tg.tag.toLowerCase();
        console.log(tag)
        const ntag={tag}
         Axios.post(`/tags/addtag/${id}`,ntag)
      })
      if (postres) {
        
        // setSuccess("Question posted successfully !");
        message.success("Post Created!");
        setTimeout(() => {}, 2500);
      }
    } catch (err) {
      err.response.data.msg && message.warning(err.response.data.msg);
    }
  };
  return (
    <Fragment>
      <div>
        <div className="container">
          <form onSubmit={submit}>
            <h1 className="label text-primary"> Got a question ?</h1>

            {success && (
              <SuccessNotice
                message={success}
                clearError={() => setSuccess(undefined)}
                
              />
            )}

            <div className="form-group">
              {error && (
                <ErrorNotice
                  message={error}
                  clearError={() => setError(undefined)}
                />
              )}
              <label for="qst_title">Question title</label>
              <input
                type="text"
                className="form-control"
                id="qst_title"
                aria-describedby="Put your question title here"
                placeholder="Put your question title here"
                onChange={(e) => setTitle(e.target.value)}
              />
              <small id="qst_help" className="form-text text-muted">
                Keep it simple !
              </small>
            </div>
            <ChipInput
              value={tags}
              label="IT Tags"
              defaultValue={["question", "tags", "here"]}
              onAdd={(chip) => handleAddChip(chip)}
              onDelete={(chip, index) => handleDeleteChip(chip, index)}
            />
            <div>
              {" "}
              {/* Tags :{" "} */}
              {/* <p>
                {tags.map((tag) => (
                  <li>{tag}</li>
                ))}
              </p> */}
            </div>
            <div className="form-group">
              <label for="">Content</label>

              <div id="ql-editor">
                <QuillEditor
                  className="ql-editor"
                  // placeholder="Start Posting Something"
                  onEditorChange={onEditorChange}
                  onFilesChange={onFilesChange}
          
                  // onFilesChange={onFilesChange}
                />
              </div>
              {/* <textarea
                type="text"
                className="form-control full-width"
                id="qst_content"
                placeholder="Content of the question"
                onChange={(e) => setContent(e.target.value)}
              /> */}
            </div>

            <button type="submit" className="btn btn-primary">
              Post
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

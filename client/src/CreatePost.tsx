import React from "react";
import axios from "axios";
import {Link, useHistory} from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

import {Post} from "./Interfaces";

const CreatePost = (): JSX.Element => {
  const [state, setState] = React.useState<Post>({
    title: "",
    user: "",
  });
  const [content, setContent] = React.useState<string>("");

  const history = useHistory();

  // Destructure values from state
  const {title, user} = state;

  // onChange event handler
  const handleChange = (name: string) => (event: React.FormEvent<HTMLInputElement>) => {
    // console.log("name:", name, "event:", (event.target as HTMLInputElement ).value);
    setState({...state, [name]: (event.target as HTMLInputElement).value});
  };
  // function handleChange(name: string) {
  //   return function (event: React.FormEvent<HTMLInputElement >) {
  //     setState({...state, [name]: (event.target as HTMLInputElement ).value});
  //   };
  // }

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    // console.table({title, content, user});
    axios
      .post(`${process.env.REACT_APP_API}/post`, {title, content, user})
      .then((response) => {
        // console.log({response});
        // Empty state
        setState({...state, title: "", content: "", user: ""});
        // Show success alert
        alert(`Post titled ${response.data.title} was created`);
      })
      .catch((error) => {
        console.error(error.response);
        alert(error.response.data.error);
      });
    setTimeout(function () {
      history.push("/");
    }, 1000);
  };

  // Rich text editor handle change
  const handleContent = (event: React.SetStateAction<string>) => {
    // console.log({event});
    setContent(event);
  };

  return (
    <React.Fragment>
      <div className="container p-5">
        <h1>Crate a Post</h1>
        {/* <p>State: {JSON.stringify(state)}</p> */}
        <br />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="text-muted">Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Post title"
              required
              onChange={handleChange("title")}
              value={title}
            />
          </div>
          <div className="form-group">
            <label className="text-muted">Content</label>
            <ReactQuill
              onChange={handleContent}
              value={content}
              theme="bubble"
              className="pb-5 mb-3"
              placeholder="Write something.."
              style={{border: "1px solid #666"}}
            />
          </div>
          <div className="form-group">
            <label className="text-muted">User</label>
            <input
              type="text"
              className="form-control"
              placeholder="Your name"
              required
              onChange={handleChange("user")}
              value={user}
            />
          </div>
          <div>
            <button className="btn btn-primary" type="submit">
              Create
            </button>
            <button style={{float: "right", background: "none", padding: 0, border: "none"}}>
              <Link to="/" className="btn btn-outline-primary">
                Cancel
              </Link>
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default CreatePost;

import React from "react";
import axios from "axios";
import {Link, useHistory} from "react-router-dom";

import {Post} from "./Interfaces";

const UpdatePost = (props: {match: {params: {slug: string}}}): JSX.Element => {
  const [state, setState] = React.useState<Post>({
    title: "",
    slug: "",
    user: "",
    content: "",
  });

  const {title, slug, user, content} = state;
  const history = useHistory();

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/post/${props.match.params.slug}`)
      .then((response) => {
        const {title, slug, user, content} = response.data;
        setState({title: title, slug: slug, user: user, content: content});
      })
      .catch((error: string) => alert("Error loading single post:" + error));
  }, [props.match.params.slug]);

  // onChange event handler
  const handleChange = (name: string) => (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // console.log("name:", name, "event:", (event.target as HTMLInputElement | HTMLTextAreaElement).value);
    setState({...state, [name]: (event.target as HTMLInputElement | HTMLTextAreaElement).value});
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    // console.table({title, content, user});
    axios
      .put(`${process.env.REACT_APP_API}/post/${slug}`, {title, content, user})
      .then((response) => {
        // console.log("response.data:", response.data);
        const {title, content, slug, user} = response.data;
        setState({...state, title, content, slug, user});
        // Show success alert
        alert(`Post titled ${title} is updated`);
      })
      .catch((error) => {
        console.log(error.response);
        alert(error.response.data.error);
      });
    setTimeout(function () {
      history.push("/");
    }, 1000);
  };

  const showUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="text-muted">Title</label>
        <input
          onChange={handleChange("title")}
          value={title}
          type="text"
          className="form-control"
          placeholder="Post title"
          required
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Content</label>
        <textarea
          onChange={handleChange("content")}
          value={content}
          className="form-control"
          placeholder="Write something.."
          required
        />
      </div>
      <div className="form-group">
        <label className="text-muted">User</label>
        <input
          onChange={handleChange("user")}
          value={user}
          type="text"
          className="form-control"
          placeholder="Your name"
          required
        />
      </div>
      <div>
        <button className="btn btn-primary" type="submit">
          Update
        </button>
        <button style={{float: "right", background: "none", padding: 0, border: "none"}}>
          <Link to="/" className="btn btn-outline-primary">
            Cancel
          </Link>
        </button>
      </div>
    </form>
  );

  return (
    <div className="container pb-5">
      <br />
      <h1>Update Post</h1>
      {showUpdateForm()}
    </div>
  );
};

export default UpdatePost;

import React from "react";
import axios from "axios";

const Create = (): JSX.Element => {
  const [state, setState] = React.useState<Post>({
    title: "",
    content: "",
    user: "",
  });

  // destructure values from state
  const {title, content, user} = state;

  // onChange event handler
  const handleChange = (name: string) => (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // console.log("name:", name, "event:", (event.target as HTMLInputElement | HTMLTextAreaElement).value);
    setState({...state, [name]: (event.target as HTMLInputElement | HTMLTextAreaElement).value});
  };
  // function handleChange(name: string) {
  //   return function (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) {
  //     setState({...state, [name]: (event.target as HTMLInputElement | HTMLTextAreaElement).value});
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
        // Show sucess alert
        alert(`Post titled ${response.data.title} was created`);
      })
      .catch((error) => {
        console.error(error.response);
        alert(error.response.data.error);
      });
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
            <textarea
              className="form-control"
              placeholder="Write something.."
              required
              onChange={handleChange("content")}
              value={content}
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
            <button className="btn btn-primary">Create</button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Create;

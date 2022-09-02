import React from "react";
import axios from "axios";

import "./App.scss";
import {Post} from "./Interfaces";

function App(): JSX.Element {
  const [posts, setPosts] = React.useState<Post[]>([]);

  const fetchPosts = (): void => {
    axios
      .get(`${process.env.REACT_APP_API}/posts`)
      .then((response) => {
        // console.log({response});
        // console.info({response});
        // console.error({response});
        // console.warn({response});
        setPosts(response.data);
      })
      .catch((error: string) => alert("Error fetching posts:" + error));
  };

  React.useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <React.Fragment>
      <div className="container pb-5 pt-5"></div>
      <h1 style={{textAlign: "center"}}>MERN App2 - Posts</h1>
      {posts.map((post: Post) => (
        <div className="row" key={post._id} style={{borderBottom: "1px solid silver"}}>
          <div className="col pt-3 pb-2">
            <h2>{post.title}</h2>
            <p className="lead">{post.content.substring(0, 100)}</p>
            <p>
              Author <span className="badge">{post.user}</span> Published on{" "}
              <span className="badge">{new Date(post.createdAt).toLocaleString()}</span>
            </p>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
}

export default App;

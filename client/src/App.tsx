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
        const receivedPosts = response.data;
        // console.log({receivedPosts});
        // console.info({receivedPosts});
        // console.error({receivedPosts});
        // console.warn({receivedPosts});
        setPosts(receivedPosts);
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
      {/* {JSON.stringify(posts)} */}
      {posts.map((post: Post) => (
        <div className="row" key={post._id} style={{borderBottom: "1px solid silver"}}>
          <div className="col pt-3 pb-2">
            <h2>{post.title}</h2>
            <p className="lead">{post.content.substring(0, 100)}</p>
            <p>
              Author: <span className="badge">{post.user}</span> Published on:{" "}
              <span className="badge">{new Date(post.createdAt).toLocaleString()}</span>
              {post.createdAt.toLocaleString() !== post.updatedAt.toLocaleString() && (
                <>
                  Updated on:{" "}
                  <span className="badge" style={{color: "brown"}}>
                    {new Date(post.updatedAt).toLocaleString()}
                  </span>
                </>
              )}
            </p>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
}

export default App;

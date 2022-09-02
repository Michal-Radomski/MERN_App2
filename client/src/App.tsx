import React from "react";
import axios from "axios";
import {Link} from "react-router-dom";

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

  const deleteConfirm = (slug: string) => {
    let answer = window.confirm("Are you sure you want to delete this post?");
    if (answer) {
      deletePost(slug);
    }
  };

  const deletePost = (slug: string) => {
    // console.log("Post will be deleted:", slug);
    axios
      .delete(`${process.env.REACT_APP_API}/post/${slug}`)
      .then((response) => {
        alert(response.data.message);
        fetchPosts();
      })
      .catch((error) => alert("Error deleting post:" + error));
  };

  return (
    <React.Fragment>
      <div className="container pb-5 pt-5"></div>
      <h1 style={{textAlign: "center"}}>MERN App2 - Posts</h1>
      {/* {JSON.stringify(posts)} */}
      {posts.map((post: Post) => (
        <div className="row" key={post._id} style={{borderBottom: "1px solid silver"}}>
          <div className="col pt-3 pb-2">
            <div className="row">
              <div className="col-md-10">
                <Link to={`/post/${post.slug}`}>
                  <h2>{post.title}</h2>
                </Link>
                <p className="lead">{post.content.substring(0, 100)}</p>
                <p>
                  Author: <span className="badge">{post.user}</span> Published on:{" "}
                  <span className="badge">{new Date(post.createdAt as Date).toLocaleString()}</span>
                  {(post.createdAt as Date) < (post.updatedAt as Date) && (
                    <>
                      Updated on:{" "}
                      <span className="badge" style={{color: "brown"}}>
                        {new Date(post.updatedAt as Date).toLocaleString()}
                      </span>
                    </>
                  )}
                </p>
              </div>
              <div className="col-md">
                <Link to={`/post/update/${post.slug}`} className="btn btn-sm btn-warning">
                  Update
                </Link>
                <button className="btn btn-sm btn-outline-danger ml-1" onClick={() => deleteConfirm(post.slug as string)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
}

export default App;

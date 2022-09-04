import React from "react";
import axios from "axios";
import renderHTML from "react-render-html";

import {Post} from "./Interfaces";

const SinglePost = (props: {match: {params: {slug: string}}}): JSX.Element => {
  // console.log({props});
  const [post, setPost] = React.useState<Post>({
    slug: "",
    updatedAt: undefined,
    _id: undefined,
    createdAt: undefined,
    title: "",
    content: "",
    user: "",
  });

  React.useEffect(() => {
    axios
      // .get(`${process.env.REACT_APP_API}/post/${props.match.params.slug}`)
      .get(`/post/${props.match.params.slug}`)
      .then((response) => setPost(response.data))
      .catch((error: string) => alert("Error loading single post:" + error));
  }, [props.match.params.slug]);

  const showSinglePost = () => (
    <div className="row">
      <div className="col-md-8 offset-md-2 pt-3 pb-2">
        <h1>{post?.title}</h1>
        <div className="lead pt-3">{renderHTML(post && post.content)}</div>
        <p>
          Author <span className="badge">{post?.user}</span> Published on{" "}
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
    </div>
  );

  return (
    <div className="container pb-5">
      {/* {JSON.stringify(props)} */}
      <br />
      {post && showSinglePost()}
    </div>
  );
};

export default SinglePost;

import {Request, Response} from "express";
const slugify = require("slugify");

const Post = require("../models/post");

// exports.create = (req: Request, res: Response) => {
//   console.log("req.ip:", req.ip);
//   // res.send("<h1 style='color:darkblue;text-align:center'>API is running</h1>");
//   res.json({
//     data: "You Reached Nodejs API For React-Node CRUD App - controllers",
//   });
// };

exports.create = (req: Request, res: Response) => {
  console.log("req.body:", req.body);
  const {title, content, user} = req.body;
  const slug = slugify(title, {lower: true}); //* My Post -> my-post
  console.log({slug});

  // Validate
  switch (true) {
    case !title:
      return res.status(400).json({error: "Title is required"});

    case !content:
      return res.status(400).json({error: "Content is required"});
    default:
      console.log("Everything ok");
  }
  // Create a Post
  Post.create({title, content, user, slug}, (error: string, post: Object) => {
    if (error) {
      console.log({error});
      res.status(400).json({error: "Duplicate post. Try another title"});
    }
    console.log({post});
    res.json(post);
  });
};

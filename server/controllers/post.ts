import {Request, Response} from "express";
const slugify = require("slugify");

const Post = require("../models/post");

exports.create = (req: Request, res: Response) => {
  console.log("req.body:", req.body);
  const {title, content, user} = req.body;

  // Validate
  switch (true) {
    case !title:
      return res.status(400).json({error: "Title is required"});

    case !content:
      return res.status(400).json({error: "Content is required"});
    default:
      console.log("Post was created");
  }

  const slug = slugify(title, {lower: true}); //* My Post -> my-post
  // console.log({slug});

  // Create a Post
  Post.create({title, content, user, slug}, (error: string, post: Object) => {
    if (error) {
      console.log({error});
      res.status(400).json({error: "Duplicate post. Try another title"});
    }
    // console.log({post});
    res.json(post);
  });
};

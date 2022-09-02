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

exports.list = (_req: Request, res: Response) => {
  Post.find({})
    .limit(10)
    .sort({createdAt: -1}) // Last post on the top
    .exec((error: string, posts: Object[]) => {
      if (error) {
        console.log(error);
      }
      res.json(posts);
    });
};

exports.read = (req: Request, res: Response) => {
  const {slug} = req.params;
  // console.log({slug});
  Post.findOne({slug: slug}).exec((error: string, post: Object) => {
    if (error) {
      console.log(error);
    }
    // console.log({post});
    res.json(post);
  });
};

exports.update = (req: Request, res: Response) => {
  const {slug} = req.params;
  const {title, content, user} = req.body;
  Post.findOneAndUpdate({slug}, {title, content, user}, {new: true}).exec((error: string, post: Object) => {
    if (error) console.log(error);
    res.json(post);
  });
};

exports.remove = (req: Request, res: Response) => {
  console.log(req.params.slug);
  const {slug} = req.params;
  Post.findOneAndRemove({slug}).exec((error: string, post: Object) => {
    if (error) {
      console.log({error});
    }
    console.log("Post: ", post, "was deleted");
    res.json({
      message: "Post deleted",
    });
  });
};

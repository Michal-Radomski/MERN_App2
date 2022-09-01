export {};
const express = require("express");
// import {Request, Response} from "express";

// Import controller methods
const {create} = require("../controllers/post");

const router = express.Router();

//* Route v1
// router.get("/*", (req: Request, res: Response) => {
//   console.log("req.ip:", req.ip);
//   //   res.json({
//   //     data: 'You Reached Nodejs API For React-Node CRUD App'
//   // });
//   res.send("<h1 style='color:darkblue;text-align:center'>API is running</h1>");
// });
// router.get("/post", create);

//* Route v2
router.post("/post", create);

module.exports = router;

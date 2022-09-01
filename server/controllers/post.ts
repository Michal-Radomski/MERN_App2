import {Request, Response} from "express";

exports.create = (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  // res.send("<h1 style='color:darkblue;text-align:center'>API is running</h1>");
  res.json({
    data: "You Reached Nodejs API For React-Node CRUD App - controllers",
  });
};

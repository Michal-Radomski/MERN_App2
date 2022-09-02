import {Request, Response} from "express";
const jwt = require("jsonwebtoken");

exports.login = (req: Request, res: Response) => {
  const {name, password} = req.body;
  if (password === process.env.PASSWORD) {
    // Generate token and send to client/react
    const token = jwt.sign({name}, process.env.JWT_SECRET, {expiresIn: "2h"});
    // console.log({token});
    return res.json({token, name});
  } else {
    return res.status(400).json({
      error: "Incorrect password!",
    });
  }
};

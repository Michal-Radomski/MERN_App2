const express = require("express");
import {Request, Response} from "express";
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
import path from "path";

// Import routes
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");

// App
const app = express();

// Mongo DB
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con: {connection: {host: string}}) => {
    console.log(`MongoDB Database connected with HOST: ${con.connection.host}`);
  })
  .catch((error: string) => console.log("Mongo DB Error => ", error));

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());

// Route -> Other routes moved to routes folder
// app.get("/test", (req: Request, res: Response) => {
//   console.log("req.ip:", req.ip);
//   res.send("<h1 style='color:blue;text-align:center'>API is running</h1>");
// });
//Route middleware
app.use("/api", postRoutes);
app.use("/api", authRoutes);

console.log(process.env.NODE_ENV);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req: Request, res: Response) => {
    console.log("req.ip:", req.ip);
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Port
const port = (process.env.PORT || 5000) as number;

app.listen({port: port}, () => {
  console.log(`Server is listening at http://localhost:${port}`);
  // For testing only
  console.log("Current Time:", new Date().toLocaleTimeString());
});

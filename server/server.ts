const express = require("express");
// import {Request, Response} from "express";
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// Import routes
const postRoutes = require("./routes/post");

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

// Route -> moved to routes folder //* app.get ....
//Route middleware
app.use("/api", postRoutes);

// Port
const port = (process.env.PORT || 5000) as number;

app.listen({port: port}, () => {
  console.log(`Server is listening at http://localhost:${port}`);
  // For testing only
  console.log("Current Time:", new Date().toLocaleTimeString());
});

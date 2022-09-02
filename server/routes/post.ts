export {};
const express = require("express");

// Import controller methods
const {create} = require("../controllers/post");

const router = express.Router();

router.post("/post", create);

module.exports = router;

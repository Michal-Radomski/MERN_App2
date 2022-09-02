export {};
const express = require("express");

// Import controller methods
const {create, list} = require("../controllers/post");

const router = express.Router();

router.post("/post", create);
router.get("/posts", list);

module.exports = router;

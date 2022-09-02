export {};
const express = require("express");

// Import controller methods
const {create, list, read} = require("../controllers/post");

const router = express.Router();

router.post("/post", create);
router.get("/posts", list);
router.get("/post/:slug", read);

module.exports = router;

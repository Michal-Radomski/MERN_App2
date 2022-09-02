export {};
const express = require("express");

// Import controller methods
const {create, list, read, update, remove} = require("../controllers/post");

const router = express.Router();

router.post("/post", create);
router.get("/posts", list);
router.get("/post/:slug", read);
router.put("/post/:slug", update);
router.delete("/post/:slug", remove);

module.exports = router;

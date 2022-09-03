export {};
const express = require("express");

// Import controller methods
const {create, list, read, update, remove} = require("../controllers/post");
const {requireSignIn} = require("../controllers/auth");

const router = express.Router();

router.post("/post", requireSignIn, create);
router.get("/posts", list);
router.get("/post/:slug", read);
router.put("/post/:slug", requireSignIn, update);
router.delete("/post/:slug", requireSignIn, remove);

module.exports = router;

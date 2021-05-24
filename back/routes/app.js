const express = require("express");
const router = express.Router();
const app = require("../controllers/app");

router.post("/postMessage", app.post_message);
router.post("/likeMessage", app.likeMessage);

router.post("/getMessage", app.getMessage); 
router.post("/deleteMessage", app.deleteMessage);
router.post("/followUser", app.followUser);

router.post("/retweetMessage", app.retweetMessage);
router.post("/delete_retweetMessage", app.delete_retweetMessage);

module.exports = router;



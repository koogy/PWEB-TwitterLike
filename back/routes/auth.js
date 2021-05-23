const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth");

router.post("/signIn", auth.signIn);
router.post("/signOut", auth.signOut);
module.exports = router;

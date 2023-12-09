const express = require("express");
const { handleCallback } = require("../controllers");

const router = express.Router();

router.get("/callback", handleCallback);

router.use("/lnurl", require("./lnurl"));

module.exports = router;

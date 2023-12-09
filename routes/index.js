const express = require("express");
const { handleCallback } = require("../controllers");
const { callbackRequestValidator } = require("../middleware");

const router = express.Router();

router.get("/callback", callbackRequestValidator, handleCallback);

router.use("/lnurl", require("./lnurl"));

module.exports = router;

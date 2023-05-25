const express = require("express");
const router = express.Router();
const WSU = require("../src/websocketUpgrade");

router.get("/", function (req, res, next) {
  res.render("window");
});

module.exports = router;

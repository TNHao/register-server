var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
  res.send("Hello, welcome to Tran Nhat Hao server");
});

module.exports = router;

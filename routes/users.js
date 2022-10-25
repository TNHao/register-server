var express = require("express");
var router = express.Router();

/* GET users listing. */
router.post("/", function (req, res, next) {
  const { body } = req;
  res.send(body);
});

module.exports = router;

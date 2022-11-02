var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");

const saltRounds = 10;
const userList = [];

router.post("/register", function (req, res, next) {
  const { body } = req;

  const userInfo = userList.find((user) => user.email === body.email);

  if (userInfo) {
    res.send({ error: "Tài khoản đã tồn tại!!!" });
    return;
  }

  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(body.password, salt);

  const { confirmPassword, password, ...rest } = body;

  userList.push({ ...rest, password: hash });
  res.send(body);
});

router.post("/login", function (req, res, next) {
  const { body } = req;

  const userInfo = userList.find((user) => user.email === body.email);

  if (!userInfo) {
    res.send({ error: "Tài khoản không tồn tại!!!" });
    return;
  }

  const check = bcrypt.compareSync(body.password, userInfo.password);

  if (check) {
    res.send(userInfo);
  } else res.send({ error: "Sai mật khẩu!!!" });
});

router.get("/", function (req, res, next) {
  const { email } = req.query;
  const user = userList.find((user) => user.email === email);

  res.send(user ? user : { error: "Không tìm thấy" });
});

module.exports = router;

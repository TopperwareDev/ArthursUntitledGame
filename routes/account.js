var express = require("express");
var router = express.Router();

const AT = require("../src/database/databaseTables/accountsTable");

router.get("/login", function (req, res, next) {
  res.render("login");
});

router.post("/login", function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (
    email == undefined ||
    email == "" ||
    password == undefined ||
    password == ""
  ) {
    res.render("login", { message: "cannot leave fields empty" });
    return;
  }

  AT.getAccount(email, (result) => {
    if (!result || result.password != password) {
      res.render("login", { message: "password or username incorrect" });
      return;
    }
    req.session.username = result.username;
    res.redirect("/");
  });
});

router.get("/register", function (req, res, next) {
  res.render("register");
});

router.post("/register", function (request, res, next) {
  const username = request.body.username;
  const email = request.body.email;
  const password = request.body.password;
  const repassword = request.body.repassword;

  if (password != repassword) {
    res.render("register", { message: "passwords must match" });
    return;
  }

  if (username.length < 5) {
    res.render("register", {
      message: "username must be longer than 5 characters",
    });
    return;
  }

  if (password.length < 5) {
    res.render("register", {
      message: "password cannot be less than 5 characters",
    });
    return;
  }

  AT.addAccount(username, email, password, (status) => {
    if (!status) {
      res.render("register", { message: "username is already taken" });
      return;
    }
    res.redirect("/account/login");
  });
});

router.get("/logout", function (req, res, next) {
  req.session.username = undefined;
  res.redirect("/");
});

module.exports = router;

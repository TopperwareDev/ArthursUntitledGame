function isauthenticated(req, res, next) {
  console.log(req.session.id);
  if (req.session.accountID !== undefined) {
    next();
  } else {
    res.render("../views/login", {message: 'You are not logged in'}); // Redirect to the login page
  }
}

module.exports = { isauthenticated };

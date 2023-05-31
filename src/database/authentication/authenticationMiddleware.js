function isauthenticated(req, res, next) {
  if (req.session.username !== undefined) {
    next();
  } else {
    res.render("../views/login", {message: 'You are not logged in'}); // Redirect to the login page
  }
}

module.exports = { isauthenticated };

var createError = require("http-errors");
var express = require("express");
const session = require("express-session");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const preperationManager = require("./src/clientGame/preperation/preperationManager");

var app = express();

//session
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    store: new session.MemoryStore(),
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

preperationManager.init(() => {
  //initiate routes
  routes(app);

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404));
  });
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("presets/defaults/error");
});

module.exports = app;

function routes(app) {
  const authenticationMiddleware = require("./src/database/authentication/authenticationMiddleware");
  var indexRouter = require("./routes/index");
  var windowRouter = require("./routes/window");
  var accountRouter = require("./routes/account");
  var networkRouter = require("./routes/network");

  app.use("/", indexRouter);
  app.use("/window", authenticationMiddleware.isauthenticated, windowRouter);
  app.use("/account", accountRouter);
  app.use("/network", networkRouter);
}

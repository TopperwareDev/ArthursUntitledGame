serverStartUpText();
var createError = require("http-errors");
var express = require("express");
const session = require("express-session");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
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

//initiate routes
routes(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
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

  var indexRouter = require("./routes/index");
  app.use("/", indexRouter);

  var accountRouter = require("./routes/account");
  app.use("/account", accountRouter);

  const authenticationMiddleware = require("./src/auth/authenticationMiddleware");
  var gameplayRouter = require("./routes/gameplay");
  app.use("/gameplay", authenticationMiddleware.isauthenticated, gameplayRouter);
}

function serverStartUpText() {
  console.clear();
  console.log(`
  
  ______             __      __                                           
 /      \\           |  \\    |  \\                                          
|  $$$$$$\\  ______  _| $$_   | $$____   __    __   ______   
| $$__| $$ /      \\|   $$ \\  | $$    \\ |  \\  |  \\ /      \\       
| $$    $$|  $$$$$$\\$$$$$$  | $$$$$$$\\| $$  | $$|  $$$$$$\\|        
| $$$$$$$$| $$   \\$$ | $$ __ | $$  | $$| $$  | $$| $$   \\$$       
| $$  | $$| $$       | $$|  \\| $$  | $$| $$__/ $$| $$            
| $$  | $$| $$        \\$$  $$| $$  | $$ \\$$    $$| $$                  
 \\$$   \\$$ \\$$         \\$$$$  \\$$   \\$$  \\$$$$$$          
                                                                                                                                          
  `);
  console.log("Time of last refresh: " + 123123);
}

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

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
  res.render("error");
});

module.exports = app;

serverStartUpText();

function routes(app) {
  var indexRouter = require("./routes/index");
  var windowRouter = require("./routes/window");

  app.use("/", indexRouter);
  app.use("/window", windowRouter);
}

function serverStartUpText(){
  console.log(`
  
  ______              __      __                                           
 /      \            |  \    |  \                                          
|  $$$$$$\  ______  _| $$_   | $$____   __    __   ______    _______       
| $$__| $$ /      \|   $$ \  | $$    \ |  \  |  \ /      \  /       \      
| $$    $$|  $$$$$$\\$$$$$$  | $$$$$$$\| $$  | $$|  $$$$$$\|  $$$$$$$      
| $$$$$$$$| $$   \$$ | $$ __ | $$  | $$| $$  | $$| $$   \$$ \$$    \       
| $$  | $$| $$       | $$|  \| $$  | $$| $$__/ $$| $$       _\$$$$$$\      
| $$  | $$| $$        \$$  $$| $$  | $$ \$$    $$| $$      |       $$      
 \$$   \$$ \$$         \$$$$  \$$   \$$  \$$$$$$  \$$       \$$$$$$$       
                                                                           
                                                                           
                                                                           
                      __      __    __      __                  __         
                     |  \    |  \  |  \    |  \                |  \        
 __    __  _______  _| $$_    \$$ _| $$_   | $$  ______    ____| $$        
|  \  |  \|       \|   $$ \  |  \|   $$ \  | $$ /      \  /      $$        
| $$  | $$| $$$$$$$\\$$$$$$  | $$ \$$$$$$  | $$|  $$$$$$\|  $$$$$$$        
| $$  | $$| $$  | $$ | $$ __ | $$  | $$ __ | $$| $$    $$| $$  | $$        
| $$__/ $$| $$  | $$ | $$|  \| $$  | $$|  \| $$| $$$$$$$$| $$__| $$        
 \$$    $$| $$  | $$  \$$  $$| $$   \$$  $$| $$ \$$     \ \$$    $$        
  \$$$$$$  \$$   \$$   \$$$$  \$$    \$$$$  \$$  \$$$$$$$  \$$$$$$$        
                                                                           
                                                                           
                                                                           
                                                                           
                                                                           
  ______    ______   ______ ____    ______                                 
 /      \  |      \ |      \    \  /      \                                
|  $$$$$$\  \$$$$$$\| $$$$$$\$$$$\|  $$$$$$\                               
| $$  | $$ /      $$| $$ | $$ | $$| $$    $$                               
| $$__| $$|  $$$$$$$| $$ | $$ | $$| $$$$$$$$                               
 \$$    $$ \$$    $$| $$ | $$ | $$ \$$     \                               
 _\$$$$$$$  \$$$$$$$ \$$  \$$  \$$  \$$$$$$$                               
|  \__| $$                                                                 
 \$$    $$                                                                 
  \$$$$$$                                                                  

  
  `);
}

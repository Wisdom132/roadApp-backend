const createError = require("http-errors");
const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const indexRouter = require("./api/routes/index");
const usersRouter = require("./api/routes/users");
const planRouter = require("./api/routes/plan");
const cors = require("cors");
const config = require("./config/db");

//bodyparser
app.use(bodyParser.json()); //config json
app.use(bodyParser.urlencoded({ extended: false })); //config urlencoded
app.use(cors());
//setup db
mongoose.set("useCreateIndex", true);
mongoose
  .connect(config.database, { useNewUrlParser: true })
  .then(() => {
    console.log("Database is connected");
  })
  .catch(err => {
    console.log({ database_error: err });
  });

app.use(logger("dev"));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/public")));

app.get("/",(req,res) => {
  res.json('Hello from root')
})

app.use("/admin", indexRouter);
app.use("/user", usersRouter);
app.use("/plan", planRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;

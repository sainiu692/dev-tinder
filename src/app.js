const express = require("express");

const app = express();



app.use("/",(req, res, next) => {
  console.log("middleware 1");
  // res.send("middleware 1");
  next();
});
app.get("/user", (req, res, next) => {
  console.log("handling router 1!!");
  next();
  res.send("middleware 2");
});
app.get("/user", (req, res, next) => {
  console.log("request handler router 2!!");
  res.send("request handling router");
  next();
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

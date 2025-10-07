const express = require("express");

const app = express();

app.get("/user", [
  (req, res, next) => {
    console.log("handling router 1!!");
    next();
    res.send("1st router");
  },
  (req, res, next) => {
    console.log("handling router 2!!");
    res.send("2nd router");
  },
  (req, res, next) => {
    console.log("handling router 3!!");
    res.send("3rd router");
  },
  (req, res, next) => {
    console.log("handling router 4!!");
    res.send("4th router");
  },
  (req, res, next) => {
    console.log("handling router 5!!");
    res.send("5th router");
  },
]);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

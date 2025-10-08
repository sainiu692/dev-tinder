const express = require("express");

const app = express();

const {
  adminAuthMiddleware,
  userAuthMiddleware,
} = require("./middleware/auth");


app.post("/user/login", (req, res) => {
  res.send("logged In successfully");
});
app.get("/user/data", userAuthMiddleware, (req, res) => {
  res.send("data Sent to user");
});

// Middleware to handle authentication for all GET,POST,PATCH /admin routes
app.use("/admin", adminAuthMiddleware);

app.get("/admin/getAllData", (req, res, next) => {
  res.send("All data sent");
});
app.get("/admin/deleteUser", (req, res, next) => {
  res.send("User deleted");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

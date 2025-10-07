const express = require("express");

const app = express();



app.get("/user", (req, res) => {
  console.log(req.query)
  res.send({ firstName: "Ujjwal", lastName: "Saini" });
});

app.post("/user", (req, res) => {
  // saving data to db
  res.send("Data is saved successfully to db");
});

app.delete("/user", (req, res) => {
  res.send("Data is deleted successfully!!!");
});
// app.use("/user", (req, res) => {
//   res.send("HAHAHAHA");
// });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

const express = require("express");

const app = express();


app.get("/getUserData", (req, res) => {
  try 
  {
    // logic of DB call and getUserData
    throw new Error("modules not handled properly");
    res.send("User Data");
  }
  catch (err) 
  {
    res.status(500).send("Something broke up!");
  }
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something broke!");
  }
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

const express = require("express");

const app = express();


app.use("/test",(req,res)=>{
    res.send("testing server");
})
app.use("/hello",(req,res)=>{
    res.send("hello from server");
})
app.use("/",(req,res)=>{
    res.send("Saini");
})
app.listen(3000,()=>{
    console.log("Server is runninng on port 3000");
});

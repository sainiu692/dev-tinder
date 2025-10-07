Create a repository

Initialize the repository

node_modules, package.json, package-lock.json

Install express

Create a server

Listen to port 7777

Write request handlers for /test , /hello

Install nodemon and update scripts inside package.json

What are dependencies

What is the use of "-g" while npm install

Difference between caret and tilde ( ^ vs ~ )

# work till episode-3

const express = require("express");
// require("express") is a function call to Node’s built-in require function.

// It looks inside the node_modules folder, finds the "express" package, runs its main file (index.js inside express), and returns whatever that file exports via module.exports.

// So whatever Express’s main file exports — that is what express will hold.

// 🔹 Step 2: What does Express export?
// The Express library’s code (simplified) looks something like this under the hood:

// function createApplication() {
//   // creates and returns an app object
// }

// module.exports = createApplication;
// That means require("express") doesn’t return an object —
// 👉 it returns a function (called createApplication()).

// 🔹 Step 3: So what is express?
// After this line:

// const express = require("express");
// express becomes a function, not an object.
const app = express();

// 🔹 Step 4: Then what happens when we do const app = express(); ?
// Now we’re calling that function.

// express() executes the createApplication() function inside Express.

// That function internally creates and returns an application object — a complex function/object hybrid with methods like .get(), .use(), .listen(), etc.

// So:

// typeof express    // "function"
// typeof app        // "function"
// But:

// console.log(app.get);  // function
// console.log(app.use);  // function
// → because app is both a function and an object with methods (functions in JS are first-class objects, so they can have properties).

app.use("/test",(req,res)=>{
    res.send("testing server");
})
app.use("/hello",(req,res)=>{
    res.send("hello from server");
})
// app.use("/",(req,res)=>{
//     res.send("Saini");
// })
app.listen(3000,()=>{
    console.log("Server is runninng on port 3000");
});


# Episode-4

1. initialize git

2. .gitignore

3. Create a remote repo on github

4. Push all code to remote origin

5. Play with routes and route extensions ex. /hello, / , hello/2, /xyz

6. Order of the routes matter a lot

7. Install Postman app and make a workspace/collection > test API call

8. Write logic to handle GET, POST, PATCH, DELETE API Calls and test them on Postman
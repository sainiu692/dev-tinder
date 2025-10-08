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

9. Explore routing and use of ?, + , (), * in the routes

10. Use of regex in routes /a/ , /.*fly$/

11. Reading the query params in the routes

“The ? in a URL starts the query string, which contains query parameters — key-value pairs sent to the server.”

🧠 In technical terms:
? → Query String Separator

Everything after ? → Query Parameters (aka URL parameters, search parameters)

Each parameter is written as key=value

Multiple parameters are separated by &

http://localhost:3000/user?userId=707&password=testing
 
app.get("/user", (req, res) => {
  console.log(req.query)
  res.send({ firstName: "Ujjwal", lastName: "Saini" });
}); -->


 app.get("/user/:userId/:name/:password", (req, res) => {
  console.log(req.params)
  res.send({ firstName: "Ujjwal", lastName: "Saini" });
}); 

12. Reading the dynamic routes 

13. Multiple Route Handlers - Play with the code

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

14. next()

15. next function and errors along with res.send()

16. app.use("/route", rH, [rH2, rH3], rH4, rh5);

17. What is a Middleware? Why do we need it?


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

18. How express JS basically handles requests behind the scenes

19. Difference app.use and app.all

20. Write a dummy auth middleware for admin

const adminAuthMiddleware = (req, res, next) => {
  console.log("is Admin authenticated getting checked");
  const token = "xyz";
  const isAuthenticated = token === "xyz";
  if (!isAuthenticated) {
    return res.status(401).send("Unauthorized");
  } else {
    next();
  }
};

app.use("/admin", adminAuthMiddleware);

app.get("/admin/getAllData", (req, res, next) => {
  res.send("All data sent");
});
app.get("/admin/deleteUser", (req, res, next) => {
  res.send("User deleted");
});

21. Write a dummy auth middleware for all user routes, except /user/login

app.post("/user/login", (req, res) => {
  res.send("logged In successfully");
});
app.get("/user/data", userAuthMiddleware, (req, res) => {
  res.send("data Sent to user");
});


22. Error Handling using app.use("/", (err, req, res, next) = {});

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


23. Create a free cluster on MongoDB official website (Mongo Atlas)

24. Install mongoose library

25. Connect your application to the Database "Connection-url"/devTinder

26. Call the connectDB function and connect to database before starting application on 7777
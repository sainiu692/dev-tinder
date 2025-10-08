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

const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://sainiu692:5HGQvUoHNEzS16Lt@namaste-node.jkezkna.mongodb.net/devTinder"
  );
};

module.exports= {connectDB};


26. Call the connectDB function and connect to database before starting application on 7777
connectDB()
  .then(() => {
    console.log("DB connected successfully");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("DB connection error", err);
  });


27. Create a userSchema & user Model

 # schema defines the structure of every user document:
Imagine you're creating a job application form. The schema is like the blank form template that defines what information you need:

JOB APPLICATION FORM
===================
Name: _______________ (must be text)
Age: _____ (must be a number)
Email: _______________ (must be valid email)
Phone: _______________ (must be 10 digits)
Experience: _____ years (must be a number)
Skills: _______________ (text)
In Mongoose:


const jobApplicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 18,
        max: 65
    },
    email: {
        type: String,
        required: true,
        match: /^\S+@\S+\.\S+$/
    },
    phone: {
        type: String,
        length: 10
    },
    experience: {
        type: Number,
        min: 0
    },
    skills: {
        type: String
    }
});
Key Points:

✅ Schema = Empty form/template
✅ Defines WHAT fields exist and their RULES
✅ Doesn't contain actual data
✅ Just a structure/blueprint

 # 2️⃣ Model = Factory / Constructor
Definition: A model is the class or constructor function you use to create and manipulate actual data based on the schema.
const User = mongoose.model("User", userSchema);

The model is like a printing press or photocopy machine that can create actual forms from your template.

Schema (Template) → Model (Printer) → Documents (Filled Forms)
In Mongoose:

javascript
const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);
Now JobApplication is like a factory that can:

✅ Create new application forms (documents)
✅ Find existing applications in the filing cabinet (database)
✅ Update applications
✅ Delete applications
Think of it like:

javascript
// Model = Car Factory
// Schema = Car Blueprint

const Car = mongoose.model("Car", carSchema);

// Now you can:
Car.create()  // Build a new car
Car.find()    // Find cars in the lot
Car.update()  // Modify a car
Car.delete()  // Scrap a car

# 3️⃣ Creating a New Instance = Building an Actual Object
Definition: A new instance of a model is like an actual house built using the factory.
const mongoose = require("mongoose");
const newUser = new User({
  firstName: "Ujjwal",
  lastName: "Saini",
  email: "ujji@gmail.com",
  age: 22
});

await newUser.save();


const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    age:{
        type:String,
    },
    gender:{
        type:String,
    },
    
});


const User=mongoose.model("user",userSchema)

module.exports=User;


# job application example

When someone actually fills out your job application form, that's creating an instance (document).

Method 1: Using new keyword
javascript
// Person 1 fills out the form
const application1 = new JobApplication({
    name: "Ujjwal Saini",
    age: 25,
    email: "ujjwal@example.com",
    phone: "9876543210",
    experience: 3,
    skills: "JavaScript, Node.js, React"
});

// Save it to the filing cabinet (database)
await application1.save();
Real World Analogy:

1. Take a blank form (new JobApplication)
2. Fill it out with a pen (provide data)
3. Submit it to HR (save to database)


Method 2: Direct creation
javascript
// Person 2 fills and submits directly
const application2 = await JobApplication.create({
    name: "Priya Sharma",
    age: 28,
    email: "priya@example.com",
    phone: "9876543211",
    experience: 5,
    skills: "Python, Django, PostgreSQL"
});

28. Create POST /sigup API to add data to database

app.post("/signup", async (req, res) => {
  // creating a new instance of a user model
  const user = new User({
    firstName: "Virat",
    lastName: "kohli",
    email: "viru@gmail.com",
    password: "12345",
    age: "22",
    gender: "male",
  });
  await user.save();
  res.send("User signed up successfully");
});

29. Push some documents using API calls from postman
An instance of a model is called a document. Creating them and saving to the database is easy.

30. Error Handling using try , catch

app.post("/signup", async (req, res) => {
  // creating a new instance of a user model
  const user = new User({
    firstName: "Virat",
    lastName: "kohli",
    email: "viru@gmail.com",
    password: "12345",
    age: "22",
    gender: "male",
  });
  try {
    await user.save();
    res.send("User signed up successfully");
  } catch (err) {
    res.status(500).send("Error signing up user: " + err.message);
  }
});



31. JS object vs JSON (difference)

32. Add the express.json middleware to your app
app.use(express.json());


33. Make your signup API dynamic to recive data from the end user

app.post("/signup", async (req, res) => {
  // creating a new instance of a user model
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User signed up successfully");
  } catch (err) {
    res.status(500).send("Error signing up user: " + err.message);
  }
});

34. User.findOne with duplucate email ids, which object returned

app.get("/user", async (req, res) => {
  const userEmail = req.body.email;
  try {
    const users = await User.findOne({ email: userEmail });
    if (!users) {
      res.status(404).send("user not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Error fetching user: " + err.message);
  }
});

35. API- Get user by email

app.get("/user", async (req, res) => {
  const userEmail = req.body.email;
  try {
    const users = await User.find({ email: userEmail });
    // why the if block response not sending as findOne returns a single object not an array an hence length is undefined
    // and we doing undefined.length===0 which gives error and it is directly moving to catch block
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Error fetching user: " + err.message);
  }
});

36. API - Feed API - GET /feed - get all the users from the database

 Feed API -GET/feed -get all users from database

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Error fetching user: " + err.message);
  }
});

37. API - Get user by ID

38. Create a delete user API

app.delete("/user", async (req, res) => {
  try {
    const userId = req.body.userId;
    // await User.findByIdAndDelete({_id:userId});
    await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Error fetching user: " + err.message);
  }
});
39. Difference between PATCH and PUT

40. API - Update a user

// update  data of user
app.patch("/user", async (req, res) => {
  try {
    const userId = req.body._id;
    const data = req.body;
    // const user = await User.findByIdAndUpdate({ _id: userId }, data);
    const user = await User.findByIdAndUpdate(userId, data,{
      returnDocument: "after",
    });
    console.log(user);
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("Error fetching user: " + err.message);
  }
});

41. Explore the Mongoose Documention for Model methods

42. What are options in a Model.findOneAndUpdate method, explore more about it

43. API - Update the user with email ID
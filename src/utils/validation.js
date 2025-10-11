const  validator  = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    throw new Error("Enter correct data");
  }
  if (firstName.length < 3 || firstName.length > 30) {
    throw new Error("First name must be between 3 and 30 characters");
  }
  // if (lastName.length < 3 || lastName.length > 30) {
  //   throw new Error("First name must be between 3 and 30 characters");
  // } 
   if (!validator.isEmail(email)) {
    throw new Error("Invalid email address");
  } 
   if (!validator.isStrongPassword(password)) {
    throw new Error("Password is weak,enter a strong password");
  }
};

module.exports = {
  validateSignUpData,
};

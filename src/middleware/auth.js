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
const userAuthMiddleware = (req, res, next) => {
  console.log("is User authenticated getting checked");
  const token = "xyz";
  const isAuthenticated = token === "xyz";
  if (!isAuthenticated) {
    return res.status(401).send("Unauthorized");
  } else {
    next();
  }
};
module.exports = {
  adminAuthMiddleware,
  userAuthMiddleware
};

module.exports = app => {
    const auth = require("../controllers/auth.controller.js");
  
    // Login
    app.post("/api/login", auth.login);
  
    // Logout
    app.post("/api/logout", auth.logout);
  };
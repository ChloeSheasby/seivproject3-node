module.exports = app => {
    const advisors = require("../controllers/advisor.controller.js");
    const auth = require("../utils/utils.js")
  
    // Create a new Advisor
    app.post("/api/advisors", [auth.authenticate, auth.isAdmin], advisors.create);
  
    // Retrieve all Advisors
    app.get("/api/advisors", advisors.findSome);
  
    // Retrieve a single Advisor with advisorID
    app.get("/api/advisors/:advisorID", advisors.findOne);
  
    // Update a Advisor with advisorID
    app.put("/api/advisors/:advisorID", advisors.update);
  
    // Delete a Advisor with advisorID
    app.delete("/api/advisors/:advisorID", advisors.delete);
  
    // Create a new Advisor
    app.delete("/api/advisors", advisors.deleteAll);
  };
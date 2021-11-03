module.exports = app => {
    const advisors = require("../controllers/advisor.controller.js");
    const { authenticate, isAdmin, isAdminOrAdvisor, isAny } = require("../utils/utils.js")
  
    // Create a new Advisor
    app.post("/api/advisors", [authenticate, isAdmin], advisors.create);
  
    // Retrieve all Advisors
    app.get("/api/advisors", [authenticate, isAdmin], advisors.findSome);
  
    // Retrieve a single Advisor with advisorID
    app.get("/api/advisors/:advisorID", [authenticate, isAdminOrAdvisor], advisors.findOne);
  
    // Update a Advisor with advisorID
    app.put("/api/advisors/:advisorID", [authenticate, isAdminOrAdvisor], advisors.update);
  
    // Delete a Advisor with advisorID
    app.delete("/api/advisors/:advisorID", [authenticate, isAdmin], advisors.delete);
  
    // Create a new Advisor
    app.delete("/api/advisors", [authenticate, isAdmin], advisors.deleteAll);
  };
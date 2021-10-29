module.exports = app => {
    const degrees = require("../controllers/degree.controller.js");
    const { authenticate, isAdmin, isAdminOrAdvisor, isAny } = require("../utils/utils.js")

    // Create a new Degree
    app.post("/api/degrees", [authenticate, isAdmin], degrees.create);
  
    // Retrieve all Degrees
    app.get("/api/degrees", [authenticate, isAny], degrees.findSome);
  
    // Retrieve a single Degree with degreeID
    app.get("/api/degrees/:degreeID", [authenticate, isAny], degrees.findOne);
  
    // Update a Degree with degreeID
    app.put("/api/degrees/:degreeID", [authenticate, isAdmin], degrees.update);
  
    // Delete a Degree with degreeID
    app.delete("/api/degrees/:degreeID", [authenticate, isAdmin], degrees.delete);
  
    // Create a new Degree
    app.delete("/api/degrees", [authenticate, isAdmin], degrees.deleteAll);
  };
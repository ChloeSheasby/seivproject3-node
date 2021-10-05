module.exports = app => {
    const degrees = require("../controllers/degree.controller.js");
  
    // Create a new Degree
    app.post("/api/degrees", degrees.create);
  
    // Retrieve all Degrees
    app.get("/api/degrees", degrees.findSome);
  
    // Retrieve a single Degree with degreeID
    app.get("/api/degrees/:degreeID", degrees.findOne);
  
    // Update a Degree with degreeID
    app.put("/api/degrees/:degreeID", degrees.update);
  
    // Delete a Degree with degreeID
    app.delete("/api/degrees/:degreeID", degrees.delete);
  
    // Create a new Degree
    app.delete("/api/degrees", degrees.deleteAll);
  };
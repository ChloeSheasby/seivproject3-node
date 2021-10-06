module.exports = app => {
    const degree_courses = require("../controllers/degree_courses.controller.js");
  
    // Create a new Degree
    app.post("/api/degree_courses", degree_courses.create);
  
    // Retrieve all Degrees
    app.get("/api/degree_courses", degree_courses.findSome);
  
    // Retrieve a single Degree with degreeID
    app.get("/api/degree_courses/:degreeCourseID", degree_courses.findOne);
  
    // Update a Degree with degreeID
    app.put("/api/degree_courses/:degreeCourseID", degree_courses.update);
  
    // Delete a Degree with degreeID
    app.delete("/api/degree_courses/:degreeCourseID", degree_courses.delete);
  
    // Create a new Degree
    app.delete("/api/degree_courses", degree_courses.deleteAll);
  };
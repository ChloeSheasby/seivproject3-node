module.exports = app => {
    const courses = require("../controllers/course.controller.js");
  
    // Create a new Course
    app.post("/api/courses", courses.create);
  
    // Retrieve all Courses
    app.get("/api/courses", courses.findSome);
  
    // Retrieve a single Course with courseID
    app.get("/api/courses/:courseID", courses.findOne);
  
    // Update a Course with courseID
    app.put("/api/courses/:courseID", courses.update);
  
    // Delete a Course with courseID
    app.delete("/api/courses/:courseID", courses.delete);
  
    // Create a new Course
    app.delete("/api/courses", courses.deleteAll);
  };
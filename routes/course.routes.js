module.exports = app => {
    const courses = require("../controllers/course.controller.js");
    const { authenticate, isAdmin, isAdminOrAdvisor, isAny } = require("../utils/utils.js")

    // Create a new Course
    app.post("/api/courses", [authenticate, isAdmin], courses.create);
  
    // Retrieve all Courses
    app.get("/api/courses", [authenticate, isAny], courses.findSome);
  
    // Retrieve a single Course with courseID
    app.get("/api/courses/:courseID", [authenticate, isAny], courses.findOne);
  
    // Update a Course with courseID
    app.put("/api/courses/:courseID", [authenticate, isAdmin], courses.update);
  
    // Delete a Course with courseID
    app.delete("/api/courses/:courseID", [authenticate, isAdmin], courses.delete);
  
    // Create a new Course
    app.delete("/api/courses", [authenticate, isAdmin], courses.deleteAll);
  };
module.exports = app => {
    const degree_courses = require("../controllers/degree_courses.controller.js");
    const { authenticate, isAdmin, isAdminOrAdvisor, isAny } = require("../utils/utils.js")

    // Create a new Degree Course
    app.post("/api/degree_courses", [authenticate, isAdmin], degree_courses.create);
  
    // Retrieve all Degree Courses
    app.get("/api/degree_courses", [authenticate, isAny], degree_courses.findSome);
  
    // Retrieve a single Degree Course with degreeCourseID
    app.get("/api/degree_courses/:degreeCourseID", [authenticate, isAny], degree_courses.findOne);
  
    // Update a Degree Course with degreeCourseID
    app.put("/api/degree_courses/:degreeCourseID", [authenticate, isAdmin], degree_courses.update);
  
    // Delete a Degree Course with degreeCourseID
    app.delete("/api/degree_courses/:degreeCourseID", [authenticate, isAdmin], degree_courses.delete);
  
    // Create a new Degree Course
    app.delete("/api/degree_courses", [authenticate, isAdmin], degree_courses.deleteAll);
  };
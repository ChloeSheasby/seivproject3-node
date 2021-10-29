module.exports = app => {
    const student_courses = require("../controllers/student_courses.controller.js");
    const { authenticate, isAdmin, isAdminOrAdvisor, isAny } = require("../utils/utils.js")

    // Create a new Student Course
    app.post("/api/student_courses", [authenticate, isAny], student_courses.create);
  
    // Retrieve all Student Courses
    app.get("/api/student_courses", [authenticate, isAdminOrAdvisor], student_courses.findSome);
  
    // Retrieve a single Student Course with studentCourseID
    app.get("/api/student_courses/:studentCourseID", [authenticate, isAny], student_courses.findOne);
  
    // Update a Student Course with studentCourseID
    app.put("/api/student_courses/:studentCourseID", [authenticate, isAny], student_courses.update);
  
    // Delete a Student Course with studentCourseID
    app.delete("/api/student_courses/:studentCourseID", [authenticate, isAny], student_courses.delete);
  
    // Create a new Student Course
    app.delete("/api/student_courses", [authenticate, isAny], student_courses.deleteAll);
  };
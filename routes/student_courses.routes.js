module.exports = app => {
    const student_courses = require("../controllers/student_courses.controller.js");
  
    // Create a new Student Course
    app.post("/api/student_courses", student_courses.create);
  
    // Retrieve all Students
    app.get("/api/student_courses", student_courses.findSome);
  
    // Retrieve a single Student with studentCourseID
    app.get("/api/student_courses/:studentCourseID", student_courses.findOne);
  
    // Update a Student with studentCourseID
    app.put("/api/student_courses/:studentCourseID", student_courses.update);
  
    // Delete a Student with studentCourseID
    app.delete("/api/student_courses/:studentCourseID", student_courses.delete);
  
    // Create a new Student
    app.delete("/api/student_courses", student_courses.deleteAll);
  };
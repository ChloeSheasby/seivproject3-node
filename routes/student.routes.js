module.exports = app => {
    const students = require("../controllers/student.controller.js");
  
    // Create a new Student
    app.post("/api/students", students.create);
  
    // Retrieve all Students
    app.get("/api/students", students.findSome);
  
    // Retrieve a single Student with studentID
    app.get("/api/students/:studentID", students.findOne);

    app.get("/api/students/advisor/:advisorID", students.findForAdvisor);
  
    // Update a Student with studentID
    app.put("/api/students/:studentID", students.update);
  
    // Delete a Student with studentID
    app.delete("/api/students/:studentID", students.delete);
  
    // Create a new Student
    app.delete("/api/students", students.deleteAll);
  };
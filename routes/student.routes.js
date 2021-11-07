module.exports = app => {
    const students = require("../controllers/student.controller.js");
    const { authenticate, isAdmin, isAdminOrAdvisor, isAny } = require("../utils/utils.js")

    // Create a new Student
    app.post("/api/students", [authenticate, isAdmin], students.create);
  
    // Retrieve all Students
    app.get("/api/students", [authenticate, isAdminOrAdvisor], students.findSome);
  
    // Retrieve a single Student with studentID
    app.get("/api/students/:studentID", [authenticate, isAdminOrAdvisor], students.findOne);

    // Retrieve students for a specific advisor
    app.get("/api/students/advisor/:advisorID", [authenticate, isAdminOrAdvisor], students.findForAdvisor);
  
    // Update a Student with studentID
    app.put("/api/students/:studentID", [authenticate, isAny], students.update);
  
    // Delete a Student with studentID
    app.delete("/api/students/:studentID", [authenticate, isAdmin], students.delete);
  
    // Create a new Student
    app.delete("/api/students", [authenticate, isAdmin], students.deleteAll);
  };
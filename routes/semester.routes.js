module.exports = app => {
    const semesters = require("../controllers/semester.controller.js");
    const { authenticate, isAdmin, isAdminOrAdvisor, isAny } = require("../utils/utils.js")
    
    // Create a new Semester
    app.post("/api/semesters", [authenticate, isAdmin], semesters.create);
  
    // Retrieve all Semesters
    app.get("/api/semesters", [authenticate, isAny], semesters.findSome);
  
    // Retrieve a single Semester with semesterID
    app.get("/api/semesters/:semesterID", [authenticate, isAny], semesters.findOne);
  
    // Update a Semester with semesterID
    app.put("/api/semesters/:semesterID", [authenticate, isAdmin], semesters.update);
  
    // Delete a Semester with semesterID
    app.delete("/api/semesters/:semesterID", [authenticate, isAdmin], semesters.delete);
  
    // Create a new Semester
    app.delete("/api/semesters", [authenticate, isAdmin], semesters.deleteAll);
  };
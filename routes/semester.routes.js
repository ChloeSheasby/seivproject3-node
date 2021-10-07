module.exports = app => {
    const semesters = require("../controllers/semester.controller.js");
  
    // Create a new Semester
    app.post("/api/semesters", semesters.create);
  
    // Retrieve all Semesters
    app.get("/api/semesters", semesters.findSome);
  
    // Retrieve a single Semester with semesterID
    app.get("/api/semesters/:semesterID", semesters.findOne);
  
    // Update a Semester with semesterID
    app.put("/api/semesters/:semesterID", semesters.update);
  
    // Delete a Semester with semesterID
    app.delete("/api/semesters/:semesterID", semesters.delete);
  
    // Create a new Semester
    app.delete("/api/semesters", semesters.deleteAll);
  };
const Student_courses = require("../models/student_courses.model.js");

// Create and Save a new Degree_courses
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Degree Course
    const student_courses = new Student_courses({
        studentID: req.body.studentID,
        courseID: req.body.courseID,
        semesterID: req.body.semesterID,
        grade: req.body.grade,
        status: req.body.status
    });
  
    // Save Degree Course in the database
    Student_courses.create(student_courses, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Student Course."
        });
      else res.send(data);
    });
  };

// Retrieve all Degree Courses from the database.
exports.findAll = (req, res) => {
    Student_courses.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Student Courses."
        });
      else res.send(data);
    });
  };

// Retrieve all Degree Courses from the database.
exports.findSome = (req, res) => {
  Student_courses.getSome(req.query.start, req.query.length, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Student Courses."
      });
    else res.send(data);
  });
};

// Find a single Degree Course with a degreeCourseID
exports.findOne = (req, res) => {
    Student_courses.findById(req.params.studentCourseID, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Student Course with id ${req.params.studentCourseID}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Student Course with id " + req.params.studentCourseID
          });
        }
      } else res.send(data);
    });
  };

// Update a Degree Course identified by the degreeCourseID in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Student_courses.updateById(
      req.params.studentCourseID,
      new Student_courses(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Student Course with id ${req.params.studentCourseID}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Student Course with id " + req.params.studentCourseID
            });
          }
        } else res.send(data);
      }
    );
  };

// Delete a Degree Course with the specified degreeCourseID in the request
exports.delete = (req, res) => {
    Student_courses.remove(req.params.studentCourseID, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Student Course with id ${req.params.studentCourseID}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Student Course with id " + req.params.studentCourseID
          });
        }
      } else res.send({ message: `Student Course was deleted successfully!` });
    });
  };

// Delete all Degree Course from the database.
exports.deleteAll = (req, res) => {
    Students_courses.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all student courses."
        });
      else res.send({ message: `All Student Courses were deleted successfully!` });
    });
  };
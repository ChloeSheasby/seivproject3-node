const Degree_courses = require("../models/degree_courses.model.js");

// Create and Save a new Degree_courses
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Degree Course
    const degree_courses = new Degree_courses({
      degreeID: req.body.degreeID,
      courseID: req.body.courseID,
      lastUpdDate: req.body.lastUpdDate,
      lastUpdBy: req.body.lastUpdBy
    });
  
    // Save Degree Course in the database
    Degree_courses.create(degree_courses, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Degree Course."
        });
      else res.send(data);
    });
  };

// Retrieve all Degree Courses from the database.
exports.findAll = (req, res) => {
    Degree_courses.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Degree Courses."
        });
      else res.send(data);
    });
  };

// Retrieve all Degree Courses from the database.
exports.findSome = (req, res) => {
  Degree_courses.getSome(req.query.start, req.query.length, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Degree Courses."
      });
    else res.send(data);
  });
};

// retrieve all degree courses for one degree
exports.findAllForDegree = (req, res) => {
  Degree_courses.getAllForDegree(req.params.degreeID, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Degree Courses."
      });
    else res.send(data);
  });
};

// Find a single Degree Course with a degreeCourseID
exports.findOne = (req, res) => {
    Degree_courses.findById(req.params.degreeCourseID, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Degree Course with id ${req.params.degreeCourseID}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Degree Course with id " + req.params.degreeCourseID
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
  
    Degree_courses.updateById(
      req.params.degreeCourseID,
      new Degree_courses(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Degree Course with id ${req.params.degreeCourseID}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Degree Course with id " + req.params.degreeCourseID
            });
          }
        } else res.send(data);
      }
    );
  };

// Delete a Degree Course with the specified degreeCourseID in the request
exports.delete = (req, res) => {
    Degree_courses.remove(req.params.degreeCourseID, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Degree Course with id ${req.params.degreeCourseID}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Degree Course with id " + req.params.degreeCourseID
          });
        }
      } else res.send({ message: `Degree Course was deleted successfully!` });
    });
  };

// Delete all Degree Course from the database.
exports.deleteAll = (req, res) => {
    Degree_courses.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all degree_coursess."
        });
      else res.send({ message: `All Degree Courses were deleted successfully!` });
    });
  };
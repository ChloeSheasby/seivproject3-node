const Degree_courses = require("../models/degree_courses.model.js");

// Create and Save a new Degree_courses
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Degree_courses
    const degree_courses = new Degree_courses({
      degreeID: req.body.degreeID,
      courseID: req.body.courseID
    });
  
    // Save Degree_courses in the database
    Degree_courses.create(degree_courses, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Degree_courses."
        });
      else res.send(data);
    });
  };

// Retrieve all Degree_coursess from the database.
exports.findAll = (req, res) => {
    Degree_courses.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving degree_coursess."
        });
      else res.send(data);
    });
  };

// Retrieve all Degree_coursess from the database.
exports.findSome = (req, res) => {
  Degree_courses.getSome(req.query.start, req.query.length, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving degree_coursess."
      });
    else res.send(data);
  });
};

// Find a single Degree_courses with a degree_coursesID
exports.findOne = (req, res) => {
    Degree_courses.findById(req.params.degree_coursesID, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Degree_courses with id ${req.params.degree_coursesID}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Degree_courses with id " + req.params.degree_coursesID
          });
        }
      } else res.send(data);
    });
  };

// Update a Degree_courses identified by the degree_coursesID in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Degree_courses.updateById(
      req.params.degree_coursesID,
      new Degree_courses(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Degree_courses with id ${req.params.degree_coursesID}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Degree_courses with id " + req.params.degree_coursesID
            });
          }
        } else res.send(data);
      }
    );
  };

// Delete a Degree_courses with the specified degree_coursesID in the request
exports.delete = (req, res) => {
    Degree_courses.remove(req.params.degree_coursesID, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Degree_courses with id ${req.params.degree_coursesID}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Degree_courses with id " + req.params.degree_coursesID
          });
        }
      } else res.send({ message: `Degree_courses was deleted successfully!` });
    });
  };

// Delete all Degree_coursess from the database.
exports.deleteAll = (req, res) => {
    Degree_courses.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all degree_coursess."
        });
      else res.send({ message: `All Degree_coursess were deleted successfully!` });
    });
  };
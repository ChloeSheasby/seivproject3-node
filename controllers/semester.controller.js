const Semester = require("../models/semester.model.js");

// Create and Save a new Semester
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Semester
    const semester = new Semester({
      semesterID: req.body.semesterID,
      semesterName: req.body.semesterName,
      semesterType: req.body.semesterType,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      lastUpdDate: req.body.lastUpdDate,
      lastUpdBy: req.body.lastUpdBy
    });
  
    // Save Semester in the database
    Semester.create(semester, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Semester."
        });
      else res.send(data);
    });
  };

// Retrieve all Semesters from the database.
exports.findAll = (req, res) => {
    Semester.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving semesters."
        });
      else res.send(data);
    });
  };

// Retrieve all Semesters from the database.
exports.findSome = (req, res) => {
  Semester.getSome(req.query.start, req.query.length, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving semesters."
      });
    else res.send(data);
  });
};

// Find a single Semester with a semesterID
exports.findOne = (req, res) => {
    Semester.findById(req.params.semesterID, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Semester with id ${req.params.semesterID}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Semester with id " + req.params.semesterID
          });
        }
      } else res.send(data);
    });
  };

// Update a Semester identified by the semesterID in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Semester.updateById(
      req.params.semesterID,
      new Semester(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Semester with id ${req.params.semesterID}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Semester with id " + req.params.semesterID
            });
          }
        } else res.send(data);
      }
    );
  };

// Delete a Semester with the specified semesterID in the request
exports.delete = (req, res) => {
    Semester.remove(req.params.semesterID, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Semester with id ${req.params.semesterID}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Semester with id " + req.params.semesterID
          });
        }
      } else res.send({ message: `Semester was deleted successfully!` });
    });
  };

// Delete all Semesters from the database.
exports.deleteAll = (req, res) => {
    Semester.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all semesters."
        });
      else res.send({ message: `All Semesters were deleted successfully!` });
    });
  };
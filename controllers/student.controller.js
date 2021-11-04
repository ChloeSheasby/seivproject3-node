const Student = require("../models/student.model.js");

// Create and Save a new Degree
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Degree
    const student = new Student({
      degreeID: req.body.degreeID,
      advisorID: req.body.advisorID,
      fName: req.body.fName,
      lName: req.body.lName,
      email: req.body.email,
      lastUpdDate: req.body.lastUpdDate,
      lastUpdBy: req.body.lastUpdBy
    });
  
    // Save Degree in the database
    Student.create(student, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Student."
        });
      else res.send(data);
    });
  };

// Retrieve all Degrees from the database.
exports.findAll = (req, res) => {
    Student.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving students."
        });
      else res.send(data);
    });
  };

  
// Retrieve all Degrees from the database.
exports.findForAdvisor = (req, res) => {
  Student.getForAdvisor(req.params.advisorID, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving students."
      });
    else res.send(data);
  });
};

// Retrieve all Degrees from the database.
exports.findSome = (req, res) => {
  Student.getSome(req.query.start, req.query.length, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving students."
      });
    else res.send(data);
  });
};

// Find a single Degree with a degreeID
exports.findOne = (req, res) => {
    Student.findById(req.params.studentID, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Student with id ${req.params.studentID}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Student with id " + req.params.studentID
          });
        }
      } else res.send(data);
    });
  };

// Update a Degree identified by the degreeID in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Student.updateById(
      req.params.studentID,
      new Student(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Student with id ${req.params.studentID}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Student with id " + req.params.studentID
            });
          }
        } else res.send(data);
      }
    );
  };

// Delete a Degree with the specified degreeID in the request
exports.delete = (req, res) => {
    Student.remove(req.params.studentID, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Student with id ${req.params.studentID}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Student with id " + req.params.studentID
          });
        }
      } else res.send({ message: `Student was deleted successfully!` });
    });
  };

// Delete all Degrees from the database.
exports.deleteAll = (req, res) => {
    Student.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all students."
        });
      else res.send({ message: `All Degrees were deleted successfully!` });
    });
  };
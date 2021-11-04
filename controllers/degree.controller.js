const Degree = require("../models/degree.model.js");

// Create and Save a new Degree
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Degree
    const degree = new Degree({
      dept: req.body.dept,
      degreeName: req.body.degreeName,
      totalHours: req.body.totalHours,
      lastUpdDate: req.body.lastUpdDate,
      lastUpdBy: req.body.lastUpdBy
    });
  
    // Save Degree in the database
    Degree.create(degree, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Degree."
        });
      else res.send(data);
    });
  };

// Retrieve all Degrees from the database.
exports.findAll = (req, res) => {
    Degree.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving degrees."
        });
      else res.send(data);
    });
  };

// Retrieve all Degrees from the database.
exports.findSome = (req, res) => {
  Degree.getSome(req.query.start, req.query.length, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving degrees."
      });
    else res.send(data);
  });
};

// Find a single Degree with a degreeID
exports.findOne = (req, res) => {
    Degree.findById(req.params.degreeID, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Degree with id ${req.params.degreeID}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Degree with id " + req.params.degreeID
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
  
    Degree.updateById(
      req.params.degreeID,
      new Degree(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Degree with id ${req.params.degreeID}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Degree with id " + req.params.degreeID
            });
          }
        } else res.send(data);
      }
    );
  };

// Delete a Degree with the specified degreeID in the request
exports.delete = (req, res) => {
    Degree.remove(req.params.degreeID, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Degree with id ${req.params.degreeID}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Degree with id " + req.params.degreeID
          });
        }
      } else res.send({ message: `Degree was deleted successfully!` });
    });
  };

// Delete all Degrees from the database.
exports.deleteAll = (req, res) => {
    Degree.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all degrees."
        });
      else res.send({ message: `All Degrees were deleted successfully!` });
    });
  };
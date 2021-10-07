const Advisor = require("../models/advisor.model.js");

// Create and Save a new Advisor
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Advisor
    const advisor = new Advisor({
      advisorID: req.body.advisorID
    });
  
    // Save Advisor in the database
    Advisor.create(advisor, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Advisor."
        });
      else res.send(data);
    });
  };

// Retrieve all Advisors from the database.
exports.findAll = (req, res) => {
    Advisor.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving advisors."
        });
      else res.send(data);
    });
  };

// Retrieve all Advisors from the database.
exports.findSome = (req, res) => {
  Advisor.getSome(req.query.start, req.query.length, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving advisors."
      });
    else res.send(data);
  });
};

// Find a single Advisor with a advisorID
exports.findOne = (req, res) => {
    Advisor.findById(req.params.advisorID, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Advisor with id ${req.params.advisorID}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Advisor with id " + req.params.advisorID
          });
        }
      } else res.send(data);
    });
  };

// Update a Advisor identified by the advisorID in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Advisor.updateById(
      req.params.advisorID,
      new Advisor(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Advisor with id ${req.params.advisorID}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Advisor with id " + req.params.advisorID
            });
          }
        } else res.send(data);
      }
    );
  };

// Delete a Advisor with the specified advisorID in the request
exports.delete = (req, res) => {
    Advisor.remove(req.params.advisorID, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Advisor with id ${req.params.advisorID}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Advisor with id " + req.params.advisorID
          });
        }
      } else res.send({ message: `Advisor was deleted successfully!` });
    });
  };

// Delete all Advisors from the database.
exports.deleteAll = (req, res) => {
    Advisor.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all advisors."
        });
      else res.send({ message: `All Advisors were deleted successfully!` });
    });
  };
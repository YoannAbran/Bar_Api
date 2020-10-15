const db = require("../models");
const Bar = db.bar;
const Op = db.Sequelize.Op;

// Create and Save a new Bar
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nom) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Bar
  const bar = {
    nom: req.body.nom,
    adresse: req.body.adresse,
    telephone: req.body.telephone,
    horaire_jour: req.body.horaire_jour,
    reseau_sociaux: req.body.reseau_sociaux,
    photo: req.body.photo,
    latitude: req.body.latitude,
    longitude: req.body.longitude
  };

  // Save Bar in the database
  Bar.create(bar)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Bar."
      });
    });
};


// Retrieve all Bars from the database.
exports.findAll = (req, res) => {

  const nom = req.query.nom;
  var condition = nom ? { nom: { [Op.like]: `%${nom}%` } } : null;

  Bar.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};


// Find a single Bar with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Bar.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Bar with id=" + id
      });
    });
};


// Update a Bar by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Bar.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Bar was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Bar with id=${id}. Maybe Bar was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Bar with id=" + id
      });
    });
};


// Delete a Bar with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Bar.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Bar was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Bar with id=${id}. Maybe Bar was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Bar with id=" + id
      });
    });
};


// Delete all Bars from the database.
exports.deleteAll = (req, res) => {
  Bar.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Bars were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

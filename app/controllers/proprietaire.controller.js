const db = require("../models");
const Proprietaire = db.proprietaire;
const Op = db.Sequelize.Op;

// Create and Save a new Proprietaire
exports.create = (req, res) => {
  // Validate request
  if (!req.body.id_utilisateur) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Proprietaire
  const proprietaire = {

    id_utilisateur: req.body.id_utilisateur,
    id_bar: req.body.id_bar,
    id_evenement: req.body.id_evenement
  };

  // Save Proprietaire in the database
  Proprietaire.create(proprietaire)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Proprietaire."
      });
    });
};


// Retrieve all Proprietaires from the database.
exports.findAll = (req, res) => {

  const nom = req.query.nom;
  var condition = nom ? { nom: { [Op.like]: `%${nom}%` } } : null;

  Proprietaire.findAll({ where: condition })
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


// Find a single Proprietaire with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Proprietaire.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Proprietaire with id=" + id
      });
    });
};


// Update a Proprietaire by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Proprietaire.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Proprietaire was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Proprietaire with id=${id}. Maybe Proprietaire was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Proprietaire with id=" + id
      });
    });
};


// Delete a Proprietaire with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Proprietaire.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Proprietaire was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Proprietaire with id=${id}. Maybe Proprietaire was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Proprietaire with id=" + id
      });
    });
};


// Delete all Proprietaires from the database.
exports.deleteAll = (req, res) => {
  Proprietaire.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Proprietaires were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};


// Find all published Proprietaires
// exports.findAllPublished = (req, res) => {
// Proprietaire.findAll({ where: { published: true } })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials."
//       });
//     });
// };
// };

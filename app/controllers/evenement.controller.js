const db = require("../models");
const Evenement = db.evenement;
const Op = db.Sequelize.Op;

// Create and Save a new Evenement
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nom) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Evenement
  const evenement = {
    nom: req.body.nom,
    description: req.body.description,
    date: req.body.date,
    nombre_inscrit: req.body.nombre_inscrit
  };

  // Save Evenement in the database
  Evenement.create(evenement)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Evenement."
      });
    });
};


// Retrieve all Evenements from the database.
exports.findAll = (req, res) => {

  const nom = req.query.nom;
  var condition = nom ? { nom: { [Op.like]: `%${nom}%` } } : null;

  Evenement.findAll({ where: condition })
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


// Find a single Evenement with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Evenement.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Evenement with id=" + id
      });
    });
};


// Update a Evenement by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Evenement.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Evenement was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Evenement with id=${id}. Maybe Evenement was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Evenement with id=" + id
      });
    });
};


// Delete a Evenement with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Evenement.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Evenement was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Evenement with id=${id}. Maybe Evenement was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Evenement with id=" + id
      });
    });
};


// Delete all Evenements from the database.
exports.deleteAll = (req, res) => {
  Evenement.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Evenements were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};


// Find all published Evenements
// exports.findAllPublished = (req, res) => {
// Evenement.findAll({ where: { published: true } })
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

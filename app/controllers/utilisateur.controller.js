const db = require("../models");
const Utilisateur = db.utilisateur;
const Op = db.Sequelize.Op;

// Create and Save a new Utilisateur
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nom) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Utilisateur
  const utilisateur = {
    nom: req.body.nom,
    password: req.body.password,
    mail: req.body.mail,
    id_evenement: req.body.id_evenement,
  };

  // Save Utilisateur in the database
  Utilisateur.create(utilisateur)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Utilisateur."
      });
    });
};


// Retrieve all Utilisateurs from the database.
exports.findAll = (req, res) => {

  const nom = req.query.nom;
  var condition = nom ? { nom: { [Op.like]: `%${nom}%` } } : null;

  Utilisateur.findAll({ where: condition })
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


// Find a single Utilisateur with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Utilisateur.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Utilisateur with id=" + id
      });
    });
};


// Update a Utilisateur by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Utilisateur.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Utilisateur was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Utilisateur with id=${id}. Maybe Utilisateur was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Utilisateur with id=" + id
      });
    });
};


// Delete a Utilisateur with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Utilisateur.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Utilisateur was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Utilisateur with id=${id}. Maybe Utilisateur was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Utilisateur with id=" + id
      });
    });
};


// Delete all Utilisateurs from the database.
exports.deleteAll = (req, res) => {
  Utilisateur.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Utilisateurs were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};


// Find all published Utilisateurs
// exports.findAllPublished = (req, res) => {
// Utilisateur.findAll({ where: { published: true } })
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

const db = require("../models");
const Commentaire = db.commentaire;
const Op = db.Sequelize.Op;

// Create and Save a new Commentaire
exports.create = (req, res) => {
  // Validate request
  if (!req.body.id_utilisateur) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Commentaire
  const commentaire = {
    id_utilisateur: req.body.id_utilisateur,
    id_bar: req.body.id_bar,
    avis: req.body.avis,
    commentaire: req.body.commentaire,
    date: req.body.date

  };

  // Save Commentaire in the database
  Commentaire.create(commentaire)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Commentaire."
      });
    });
};


// Retrieve all Commentaires from the database.
exports.findAll = (req, res) => {

  const nom = req.query.nom;
  var condition = nom ? { nom: { [Op.like]: `%${nom}%` } } : null;

  Commentaire.findAll({ where: condition })
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


// Find a single Commentaire with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Commentaire.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Commentaire with id=" + id
      });
    });
};


// Update a Commentaire by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Commentaire.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Commentaire was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Commentaire with id=${id}. Maybe Commentaire was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Commentaire with id=" + id
      });
    });
};


// Delete a Commentaire with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Commentaire.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Commentaire was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Commentaire with id=${id}. Maybe Commentaire was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Commentaire with id=" + id
      });
    });
};


// Delete all Commentaires from the database.
exports.deleteAll = (req, res) => {
  Commentaire.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Commentaires were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};


// Find all published Commentaires
// exports.findAllPublished = (req, res) => {
// Commentaire.findAll({ where: { published: true } })
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

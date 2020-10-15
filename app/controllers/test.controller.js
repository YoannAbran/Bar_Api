const db = require("../models");
const Utilisateur = db.utilisateur;
const Commentaire = db.commentaire;
const Op = db.Sequelize.Op;


exports.createUtilisateur = ( req, res) => {
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



exports.createCommentaire = (req, res) => {
  if (!req.body.utilisateurId) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Commentaire
  const commentaire = {
    utilisateurId: req.body.utilisateurId,
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




exports.findUtilisateurById = (req, res) => {
const id = req.params.id;
   Utilisateur.findByPk(id, { include: ["commentaires"] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Utilisateur with id=" + id
      });
    });
};

exports.findCommentaireById = (req, res) => {
  const id = req.params.id;
  Commentaire.findByPk(id, { include: ["utilisateurs"] })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: "Error retrieving Utilisateur with id=" + id
    });
  });
};

exports.findAll = (req, res) => {
   Utilisateur.findAll({
    include: ["commentaires"],
  }).then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials."
    });
  });
};

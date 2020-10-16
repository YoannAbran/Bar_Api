const db = require("../models");
const Utilisateur = db.utilisateur;
const Commentaire = db.commentaire;
const config = require("../config/auth.config");
const Op = db.Sequelize.Op;

var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
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
    password: bcrypt.hashSync(req.body.password,8),
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
        message: err.message || "Some error occurred while creating the Utilisateur."
      });
    });
};

exports.signin = (req, res) => {
  Utilisateur.findOne({
    where: {
      nom: req.body.nom
    }
  })
    .then(utilisateur => {
      if (!utilisateur) {
        return res.status(404).send({ message: "Le nom d'utilisateur n'existe pas." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        utilisateur.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Le mot de passe est invalide !"
        });
      }

      var token = jwt.sign({ id: utilisateur.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

if (passwordIsValid && utilisateur){
        res.status(200).send({
          id: utilisateur.id,
          nom: utilisateur.nom,
          email: utilisateur.email,
          accessToken: token,
        


        });
      }
      })

    .catch(err => {
      res.status(500).send({ message: err.message });
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
        message: err.message || "Some error occurred while creating the Commentaire."
      });
    });
};

exports.updateUtilisateur = (req, res) => {
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

exports.findUtilisateurById = (req, res) => {
  const id = req.params.id;
  Utilisateur.findByPk(id, {
      include: ["commentaires"]
    })
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
  Commentaire.findByPk(id, {
      include: ["utilisateurs"]
    })
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
        message: err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

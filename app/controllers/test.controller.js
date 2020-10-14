const db = require("../models");
const Utilisateur = db.utilisateur;
const Commentaire = db.commentaire;

exports.createUtilisateur = (utilisateur) => {
  return Utilisateur.create({
    nom: utilisateur.nom,
    password: utilisateur.password,
    mail: utilisateur.mail,
    id_evenement: utilisateur.id_evenement,
  })
    .then((utilisateur) => {
      console.log(">> Created utilisateur: " + JSON.stringify(utilisateur, null, 4));
      return utilisateur;
    })
    .catch((err) => {
      console.log(">> Error while creating utilisateur: ", err);
    });
};

exports.createCommentaire = (utilisateurId, commentaire) => {
  return Commentaire.create({
    nid_bar: commentaire.id_bar,
    avis: commentaire.avis,
    commentaire: commentaire.commentaire,
    date: commentaire.date
    id_utilisateur: utilisateurId,
  })
    .then((commentaire) => {
      console.log(">> Created commentaire: " + JSON.stringify(commentaire, null, 4));
      return commentaire;
    })
    .catch((err) => {
      console.log(">> Error while creating commentaire: ", err);
    });
};

exports.findUtilisateurById = (utilisateurId) => {
  return Utilisateur.findByPk(utilisateurId, { include: ["commentaire"] })
    .then((utilisateur) => {
      return utilisateur;
    })
    .catch((err) => {
      console.log(">> Error while finding utilisateur: ", err);
    });
};

exports.findCommentaireById = (id) => {
  return Commentaire.findByPk(id, { include: ["utilisateur"] })
    .then((commentaire) => {
      return commentaire;
    })
    .catch((err) => {
      console.log(">> Error while finding commentaire: ", err);
    });
};

exports.findAll = () => {
  return Utilisateur.findAll({
    include: ["commentaire"],
  }).then((utilisateur) => {
    return utilisateur;
  });
};

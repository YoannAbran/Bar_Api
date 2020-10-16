const db = require("../models");

const Utilisateur = db.utilisateur;

checkDuplicateUtilisateurOrmail = (req, res, next) => {
  // Utilisateurname
  Utilisateur.findOne({
    where: {
      nom: req.body.nom
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        Message: "Le nom est déjà utilisé !"
      });
      return;
    }

    // Email
    Utilisateur.findOne({
      where: {
        mail: req.body.mail
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          Message: "l'email est déjà utilisé !"
        });
        return;
      }

      next();
    });
  });
};
const verifySignUp = {
  checkDuplicateUtilisateurOrmail: checkDuplicateUtilisateurOrmail,

};

module.exports = verifySignUp;

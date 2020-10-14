module.exports = (sequelize, Sequelize) => {
  const Utilisateur = sequelize.define("utilisateur", {
    nom: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    mail: {
      type: Sequelize.STRING
    },
    id_evenement: {
      type: Sequelize.TEXT
    },

  });

  return Utilisateur;
};

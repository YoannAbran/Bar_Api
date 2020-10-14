module.exports = (sequelize, Sequelize) => {
  const Commentaire = sequelize.define("commentaire", {
    id_utilisateur: {
      type: Sequelize.INTEGER
    },
    id_bar: {
      type: Sequelize.INTEGER
    },
    avis: {
      type: Sequelize.INTEGER
    },
    commentaire: {
      type: Sequelize.TEXT
    },
    date: {
      type: Sequelize.DATE
    },

  });

  return Commentaire;
};

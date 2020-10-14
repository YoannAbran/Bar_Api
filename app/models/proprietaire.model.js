module.exports = (sequelize, Sequelize) => {
  const Proprietaire = sequelize.define("proprietaire", {
    id_utilisateur: {
      type: Sequelize.INTEGER
    },
    id_bar: {
      type: Sequelize.INTEGER
    },

    id_evenement: {
      type: Sequelize.INTEGER
    },
  });

  return Proprietaire;
};

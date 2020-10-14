module.exports = (sequelize, Sequelize) => {
  const Evenement = sequelize.define("evenement", {
    nom: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.TEXT
    },
    date: {
      type: Sequelize.DATE
    },
    nombre_inscrit: {
      type: Sequelize.INTEGER
    },
  });

  return Evenement;
};

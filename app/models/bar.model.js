module.exports = (sequelize, Sequelize) => {
  const Bar = sequelize.define("bar", {
    nom: {
      type: Sequelize.STRING
    },
    adresse: {
      type: Sequelize.TEXT
    },
    telephone: {
      type: Sequelize.STRING
    },
    horaire_jour: {
      type: Sequelize.TEXT
    },
    reseau_sociaux: {
      type: Sequelize.TEXT
    },
    photo: {
      type: Sequelize.STRING
    },
    latitude: {
      type: Sequelize.DOUBLE
    },
    longitude: {
      type: Sequelize.DOUBLE
    },
  });

  return Bar;
};

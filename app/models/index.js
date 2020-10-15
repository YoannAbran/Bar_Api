const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.bar = require("./bar.model.js")(sequelize, Sequelize);
db.proprietaire = require("./proprietaire.model.js")(sequelize, Sequelize);
db.commentaire = require("./commentaire.model.js")(sequelize, Sequelize);
db.evenement = require("./evenement.model.js")(sequelize, Sequelize);
db.utilisateur = require("./utilisateur.model.js")(sequelize, Sequelize);
db.utilisateur.hasMany(db.commentaire, { as: "commentaires" });
db.commentaire.belongsTo(db.utilisateur, {
  foreignKey: "utilisateurId",
  as: "utilisateurs",
});

module.exports = db;

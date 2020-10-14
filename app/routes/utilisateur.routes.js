module.exports = app => {
  const utilisateur = require("../controllers/utilisateur.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", utilisateur.create);

  // Retrieve all Tutorials
  router.get("/", utilisateur.findAll);

  // Retrieve a single Tutorial with id
  router.get("/:id", utilisateur.findOne);

  // Update a Tutorial with id
  router.put("/:id", utilisateur.update);

  // Delete a Tutorial with id
  router.delete("/:id", utilisateur.delete);

  // Delete all Tutorials
  router.delete("/", utilisateur.deleteAll);

  app.use('/api/utilisateur', router);
};

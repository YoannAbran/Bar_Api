module.exports = app => {
  const proprietaire = require("../controllers/proprietaire.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", proprietaire.create);

  // Retrieve all Tutorials
  router.get("/", proprietaire.findAll);

  // Retrieve a single Tutorial with id
  router.get("/:id", proprietaire.findOne);

  // Update a Tutorial with id
  router.put("/:id", proprietaire.update);

  // Delete a Tutorial with id
  router.delete("/:id", proprietaire.delete);

  // Delete all Tutorials
  router.delete("/", proprietaire.deleteAll);

  app.use('/api/proprietaire', router);
};

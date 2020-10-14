module.exports = app => {
  const evenement = require("../controllers/evenement.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", evenement.create);

  // Retrieve all Tutorials
  router.get("/", evenement.findAll);

  // Retrieve a single Tutorial with id
  router.get("/:id", evenement.findOne);

  // Update a Tutorial with id
  router.put("/:id", evenement.update);

  // Delete a Tutorial with id
  router.delete("/:id", evenement.delete);

  // Delete all Tutorials
  router.delete("/", evenement.deleteAll);

  app.use('/api/evenement', router);
};

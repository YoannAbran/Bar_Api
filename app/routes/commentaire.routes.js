module.exports = app => {
  const commentaire = require("../controllers/commentaire.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", commentaire.create);

  // Retrieve all Tutorials
  router.get("/", commentaire.findAll);

  // Retrieve a single Tutorial with id
  router.get("/:id", commentaire.findOne);

  // Update a Tutorial with id
  router.put("/:id", commentaire.update);

  // Delete a Tutorial with id
  router.delete("/:id", commentaire.delete);

  // Delete all Tutorials
  router.delete("/", commentaire.deleteAll);

  app.use('/api/commentaire', router);
};

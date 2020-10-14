module.exports = app => {
  const test = require("../controllers/test.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", test.create);

  // Retrieve all Tutorials
  router.get("/", test.findAll);

  // Retrieve a single Tutorial with id
  router.get("/:id", test.findOne);

  // Update a Tutorial with id
  router.put("/:id", test.update);

  // Delete a Tutorial with id
  router.delete("/:id", test.delete);

  // Delete all Tutorials
  router.delete("/", test.deleteAll);

  app.use('/api/test', router);
};

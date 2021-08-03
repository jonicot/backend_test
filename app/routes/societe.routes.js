module.exports = app => {
  const societe = require("../controllers/societe.controller.js");

  var router = require("express").Router();

  // Create a new Societe
  router.post("/", societe.create);
  
  // Add a User to a Societe
  router.post("/add-user", societe.addUser);

  // Retrieve all Societe
  router.get("/", societe.findAll);

  // Retrieve a single Societe with id
  router.get("/:id", societe.findOne);

  // Update a Societe with id
  router.put("/:id", societe.update);

  // Delete a Societe with id
  router.delete("/:id", societe.delete);

  // Delete all Societe
  router.delete("/", societe.deleteAll);

  app.use('/api/societe', router);
};
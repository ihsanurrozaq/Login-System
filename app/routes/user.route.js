const { authJwt } = require("../middleware");

module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
    
    // Sign In
    router.get("/jwt", [authJwt.verifyToken]);
    
    // // Create a new user
    // router.post("/", users.create);
  
    // Retrieve all users
    router.get("/", users.findAll);
  
    // Retrieve a single user with name
    router.get("/:name", users.findOne);
  
    // Update a user with name
    router.put("/:name", users.update);
  
    // Delete a user with name
    router.delete("/:name", users.delete);
  
    // // Delete all users
    // router.delete("/", users.deleteAll);
  
    app.use("/api/users", router);
  };
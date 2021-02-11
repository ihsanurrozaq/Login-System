const db = require("../models/index");
const User = require("../models").User;
const Op = db.Sequelize.Op;

// Create and save a new User
// exports.create = (req, res) => {
//     // Validate request
//     if (!req.body.name) {
//       res.status(400).send({
//         message: "Content can not be empty!"
//       });
//       return;
//     }
  
//     // Create a User
//     const user = {
//       name: req.body.name,
//       password: req.body.password
//     };
  
//     // Save User in the database
//     User.create(user)
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while creating the User."
//         });
//       });
//   };

  // Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  User.findAll({ where: condition, attributes: ['id','name'] })
    .then(data => {
      console.log(data);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

// Find a single User with an user
exports.findOne = (req, res) => {
  const name = req.params.name;

  User.findOne({ where: {name: name}})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with name=" + name
      });
    });
};

// Update a User by the user in the request
exports.update = (req, res) => {
  const name = req.params.name;
  
  User.update(req.body, {
    where: { name: name }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with name=${name}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with name=" + name
      });
    });
};

// Delete a User with the specified name in the request
exports.delete = (req, res) => {
  const name = req.params.name;

  User.destroy({
    where: { name: name }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with name=${name}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with name=" + name
      });
    });
};

// // Delete all Users from the database.
// exports.deleteAll = (req, res) => {
//   User.destroy({
//     where: {},
//     truncate: false
//   })
//     .then(nums => {
//       res.send({ message: `${nums} Users were deleted successfully!` });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all users."
//       });
//     });
// };
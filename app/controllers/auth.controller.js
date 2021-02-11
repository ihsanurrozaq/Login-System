const db = require("../models");
const config = require("../config/auth.config");
const User = db.User;
// const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    name: req.body.name,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(() => {
      res.send({ 
        message: "User registered successfully!" 
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      name: req.body.name
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({
        id: user.id,
        username: user.name,
        email: user.email,
        accessToken: token
      });
      
    //   var authorities = [];
    //   user.getRoles().then(roles => {
    //     for (let i = 0; i < roles.length; i++) {
    //       authorities.push("ROLE_" + roles[i].name.toUpperCase());
    //     }
    //     res.status(200).send({
    //       id: user.id,
    //       username: user.name,
    //       email: user.email,
    //       roles: authorities,
    //       accessToken: token
    //     });
    //   });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
const db = require("../models");
const User = db.user;
const Societe = db.societe;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.firstname) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a User
  const user = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    adresse: req.body.adresse,
    email: req.body.email,
    phone: req.body.phone
  };

  // Save User in the database
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};


// Add a Societe to a User
exports.addSociete= (req, res) => {
	
	const societeId = req.body.societeId;
	const userId = req.body.userId;
	
  return User.findByPk(userId)
    .then((user) => {
      if (!user) {
        console.log("User not found!");
        return null;
      }
      return Societe.findByPk(societeId).then((societe) => {
        if (!societe) {
          console.log("Societe not found!");
          return null;
        }
		
        user.addSociete(societe);
        console.log(`>> added User id=${user.id} to Societe id=${societe.id}`);
        res.send(user);
      });
    })
    .catch((err) => {
      console.log(">> Error while adding Societe to User: ", err);
    });
};

// Retrieve all User from the database.
exports.findAll = (req, res) => {
		
  const title = req.query.title;
  
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  User.findAll({ include: [
      {
        model: Societe,
        as: "societes",
        attributes: ["id", "title"],
        through: {
          attributes: [],
        }
      },
    ],where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving User."
      });
    });
};


// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id, {include: [
      {
        model: Societe,
        as: "societes",
        attributes: ["id", "title"],
        through: {
          attributes: [],
        }
      }
  ]})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};

// Delete all User from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} User were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all User."
      });
    });
};
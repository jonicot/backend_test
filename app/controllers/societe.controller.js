const db = require("../models");
const Societe = db.societe;
const User = db.user;
const Op = db.Sequelize.Op;

// Create and Save a new Societe
exports.create = (req, res) => {
  // Validate request
  console.log(req.body)
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Societe
  const societe = {
    title: req.body.title,
    adresse: req.body.adresse,
    siret: req.body.siret,
    email: req.body.email,
    phone: req.body.phone
  };

  // Save Societe in the database
  Societe.create(societe)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Societe."
      });
    });
};

exports.addUser= (req, res) => {
	
	const societeId = req.body.societeId;
	const userId = req.body.userId;
	
	console.log(societeId+" "+userId)
  return Societe.findByPk(societeId)
    .then((societe) => {
      if (!societe) {
        console.log("Tag not found!");
        return null;
      }
      return User.findByPk(userId).then((user) => {
        if (!user) {
          console.log("Tutorial not found!");
          return null;
        }
        societe.addUser(user);
        console.log(`>> added User id=${user.id} to Societe id=${societe.id}`);
        res.send(user);
      });
    })
    .catch((err) => {
      console.log(">> Error while adding User to Societe: ", err);
    });
};


// Retrieve all Societe from the database.
exports.findAll = (req, res) => {
	
	
  const title = req.query.title;
  
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  Societe.findAll({ include: [
      {
        model: User,
        as: "users",
        attributes: ["id", "firstname"],
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
          err.message || "Some error occurred while retrieving societes."
      });
    });
};

// Find a single Societe with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Societe.findByPk(id, {include: [
      {
        model: User,
        as: "users",
        attributes: ["id", "firtsname"],
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
        message: "Error retrieving Societe with id=" + id
      });
    });
};

// Update a Societe by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Societe.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Societe was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Societe with id=${id}. Maybe Societe was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Societe with id=" + id
      });
    });
};

// Delete a Societe with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Societe.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Societe was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Societe with id=${id}. Societe was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Societe with id=" + id
      });
    });
};

// Delete all Societe from the database.
exports.deleteAll = (req, res) => {
  Societe.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Societe were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Societe."
      });
    });
};
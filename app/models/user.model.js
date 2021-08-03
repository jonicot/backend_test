module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    firstname: {
      type: Sequelize.STRING
    },
    lastname: {
      type: Sequelize.STRING
    },
    adresse: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
	phone: {
      type: Sequelize.STRING
    }
  });

  return User;
};
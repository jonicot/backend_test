module.exports = (sequelize, Sequelize) => {
  const Societe = sequelize.define("societe", {
    title: {
      type: Sequelize.STRING
    },
    adresse: {
      type: Sequelize.STRING
    },
    siret: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
	phone: {
      type: Sequelize.STRING
    }
  });

  return Societe;
};
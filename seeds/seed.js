const sequelize = require("../config/connection");
const seedCharacters = require("./characterData");
const seedUsers = require("./userData");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedCharacters();

  await seedUsers();

  process.exit(0);
};

seedAll();

const { User } = require("../models");

const userData = {
  id: 1,
  name: "BakeCity",
  email: "Bakej07@gmail.com",
  password: "password",
};

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;

const { Characters } = require("../models");

const characterData = [
  {
    name: "Fass Bender",
    class: "Paladin",
    level: 5,
    race: "Human",
  },
  {
    name: "Prof. Mills",
    class: "Wizard",
    level: 5,
    race: "Tiefling",
  },
  {
    name: "Heal Bot Quin",
    class: "Cleric",
    level: 5,
    race: "Dragonborn",
  },
];

const seedCharacters = () => Characters.bulkCreate(characterData);

module.exports = seedCharacters;

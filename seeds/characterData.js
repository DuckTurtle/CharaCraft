const { Characters } = require("../models");

const characterData = [
  {
    id: 1,
    name: "Fass Bender",
    class: "Paladin",
    level: 5,
    race: "Human",
  },
  {
    id: 2,
    name: "Prof. Mills",
    class: "Wizard",
    level: 5,
    race: "Tiefling",
  },
  {
    id: 3,
    name: "Heal Bot Quin",
    class: "Cleric",
    level: 5,
    race: "Dragonborn",
  },
];

const seedCharacters = () => Characters.bulkCreate(characterData);

module.exports = seedCharacters;

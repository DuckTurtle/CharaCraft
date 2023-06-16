const { Prebuilts } = require("../models");

const characterData = [
  {
    id: 1,
    name: "Fass Bender",
    class: "Fighter",
    level: 5,
    race: "Human",
    hp: 45,
    armor_class: 18,
    initiative: 5,
    speed: 30,
    strength: 17,
    dexterity: 8,
    constitution: 16,
    intelligence: 10,
    wisdom: 10,
    charisma: 18,
    description:
      "Adaptable warrior adaptable to any combat situation, wielding a variety of weapons and fighting styles to deal devastating blows and endure battles with unmatched resilience.",
    filename: "../public/images/fighter.png",
  },
  {
    id: 2,
    name: "Prof. Mills",
    class: "Wizard",
    level: 5,
    race: "Tiefling",
    hp: 25,
    armor_class: 13,
    initiative: 4,
    speed: 30,
    strength: 8,
    dexterity: 12,
    constitution: 12,
    intelligence: 20,
    wisdom: 10,
    charisma: 11,
    description:
      "Scholarly spellcaster with a vast repertoire of arcane magic, capable of manipulating spells from different schools and providing versatile magical solutions.",
    filename: "../public/images/wizard.png",
  },
  {
    id: 3,
    name: "Heal Bot Quin",
    class: "Ranger",
    level: 5,
    race: "Dragonborn",
    hp: 35,
    armor_class: 16,
    initiative: 5,
    speed: 30,
    strength: 10,
    dexterity: 18,
    constitution: 14,
    intelligence: 10,
    wisdom: 16,
    charisma: 8,
    description:
      "Nature-bound hunters with a keen eye for long-range combat, surviving the wilderness while relying on animal companions and natural magic to track foes and strike deadly blows from a distance.",
    filename: "../public/images/ranger.png",
  },
];

const seedCharacters = () => Prebuilts.bulkCreate(characterData);

module.exports = seedCharacters;

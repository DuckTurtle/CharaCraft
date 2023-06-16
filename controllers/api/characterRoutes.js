const router = require("express").Router();
const {
  User,
  Characters,
  Weapon,
  Spells,
  CharWeapon,
  Charspell,
  CharOther,
  Other,
} = require("../../models");
const checkAuth = require("../../utils/auth");

module.exports = router;

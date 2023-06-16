const User = require("./user");
const Characters = require("./character");
const Charspell = require("./charspells");
const CharOther = require("./charother");
const CharWeapon = require("./charweapons");
//const CharStats = require('./charstats');
const Spells = require("./spells");
const Weapon = require("./weapon");
const Other = require("./other");
//const Stats = require('./stats');
const Prebuilts = require("./prebuilts");

User.hasMany(Characters, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Characters.belongsTo(User, {
  foreignKey: "user_id",
});
Characters.belongsToMany(Spells, {
  through: {
    model: Charspell,
    unique: false,
  },
});
Spells.belongsToMany(Characters, {
  through: {
    model: Charspell,
    unique: false,
  },
});
Weapon.belongsToMany(Characters, {
  through: {
    model: CharWeapon,
    unique: false,
  },
});
Characters.belongsToMany(Weapon, {
  through: {
    model: CharWeapon,
    unique: false,
  },
});
Characters.belongsToMany(Other, {
  through: {
    model: CharOther,
    unique: false,
  },
});
Other.belongsToMany(Characters, {
  through: {
    model: CharOther,
    unique: false,
  },
});
/* Characters.belongsToMany(Stats,{
    through: {
      model: CharStats,
      unique: false
    },
  });
  Stats.belongsToMany(Characters,{
    through: {
      model: CharStats,
      unique: false
    },
  });*/

module.exports = {
  User,
  Characters,
  Weapon,
  Spells,
  CharWeapon,
  Charspell,
  CharOther,
  Other,
  Prebuilts,
};

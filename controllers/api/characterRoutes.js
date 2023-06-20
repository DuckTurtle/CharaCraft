const router = require("express").Router();
const {
  Characters,
  CharWeapon,
  Charspell,
  CharOther,
} = require("../../models");
//updates older character data
router.post("/character", async (req, res) => {
  try {
    //deletes old character data to avoid mutaion
    await Characters.destroy({
       where: {
        id:req.params.charID
       }
    })
    //updated the information
    const newCharacterData = await Characters.create({
      where: {
      id: req.params.charID,
      name: req.body.cname,
      campaign_name: req.body.campaignName,
      class: req.body.cclass,
      level:req.body.clevel,
      race:req.body.crace,
      hp:req.body.hb,
      armor_class:req.body.armorClass,
      initiative:req.body.cinitiative,
      speed:req.body.cspeed,
      strength:req.body.cstrength,
      dexterity:req.body.cdexterity,
      constitution:req.body.cconstitution,
      intelligence:req.body.cintelligence,
      wisdom:req.body.cwisdom,
      charisma:req.body.ccharisma,
      spellNames: req.body.currentSpells,
      weaponName: req.body.currentWeapons,
      otherId: req.body.currentOther,
      user_id: req.session.user_id
      }
  })
  //links spells to charater through Charaspells
  if (req.body.spellNames.length) {
    const charSpellIdArr = req.body.spellNames.map((spell_name) => {
      return {
        character_id: character.id,
        spell_name,
      };
    });
    return Charspell.bulkCreate(charSpellIdArr);
  };
  //links weapons to the character
  if (req.body.weaponName.length) {
    const charWeaponIdArr = req.body.weaponName.map((weapon_name) => {
      return {
        character_id: character.id,
        weapon_name,
      };
    });
    return CharWeapon.bulkCreate(charWeaponIdArr);
  };
  //links other to charater
  if (req.body.otherId.length) {
    const charOtherIdArr = req.body.otherId.map((other_Id) => {
      return {
        character_id: character.id,
        other_Id,
      };
    });
    return CharOther.bulkCreate(charOtherIdArr);
  };

      res.status(200).json(newCharacterData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//adds new charater to db
router.post("/newcharacter", async (req, res) => {
  try {
    const newCharacterData = await Characters.create({
      where: {
      name: req.body.cname,
      campaign_name: req.body.campaignName,
      class: req.body.cclass,
      level:req.body.clevel,
      race:req.body.crace,
      hp:req.body.hb,
      armor_class:req.body.armorClass,
      initiative:req.body.cinitiative,
      speed:req.body.cspeed,
      strength:req.body.cstrength,
      dexterity:req.body.cdexterity,
      constitution:req.body.cconstitution,
      intelligence:req.body.cintelligence,
      wisdom:req.body.cwisdom,
      charisma:req.body.ccharisma,
      spellNames: req.body.currentSpells,
      weaponName: req.body.currentWeapons,
      otherId: req.body.currentOther,
      user_id: req.session.user_id
      }
  })
  //links spells to charater
  if (req.body.spellNames.length) {
    const charSpellIdArr = req.body.spellNames.map((spell_name) => {
      return {
        character_id: character.id,
        spell_name,
      };
    });
    return Charspell.bulkCreate(charSpellIdArr);
  };
  //links weapons to charater
  if (req.body.weaponName.length) {
    const charWeaponIdArr = req.body.weaponName.map((weapon_name) => {
      return {
        character_id: character.id,
        weapon_name,
      };
    });
    return CharWeapon.bulkCreate(charWeaponIdArr);
  };

  // links other to character
  if (req.body.otherId.length) {
    const charOtherIdArr = req.body.otherId.map((other_Id) => {
      return {
        character_id: character.id,
        other_Id,
      };
    });
    return Charspell.bulkCreate(charOtherIdArr);
  };

      res.status(200).json(newCharacterData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

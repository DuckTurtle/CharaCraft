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
        id: req.params.charID,
      },
    });
    //updated the information
    const newCharacterData = await Characters.create({
      where: {
        id: req.params.charID,
        name: req.body.cname,
        campaign_name: req.body.campaignName,
        class: req.body.cclass,
        level: req.body.clevel,
        race: req.body.crace,
        hp: req.body.hb,
        armor_class: req.body.armorClass,
        initiative: req.body.cinitiative,
        speed: req.body.cspeed,
        strength: req.body.cstrength,
        dexterity: req.body.cdexterity,
        constitution: req.body.cconstitution,
        intelligence: req.body.cintelligence,
        wisdom: req.body.cwisdom,
        charisma: req.body.ccharisma,
        spellNames: req.body.currentSpells,
        weaponName: req.body.currentWeapons,
        otherId: req.body.currentOther,
        user_id: req.session.user_id,
      },
    }).then(character => {
      //links spells to charater
      if (req.body.currentSpells.length) {
        const charSpellIdArr = req.body.currentSpells.map((spell_id) => {
          return {
            character_id: character.id,
            spell_id,
          };
        });
        return Charspell.bulkCreate(charSpellIdArr);
      }
      res.status(200).json(character);
      //links weapons to charater
      if (req.body.currentWeapons.length) {
        const charWeaponIdArr = req.body.currentWeapons.map((weapon_id) => {
          return {
            character_id: character.id,
            weapon_id,
          };
        });
        return CharWeapon.bulkCreate(charWeaponIdArr);
      }
      res.status(200).json(character);
      // links other to character
      if (req.body.currentOther.length) {
        const charOtherIdArr = req.body.currentOther.map((other_Id) => {
          return {
            character_id: character.id,
            other_Id,
          };
        });
        return CharOther.bulkCreate(charOtherIdArr);
      }
      res.status(200).json(character);
    })
    .then((charOtherIdArr) => res.status(200).json(charOtherIdArr))
      res.status(200).json(newCharacterData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

//adds new charater to db
router.post("/newcharacter", async (req, res) => {
  try {
    console.log(req.body);
    const newCharacterData = await Characters.create({
      id: req.body.cid,
      name: req.body.cname,
      campaign_name: req.body.campaignName,
      class: req.body.cclass,
      level: req.body.clevel,
      race: req.body.crace,
      hp: req.body.chp,
      armor_class: req.body.armorClass,
      initiative: req.body.cinitiative,
      speed: req.body.cspeed,
      strength: req.body.cstrength,
      dexterity: req.body.cdexterity,
      constitution: req.body.cconstitution,
      intelligence: req.body.cintelligence,
      wisdom: req.body.cwisdom,
      charisma: req.body.ccharisma,
      spellNames: req.body.currentSpells,
      weaponName: req.body.currentWeapons,
      otherId: req.body.currentOther,
      user_id: req.session.user_id,
    }).then(character => {
    //links spells to charater
    if (req.body.currentSpells.length) {
      const charSpellIdArr = req.body.currentSpells.map((spell_id) => {
        return {
          character_id: character.id,
          spell_id,
        };
      });
      return Charspell.bulkCreate(charSpellIdArr);
    }
    res.status(200).json(character);
    //links weapons to charater
    if (req.body.currentWeapons.length) {
      const charWeaponIdArr = req.body.currentWeapons.map((weapon_id) => {
        return {
          character_id: character.id,
          weapon_id,
        };
      });
      return CharWeapon.bulkCreate(charWeaponIdArr);
    }
    res.status(200).json(character);
    // links other to character
    if (req.body.currentOther.length) {
      const charOtherIdArr = req.body.currentOther.map((other_Id) => {
        return {
          character_id: character.id,
          other_Id,
        };
      });
      return Charspell.bulkCreate(charOtherIdArr);
    }
    res.status(200).json(character);
  })
  .then((charOtherIdArr) => res.status(200).json(charOtherIdArr))
    res.status(200);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

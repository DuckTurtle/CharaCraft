const router = require("express").Router();
const {
  Characters,
  CharWeapon,
  Charspell,
  CharOther,
} = require("../../models");
const checkAuth = require("../../utils/auth");
//updates older character data
router.post("/character", async (req, res) => {
  try {
    //hot fix for character routes breaking.
    let cid= req.params.charID;
    let cname= req.body.cname;
    let ccampaignName= req.body.campaignName;
    let cclass= req.body.cclass;
    let clevel= req.body.clevel;
    let crace= req.body.crace;
    let chp= req.body.hb;
    let  carmorClass= req.body.armorClass;
    let  cinitiative= req.body.cinitiative;
    let  cspeed = req.body.cspeed;
    let  cstrength= req.body.cstrength;
    let  cdexterity= req.body.cdexterity;
    let  cconstitution= req.body.cconstitution;
    let  cintelligence= req.body.cintelligence;
    let  cwisdom= req.body.cwisdom;
    let  ccharisma= req.body.ccharisma;
    let  currentSpells= req.body.currentSpells;
    let currentWeapons= req.body.currentWeapons;
    let currentOther= req.body.currentOther;
    //deletes old character data to avoid mutaion
    await Characters.destroy({
      where: {
        id: cid,
      },
    });
    //updated the information
    const newCharacterData = await Characters.create({
      where: { id: cid},
      defaults: {
        id: cid,
        name: cname,
        campaign_name: ccampaignName,
        class: cclass,
        level: clevel,
        race: crace,
        hp: chp,
        armor_class: carmorClass,
        initiative: cinitiative,
        speed: cspeed,
        strength: cstrength,
        dexterity: cdexterity,
        constitution: cconstitution,
        intelligence: cintelligence,
        wisdom: cwisdom,
        charisma: ccharisma,
        spellNames: currentSpells,
        weaponName: currentWeapons,
        otherId: currentOther,
        user_id: req.session.cuser_id,
      },
    }).then(character => {
      //links spells to charater
      if (currentSpells.length) {
        const charSpellIdArr = currentSpells.map((spell_id) => {
          return {
            character_id: cid,
            spell_id,
          };
        });
        return Charspell.bulkCreate(charSpellIdArr);
      }
      res.status(200).json(character);
      //links weapons to charater
      if (currentWeapons.length) {
        const charWeaponIdArr = currentWeapons.map((weapon_id) => {
          return {
            character_id: cid,
            weapon_id,
          };
        });
        return CharWeapon.bulkCreate(charWeaponIdArr);
      }
      res.status(200).json(character);
      // links other to character
      if (currentOther.length) {
        const charOtherIdArr = currentOther.map((other_Id) => {
          return {
            character_id: cid,
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
      defaults: {
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
      }
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
router.delete('/:id', checkAuth, async (req, res) => {
  console.log({id: req.params.id,
    user_id: req.session.user_id,})
  try {
    const characterData = await Characters.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    })
    .then((TheGone) => {
      if (!TheGone) {
        res.status(404).json({ message: 'No character found with this id!' });
        return;
      }
  
      res.status(200).json(TheGone);
    })
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

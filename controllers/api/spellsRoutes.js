const router = require("express").Router();
const { Spells } = require("../../models");

router.post("/spells", async (req, res) => {
    try {
        const loadNewSpells = async () =>{
            await Spells.sync().then(function() {
            Spells.findOrCreate({
                where: {
                    name: req.body.name.trim(),
                    damage: req.body.damage.trim(),
                }
            })
            .then(function(result) {
                var spell = result[0], 
                  created = result[1]; 
          
                if (!created) { // false if weapon already exists and was not created.
                  console.log('spell already exists');
                }
            })
        })
        }
        const spellData = req.body.map()
            .forEach(loadNewSpells);       
    }
    catch (err) {
        res.status(500).json(err);
    }

});
module.exports = router;
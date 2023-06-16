const router = require("express").Router();
const { Weapon } = require("../../models");

router.post("/weapon", async (req, res) => {
    try {
        const loadNewWeapons = async () =>{
            await Weapon.sync().then(function() {
            Weapon.findOrCreate({
                where: {
                    name: req.body.name.trim(),
                    damage: req.body.damage.trim(),
                }
            })
            .then(function(result) {
                var weapon = result[0], 
                  created = result[1]; 
          
                if (!created) { // false if weapon already exists and was not created.
                  console.log('weapon already exists');
                }
            })
        })
        }
        const weaponData = req.body.map()
            .forEach(loadNewWeapons);       
    }
    catch (err) {
        res.status(500).json(err);
    }

});
module.exports = router;
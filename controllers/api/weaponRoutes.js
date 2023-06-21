const router = require("express").Router();
const { Weapon } = require("../../models");

router.post("/", async (req, res) => {
    try {
        const newWeapon = await Weapon.sync({alter: true}).then(() => {
            console.log(req.body);
            Weapon.findOrCreate({
                where: {name: req.body.wName.trim()},
                defaults: {
                    id: req.body.id,
                    name: req.body.wName.trim(),
                    damage: req.body.wDamage.trim(),
                }
            })
            .then((data) => {
                console.log(data)
                console.log(newWeapon);
                res.status(200).json(newWeapon);
            })
        });
        
        
    }
    catch (err) {
        res.status(500).json(err);
    }

});
module.exports = router;
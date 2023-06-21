const router = require("express").Router();
const { Other } = require("../../models");

router.post("/", async (req, res) => {
    try {
    const newOther = await Other.sync({alter: true}).then(() => {
        console.log(req.body);
        Other.findOrCreate({
            where: {id: req.body.id.trim()},
            defaults: {
                    id: req.body.id,
                    name: req.body.oName.trim(),
                    description: req.body.oDec.trim(),
                    user_id: req.session.user_id,
                }
        })
        .then((data) => {
            console.log(data)
            console.log(newOther);
            res.status(200).json(newOther);
        })
    });
    
    
}
catch (err) {
    res.status(500).json(err);
}

});
module.exports = router;
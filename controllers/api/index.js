const router = require("express").Router();
const userRoutes = require("./userRoutes");
const weaponRoutes = require('./weaponRoutes');
const spellRoutes = require('./spellsRoutes');
const otherRoutes = require('./otherRoutes');
const characterRoutes = require('./characterRoutes');

router.use("/users", userRoutes);
router.use("/weapons", weaponRoutes);
router.use("/spells", spellRoutes);
router.use("/other", otherRoutes);
router.use("/character", characterRoutes);

module.exports = router;

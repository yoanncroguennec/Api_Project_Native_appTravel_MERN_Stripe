const router = require("express").Router();
const authCtrl = require("../controllers/AuthCtrl");

router.post("/signup", authCtrl.signup);
router.post("/login", authCtrl.login);
// router.get("/logout", authCtrl.logout);

module.exports = router;

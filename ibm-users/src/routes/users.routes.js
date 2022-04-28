const { Router } = require('express');
const { matchPassword } = require('../controllers/users.controller');
const usersCtrl = require("../controllers/users.controller");

const router = Router();
router.get("/", usersCtrl.getHome);
//router.get("/userName", usersCtrl.validateToken, usersCtrl.getUserData);
router.get("/logout", usersCtrl.logout);

router.post("/login", usersCtrl.matchEmail,matchPassword);
router.post("/register", usersCtrl.register);
module.exports = router;

const { Router } = require('express');
const usersCtrl = require("../controllers/users.controller");

const router = Router();
router.get("/", usersCtrl.getHome);
router.post("/login", usersCtrl.login);
router.get("/userName", usersCtrl.validateToken, usersCtrl.getUserData);
router.get("/logout", usersCtrl.logout);

module.exports = router;
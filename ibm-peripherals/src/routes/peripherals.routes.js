const { Router } = require('express');
const peripheralsCtrl = require("../controllers/peripherals.controller");
const rolesCtrl = require("../controllers/roles.controller");

const router = Router();

router.get("/", peripheralsCtrl.getHome);

router.post("/login", peripheralsCtrl.matchEmail, peripheralsCtrl.matchPassword);

router.post("/Focal/createPeripheral", rolesCtrl.validateToken, 
                                       rolesCtrl.isFocal, 
                                       peripheralsCtrl.findPtype,
                                       peripheralsCtrl.findBrand,
                                       peripheralsCtrl.findPeripheralStatus,
                                       peripheralsCtrl.createPeripheral);

// router.get("/getPeripheral", peripheralsCtrl.getPeripherals);

module.exports = router;
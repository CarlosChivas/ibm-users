const { Router } = require('express');
const peripheralsCtrl = require("../controllers/peripherals.controller");
const rolesCtrl = require("../controllers/roles.controller");

const router = Router();

router.get("/", peripheralsCtrl.getHome);

router.post("/Focal/createPeripheral", rolesCtrl.validateToken, 
                                       rolesCtrl.isFocal, 
                                       peripheralsCtrl.findPtype,
                                       peripheralsCtrl.findBrand,
                                       peripheralsCtrl.findPeripheralStatus,
                                       peripheralsCtrl.createPeripheral);

router.get("/getAllPeripherals", rolesCtrl.validateToken, 
                                 peripheralsCtrl.getAllPeripherals);

router.get("/Focal/getAvailablePeripherals", rolesCtrl.validateToken,
                                             rolesCtrl.isFocal,
                                             peripheralsCtrl.getAvailablePeripherals);

// router.delete("/deletePeripheral", peripheralsCtrl.deletePeripheral);

module.exports = router;
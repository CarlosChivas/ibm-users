const { Router } = require('express');
const peripheralsCtrl = require("../controllers/peripherals.controller");
const rolesCtrl = require("../controllers/roles.controller");

const router = Router();

router.get("/", peripheralsCtrl.getHome);

/*
endpoint body example:
{
    "ptype": "Mouse",
    "description": "Mouse with new features",
    "brand": "Logitech",
    "model": "sge3424",
    "peripheral_status": "On loan"
}
*/
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


/*
endpoint body example:
{
    "employee": "23",
    "peripheral_serial": "6",
    "loan_status": "In progress"
}
*/
router.post("/Focal/createLoan", rolesCtrl.validateToken,
                                 rolesCtrl.isFocal,
                                 peripheralsCtrl.findLoanStatus,
                                 peripheralsCtrl.checkPeripheralStatus,
                                 peripheralsCtrl.changePeripheralStatus,
                                 peripheralsCtrl.createLoan);

router.get("/Focal/getLoans", rolesCtrl.validateToken,
                              rolesCtrl.isFocal,
                              peripheralsCtrl.getLoans);

module.exports = router;
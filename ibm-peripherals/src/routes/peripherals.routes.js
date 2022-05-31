const { Router } = require('express');
const peripheralsCtrl = require("../controllers/peripherals.controller");
const rolesCtrl = require("../controllers/roles.controller");

const router = Router();

router.get("/", peripheralsCtrl.getHome);

/*
endpoint body example:
{
    "ptype": "Keyboard",
    "description": "Compact mechanical keyboard",
    "brand": "Steren",
    "model": "str0291383"
}
*/
router.post("/AdminFocal/createPeripheral", rolesCtrl.validateToken, 
                                            rolesCtrl.isFocalORAdmin, 
                                            peripheralsCtrl.findPtype,
                                            peripheralsCtrl.findBrand,
                                            peripheralsCtrl.findPeripheralStatus,
                                            peripheralsCtrl.createPeripheral);

router.get("/getAllPeripherals", rolesCtrl.validateToken, peripheralsCtrl.getAllPeripherals);

router.get("/Focal/getPeripherals", rolesCtrl.validateToken,
                                    rolesCtrl.isFocal,
                                    peripheralsCtrl.getPeripherals);

/*
endpoint body example:
{
    "employee_email": "miguel@gmail.com",
    "peripheral_serial": "26"
}
*/
router.post("/AdminFocal/createLoan", rolesCtrl.validateToken,
                                      rolesCtrl.isFocalORAdmin,
                                      peripheralsCtrl.findEmail,
                                      peripheralsCtrl.findLoanStatus,
                                      peripheralsCtrl.checkPeripheralStatus,
                                      peripheralsCtrl.createLoan,
                                      peripheralsCtrl.changePeripheralStatus);

router.get("/Focal/getLoans", rolesCtrl.validateToken,
                              rolesCtrl.isFocal,
                              peripheralsCtrl.getLoans);

/*
Res:
{
    "ptype": [{"Name":"Mouse"}, {"NAME": "Keyboard"}, ...],
    "brand": [{"Name":"HP"}, {"NAME": "Steren"}, ...]
}
*/
router.get("/AdminFocal/getPeripheralFields", rolesCtrl.validateToken,
                                              rolesCtrl.isFocalORAdmin,
                                              peripheralsCtrl.getPeripheralFields);

/*
Res:
{
    "in_process": [],
    "borrowed": [],
    "concluded": []
}
*/                                            
router.get("/Employee/getOwnLoans", rolesCtrl.validateToken,
                                    rolesCtrl.isEmployee,
                                    peripheralsCtrl.getOwnLoans);

module.exports = router;
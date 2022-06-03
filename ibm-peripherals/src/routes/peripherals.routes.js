const { Router } = require('express');
const peripheralsCtrl = require("../controllers/peripherals.controller");
const rolesCtrl = require("../controllers/roles.controller");

const router = Router();

router.get("/", peripheralsCtrl.getHome);

/*
Body:
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

/*
Returns only the available peripherals of the current user in session

Res:
[
    {
        "SERIAL": 51,
        "PTYPE": "Keyboard",
        "DESCRIPTION": "Compact mechanical keyboard",
        "BRAND": "Steren",
        "MODEL": "str0291383",
        "PERIPHERAL_STATUS": "Available",
        "USER_NAME": "Samuel Diaz",
        "DEPARTMENT_NAME": "Validation"
    },
    {...}
]
*/
router.get("/AdminFocal/getAvailablePeripherals", rolesCtrl.validateToken,
                                                  rolesCtrl.isFocalORAdmin,
                                                  peripheralsCtrl.getAvailablePeripherals);

/*
Body:
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
router.get("/getOwnLoans", rolesCtrl.validateToken,
                           rolesCtrl.notSecurity,
                           peripheralsCtrl.getOwnLoans);

module.exports = router;
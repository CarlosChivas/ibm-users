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
Returns only the available peripherals
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

router.get("/AdminFocal/getLoans", rolesCtrl.validateToken,
                                   rolesCtrl.isFocalORAdmin,
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

/*
Returns a list of peripheral information of a chosen employee
Body:
{
    "employee_id": 23
}
Res:
{
    "in_process": [],
    "borrowed": [],
    "concluded": []
}
*/ 
router.post("/AdminFocal/getPeripheralsById", rolesCtrl.validateToken,
                                              rolesCtrl.isFocalORAdmin,
                                              peripheralsCtrl.getPeripheralsById);

/*
URL example:
localhost:4001/AdminFocal/searchLoan/?search=sa&type=Headset%2CKeyboard&brand=Steren&status=In%20Process

URL variables
search: find coincidences in string on first_name, last_name, *full_name and peripheral_model (Ex: search=sa)
* full names can be searched with spaces in url (Ex: search=saul%20dom)

type: only return peripherals of the specified type, can be many (Ex: type=Keyboard%2CMouse)

brand: only return peripherals of the specified brand, can be many (Ex: brand=Samsung%2CLogitech)

status: only return loans of the specified status, can be many (Ex: status=In%20Process%2CBorrowed)
*/
router.get("/AdminFocal/searchLoan/", rolesCtrl.validateToken,
                                      rolesCtrl.isFocalORAdmin,
                                      peripheralsCtrl.searchLoan);

module.exports = router;
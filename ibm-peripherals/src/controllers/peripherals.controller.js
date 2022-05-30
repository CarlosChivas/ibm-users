const peripheralsCtrl = {};
const pool = require("../database");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

peripheralsCtrl.getHome = async (req, res) => {
    res.status(200).send("Working!");
  };

peripheralsCtrl.findPtype = async (req, res, next) => {

    pool.open(process.env.DATABASE_STRING, function (err, db) {
        if (err) {
            res.status(403).send(err)
        } else{
            db.query("SELECT id FROM ptype WHERE name = ?;",[req.body.ptype], function(err, data){
                if(err){
                    res.status(400).send(err);
                } else{
                    if(JSON.stringify(data) === '[]'){
                        res.status(401).send("No se puede crear un dipositivo nuevo, tipo de dispositivo invalido");
                  } else{
                        req.ptype = data[0];
                        next();
                  }
                }
            })
            db.close(function (error) { // RETURN CONNECTION TO POOL
                if (error) {
                    res.send("Error mientras se cerraba la conexion");
                }
            });
        }
    })

}

peripheralsCtrl.findBrand = async (req, res, next) => {

    pool.open(process.env.DATABASE_STRING, function (err, db) {
        if (err) {
            res.status(403).send(err)
        } else{
            db.query("SELECT id FROM brand WHERE name = ?;",[req.body.brand], function(err, data){
                if(err){
                    res.status(400).send(err);
                } else{
                    if(JSON.stringify(data) === '[]'){
                        res.status(401).send("No se puede crear un dipositivo nuevo, marca no valida");
                  } else{
                        req.brand = data[0];
                        next();
                  }
                }
            })
            db.close(function (error) { // RETURN CONNECTION TO POOL
                if (error) {
                    res.send("Error mientras se cerraba la conexion");
                }
            });
        }
    })

}

peripheralsCtrl.findPeripheralStatus = async (req, res, next) => {

    pool.open(process.env.DATABASE_STRING, function (err, db) {
        if (err) {
            res.status(403).send(err)
        } else{
            db.query("SELECT id FROM peripheral_status WHERE name = 'Available';", function(err, data){
                if(err){
                    res.status(400).send(err);
                } else{
                    if(JSON.stringify(data) === '[]'){
                        res.status(401).send("No se puede crear un dipositivo nuevo, estatus de periferico no valido");
                  } else{
                        req.peripheral_status = data[0];
                        next();
                  }
                }
            })
            db.close(function (error) { // RETURN CONNECTION TO POOL
                if (error) {
                    res.send("Error mientras se cerraba la conexion");
                }
            });
        }
    })

}    

peripheralsCtrl.createPeripheral = async (req, res) => {
    
    pool.open(process.env.DATABASE_STRING, function (err, db) {
        
        if (err) {
            res.status(403).send(err)
        } else{
            db.query("INSERT INTO peripheral(ptype,description,brand,model,peripheral_status,focal) VALUES (?,?,?,?,?,?);",[req.ptype.ID,req.body.description,req.brand.ID,req.body.model,req.peripheral_status.ID,req.user.ID], function(err, data){
                if(err){
                    res.status(400).send(err);
                } else{
                    res.status(201).send("Registro de dispositivo creado correctamente");
                }
            })
            db.close(function (error) { // RETURN CONNECTION TO POOL
                if (error) {
                    res.send("Error mientras se cerraba la conexion");
                }
            });
        }
    })
}

peripheralsCtrl.getAllPeripherals = async (req, res) => {
    
    pool.open(process.env.DATABASE_STRING, function (err, db) {
        
        if (err) {
            res.status(403).send(err)
        } else{
            db.query(`SELECT peripheral.serial, 
                             ptype.name as ptype, 
                             peripheral.description, 
                             brand.name as brand, 
                             peripheral.model, 
                             peripheral_status.name as peripheral_status,
                             users.first_name || ' ' || users.last_name as focal_name
            FROM peripheral
            INNER JOIN ptype ON peripheral.ptype = ptype.id
            INNER JOIN brand ON peripheral.brand = brand.id
            INNER JOIN users ON peripheral.focal = users.id
            INNER JOIN peripheral_status ON peripheral.peripheral_status = peripheral_status.id;`, function(err, data){
                if(err){
                    res.status(400).send(err);
                } else{
                    res.status(200).send(data);
                }
            })
            db.close(function (error) { // RETURN CONNECTION TO POOL
                if (error) {
                    res.send("Error mientras se cerraba la conexion");
                }
            });
        }
    })
}

peripheralsCtrl.getPeripherals = async (req, res) => {
    
    pool.open(process.env.DATABASE_STRING, function (err, db) {
        
        if (err) {
            res.status(403).send(err)
        } else{
            db.query(`SELECT peripheral.serial, 
                             ptype.name as ptype, 
                             peripheral.description, 
                             brand.name as brand, 
                             peripheral.model, 
                             peripheral_status.name as peripheral_status
                    FROM peripheral
                    INNER JOIN ptype ON peripheral.ptype = ptype.id
                    INNER JOIN brand ON peripheral.brand = brand.id
                    INNER JOIN peripheral_status ON peripheral.peripheral_status = peripheral_status.id
                    WHERE peripheral.focal = ?;`,[req.user.ID], function(err, data){
                if(err){
                    res.status(400).send(err);
                } else{
                    res.status(200).send(data);
                }
            })
            db.close(function (error) { // RETURN CONNECTION TO POOL
                if (error) {
                    res.send("Error mientras se cerraba la conexion");
                }
            });
        }
    })
}

peripheralsCtrl.findEmail = async (req, res, next) => {

    pool.open(process.env.DATABASE_STRING, function (err, db) {
        if (err) {
            res.status(403).send(err)
        } else{
            db.query("SELECT id FROM users WHERE email = ?;",[req.body.employee_email], function(err, data){
                if(err){
                    res.status(400).send(err);
                } else{
                    if(JSON.stringify(data) === '[]'){
                        res.status(401).send("No se puede crear prestamo, email no valido");
                  } else{
                        req.employee_id = data[0];
                        next();
                  }
                }
            })
            db.close(function (error) { // RETURN CONNECTION TO POOL
                if (error) {
                    res.send("Error mientras se cerraba la conexion");
                }
            });
        }
    })

}

peripheralsCtrl.findLoanStatus = async (req, res, next) => {

    pool.open(process.env.DATABASE_STRING, function (err, db) {
        if (err) {
            res.status(403).send(err)
        } else{
            db.query("SELECT id FROM loan_status WHERE name = ?;",["In process"], function(err, data){
                if(err){
                    res.status(400).send(err);
                } else{
                    if(JSON.stringify(data) === '[]'){
                        res.status(401).send("No se puede crear prestamo, estatus de prestamo no valido");
                  } else{
                        req.loan_status = data[0];
                        next();
                  }
                }
            })
            db.close(function (error) { // RETURN CONNECTION TO POOL
                if (error) {
                    res.send("Error mientras se cerraba la conexion");
                }
            });
        }
    })

} 

peripheralsCtrl.checkPeripheralStatus = async (req, res, next) => {
    
    pool.open(process.env.DATABASE_STRING, function (err, db) {
        if (err) {
            res.status(403).send(err)
        } else{
            db.query(`SELECT peripheral.serial
                      FROM peripheral
                      INNER JOIN peripheral_status ON peripheral.peripheral_status = peripheral_status.id
                      WHERE peripheral.serial = ? AND peripheral_status.name = ? AND peripheral.focal = ?;`,[req.body.peripheral_serial,"Available",req.user.ID], function(err, data){
                if(err){
                    res.status(400).send(err);
                } else{
                    if(JSON.stringify(data) === '[]'){
                        res.status(401).send("No se puede crear prestamo, el dispositivo no esta disponible o esta a cargo de otro focal");
                  } else{
                        next();
                  }
                }
            })
            db.close(function (error) { // RETURN CONNECTION TO POOL
                if (error) {
                    res.send("Error mientras se cerraba la conexion");
                }
            });
        }
    })
}

peripheralsCtrl.createLoan = async (req, res, next) => {
    
    pool.open(process.env.DATABASE_STRING, function (err, db) {
        
        if (err) {
            res.status(403).send(err)
        } else{
            db.query("INSERT INTO loan(employee,focal,peripheral_serial,creation,loan_status,condition_accepted,security_auth) VALUES (?,?,?,CURRENT_DATE,?,0,0);",[req.employee_id.ID,req.user.ID,req.body.peripheral_serial,req.loan_status.ID], function(err, data){
                if(err){
                    res.status(400).send(err);
                } else{
                    next();
                }
            })
            db.close(function (error) { // RETURN CONNECTION TO POOL
                if (error) {
                    res.send("Error mientras se cerraba la conexion");
                }
            });
        }
    })

}

peripheralsCtrl.changePeripheralStatus = async (req, res) => {
    
    pool.open(process.env.DATABASE_STRING, function (err, db) {
        
        if (err) {
            res.status(403).send(err)
        } else{
            db.query("UPDATE peripheral SET peripheral_status = (SELECT id from peripheral_status WHERE name = 'On loan') where serial = ?;",[req.body.peripheral_serial], function(err, data){
                if(err){
                    res.status(400).send(err);
                } else{
                    res.status(201).send("Registro de prestamo creado correctamente");
                }
            })
            db.close(function (error) { // RETURN CONNECTION TO POOL
                if (error) {
                    res.send("Error mientras se cerraba la conexion");
                }
            });
        }
    })
} 

peripheralsCtrl.getLoans = async (req, res) => {
    
    pool.open(process.env.DATABASE_STRING, function (err, db) {
        
        if (err) {
            res.status(403).send(err)
        } else{
            db.query(`SELECT loan.id,
                             users.first_name || ' ' || users.last_name as employee_name,
                             peripheral.serial,
                             loan.creation,
                             loan_status.name as loan_status,
                             loan.condition_accepted,
                             loan.security_auth
                    FROM loan
                    INNER JOIN users ON loan.employee = users.id
                    INNER JOIN loan_status ON loan.loan_status = loan_status.id
                    INNER JOIN peripheral ON loan.peripheral_serial = peripheral.serial
                    WHERE loan.focal = ?;`,[req.user.ID], function(err, data){
                if(err){
                    res.status(400).send(err);
                } else{
                    res.status(200).send(data);
                }
            })
            db.close(function (error) { // RETURN CONNECTION TO POOL
                if (error) {
                    res.send("Error mientras se cerraba la conexion");
                }
            });
        }
    })

}

module.exports = peripheralsCtrl;
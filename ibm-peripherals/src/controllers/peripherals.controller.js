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
            db.query("SELECT id FROM peripheral_status WHERE name = ?;",[req.body.peripheral_status], function(err, data){
                if(err){
                    res.status(400).send(err);
                } else{
                    if(JSON.stringify(data) === '[]'){
                        res.status(401).send("No se puede crear un dipositivo nuevo, estatus de periferico no valido");
                  } else{
                        req.status = data[0];
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
            db.query("INSERT INTO peripheral(ptype,description,brand,model,peripheral_status) VALUES (?,?,?,?,?);",[req.ptype.ID,req.body.description,req.brand.ID,req.body.model,req.status.ID], function(err, data){
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
                             peripheral_status.name as peripheral_status
            FROM peripheral
            INNER JOIN ptype ON peripheral.ptype = ptype.id
            INNER JOIN brand ON peripheral.brand = brand.id
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

// peripheralsCtrl.deletePeripheral = async (req, res) => {
//     pool.open(process.env.DATABASE_STRING, function (err, db) {
        
//         if (err) {
//             res.status(403).send(err)
//         } else{
//             db.query("DELETE FROM peripheral where description = 'New mouse added';", function(err, data){
//                 if(err){
//                     res.status(400).send(err);
//                 } else{
//                     res.status(201).send("Deleted");
//                 }
//             })
//             db.close(function (error) { // RETURN CONNECTION TO POOL
//                 if (error) {
//                     res.send("Error mientras se cerraba la conexion");
//                 }
//             });
//         }
//     })
// }

module.exports = peripheralsCtrl;
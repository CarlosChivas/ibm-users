const peripheralsCtrl = {};
const pool = require("../database");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

peripheralsCtrl.getHome = async (req, res) => {
    res.status(200).send("Working!");
  };

peripheralsCtrl.matchEmail = async (req, res, next) => {
    //await bcryptjs.compare(req.body.password, "123456");
    //res.send(process.env.DATABASE_STRING);
    var userFound;
    try{
        pool.open(process.env.DATABASE_STRING, function (err, db) {
            if (err) {
                res.status(403).send(err);
            } else{
                db.query("SELECT * FROM users WHERE email = ?", [req.body.email],function(err, data) {
                    if(err){
                      res.send(err);
                    } else{
                        //const res = await checkPassword(req.body.password, data[0].PASSWORD)
                        //console.log("Me regresa check password: ", res)
                        if(data.length == 0 /*|| await checkPassword(req.body.password, data[0].PASSWORD)/*!(await bcryptjs.compare(req.body.password, data[0].PASSWORD))*/){
                            res.status(401).send("Credenciales incorrectas");
                      } else{
                            req.user = data[0]
                            next()
                      }
                    }
                })
                db.close(function (error) { // RETURN CONNECTION TO POOL
                    if (error) {
                        res.status(403).send("Error mientras se cerraba la conexion")
                    }
                });
            }
            
        })
    } catch (err){
        console.log(err)
    }
        
}

peripheralsCtrl.matchPassword = async (req, res, next) => {
    if(await bcryptjs.compare(req.body.password,req.user.PASSWORD)){
        const id = req.user.ID;
        const token = jwt.sign({id:id}, process.env.JWT_SECRETKEY)
        console.log(token)
        const cookieOptions = {
            expires: new Date(Date.now()+90*24*60*1000),
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            domain: ""
        }
        res.cookie('jwt', token, cookieOptions);
        res.status(200).send("Inicio de sesion correcto")
    } else{ 
        res.status(401).send("Credenciales incorrectas")
    }
}

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

// peripheralsCtrl.getPeripherals = async (req, res) => {
    
//     pool.open(process.env.DATABASE_STRING, function (err, db) {
        
//         if (err) {
//             res.status(403).send(err)
//         } else{
//             db.query("SELECT * FROM peripheral;", function(err, data){
//                 if(err){
//                     res.status(400).send(err);
//                 } else{
//                     res.status(200).send(data);
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
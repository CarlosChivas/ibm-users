const rolesCtrl = {};
const pool = require("../database")
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

rolesCtrl.validateToken = async(req, res, next) => {
    //console.log(req.cookies)
    jwt.verify(req.cookies.jwt, process.env.JWT_SECRETKEY, function(err, decoded) {
        if(err){
            //res.status(401).send("Inicio de sesion requerido");
            res.status(401).send(err)
        } else{
            pool.open(process.env.DATABASE_STRING, function (err, db) {
                if (err) {
                    res.status(401).send(err);
                } else{
                    db.query("SELECT * FROM users WHERE ID = ?",[decoded.id], function(err, data){
                        if(err){
                            res.status(401).send(err);
                        } else{
                            if(data.length>0){
                                req.user = data[0];
                                next();
                            } else{
                                res.status(401).send("User not found");
                            }
                        }
                    })
                    db.close(function (error) { // RETURN CONNECTION TO POOL
                        if (error) {
                            res.send("Error mientras se cerraba la conexion")
                        }
                    });
                }})
        }
    });
}

rolesCtrl.isAdmin = async(req,res,next) => {
    //console.log(req.cookies)
    console.log(req.user)
    if(req.user.ROLE === "Adminstrator"){
        next();
    } else{
        res.status(401).send("You don't have access");
    }
}
rolesCtrl.isFocal = async(req,res,next) => {
    //console.log(req.cookies)
    if(req.user.ROLE === "Focal"){
        next();
    } else{
        res.status(401).send("You don't have access");
    }
}
rolesCtrl.isEmpoyee = async(req,res,next) => {
    //console.log(req.cookies)
    if(req.user.ROLE === "Employee"){
        next();
    } else{
        res.status(401).send("You don't have access");
    }
}
module.exports = rolesCtrl;

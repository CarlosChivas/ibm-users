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
                    
                    db.query(`SELECT users.id, users.first_name, users.last_name, 
                            role.name as role_name, department.name as department_name 
                            FROM users 
                            INNER JOIN role ON users.role=role.id 
                            INNER JOIN department ON users.department=department.id 
                            WHERE users.id = ?;`,[decoded.id], function(err, data){
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
    if(req.user.ROLE_NAME === "Administrator"){
        //next();
        next()
    } else{
        res.status(401).send("You don't have access");
    }
}
rolesCtrl.isFocal = async(req,res,next) => {
    //console.log(req.cookies)
    if(req.user.ROLE_NAME === "Focal"){
        //next();
        res.status(200).send("Correct access 'Focal'")
    } else{
        res.status(401).send("You don't have access");
    }
}
rolesCtrl.isEmpoyee = async(req,res,next) => {
    //console.log(req.cookies)
    if(req.user.ROLE_NAME === "Employee"){
        //next();
        res.status(200).send("Correct access 'Employee'")
        
    } else{
        res.status(401).send("You don't have access");
    }
}


module.exports = rolesCtrl;


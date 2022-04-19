const usersCtrl = {};
const pool = require("../database")
const jwt = require("jsonwebtoken")

usersCtrl.getHome = async (req, res) => {
  res.status(200).send("Hola mundo *");
};

usersCtrl.login = async (req, res) => {
    //res.send(process.env.DATABASE_STRING);
    try{
        pool.open(process.env.DATABASE_STRING, function (err, db) {
            if (err) {
                res.send(err);
            } else{
                db.query("SELECT * FROM users WHERE email = ?", [req.body.email],function(err, data) {
                    if(err){
                      res.send(err);
                    } else{
                      if(data.length == 0 || data[0].PASSWORD != req.body.password){
                            res.status(401).send("Credenciales incorrectas");
                      } else{
                            const id = data[0].ID;
                            const token = jwt.sign({id:id}, process.env.JWT_SECRETKEY)
                            console.log(token)
                            const cookieOptions = {
                                expires: new Date(Date.now()+90*24*60*1000),
                                httpOnly: true,
                                sameSite: 'none',
                                secure: false
                            }
                            res.cookie('jwt', token, cookieOptions);
                            res.status(200).send("Inicio de sesion correcto")
                      }
                    }
                })
                db.close(function (error) { // RETURN CONNECTION TO POOL
                    if (error) {
                        res.send("Error mientras se cerraba la conexion")
                    }
                });
            }
            
        });
    } catch (err){
        console.log(err)
    }
        
}

usersCtrl.validateToken = async(req, res, next) => {
    //console.log(req.cookies)
    jwt.verify(req.cookies.jwt, process.env.JWT_SECRETKEY, function(err, decoded) {
        if(err){
            res.status(401).send("Inicio de sesion requerido");
        } else{
            pool.open(process.env.DATABASE_STRING, function (err, db) {
                if (err) {
                    next();
                } else{
                    db.query("SELECT * FROM users WHERE ID = ?",[decoded.id], function(err, data){
                        if(err){
                            next();
                        } else{
                            if(data.length>0){
                                req.user = data[0];
                            }
                            next();
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

usersCtrl.getUserData = async(req, res) => {
    if(req.user){
        res.send(req.user);
    } else{
        res.status(401).send("Inicio de sesion requerido");
    }
}
usersCtrl.logout = async(req, res) => {
    res.clearCookie('jwt');
    res.status(200).send("Sesion cerrada correctamente");
}

module.exports = usersCtrl;
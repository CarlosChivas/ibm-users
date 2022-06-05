const peripheralsCtrl = {};
const pool = require("../database");

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
            db.query("INSERT INTO peripheral(ptype,description,brand,model,peripheral_status,focal,department) VALUES (?,?,?,?,?,?,(SELECT id from department where name = ?));",[req.ptype.ID,req.body.description,req.brand.ID,req.body.model,req.peripheral_status.ID,req.user.ID,req.user.DEPARTMENT_NAME], function(err, data){
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

peripheralsCtrl.getAvailablePeripherals = async (req, res) => {
    
    let focalRole = '';
    
    if(req.user.ROLE_NAME === 'Focal'){
        focalRole = 'AND peripheral.focal = ' + req.user.ID;
    }
    
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
                             users.first_name || ' ' || users.last_name as user_name,
                             department.name as department_name
            FROM peripheral
            INNER JOIN ptype ON peripheral.ptype = ptype.id
            INNER JOIN brand ON peripheral.brand = brand.id
            INNER JOIN users ON peripheral.focal = users.id
            INNER JOIN peripheral_status ON peripheral.peripheral_status = peripheral_status.id
            INNER JOIN department ON peripheral.department = department.id
            WHERE peripheral_status.name = 'Available' ${focalRole};`, function(err, data){
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
                      WHERE peripheral.serial = ? AND peripheral_status.name = ?;`,[req.body.peripheral_serial,"Available"], function(err, data){
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
    
    let focalRole = '';
    
    if(req.user.ROLE_NAME === 'Focal'){
        focalRole = 'WHERE loan.focal = ' + req.user.ID;
    }
    
    pool.open(process.env.DATABASE_STRING, function (err, db) {
        
        if (err) {
            res.status(403).send(err)
        } else{
            db.query(`SELECT
                        loan.id as loan_id,  
                        users.first_name || ' ' || users.last_name as employee_name,
                        loan.peripheral_serial,
                        ptype.name as type,
                        brand.name as brand,
                        peripheral.model,
                        peripheral.description,
                        loan.creation,
                        loan.concluded,
                        loan.condition_accepted,
                        loan.security_auth,
                        loan_status.name as loan_status
                    FROM loan
                    INNER JOIN users ON loan.employee = users.id
                    INNER JOIN loan_status ON loan.loan_status = loan_status.id
                    INNER JOIN peripheral ON loan.peripheral_serial = peripheral.serial
                    INNER JOIN ptype ON peripheral.ptype = ptype.id
                    INNER JOIN brand ON peripheral.brand = brand.id
                    ${focalRole}
                    ORDER BY loan.creation, loan.loan_status;`, function(err, data){
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

peripheralsCtrl.getPeripheralFields = async (req, res) => {
    
    pool.open(process.env.DATABASE_STRING, function (err, db) {
        
        if (err) {
            res.status(403).send(err)
        } else{
            db.query(`SELECT name FROM ptype;`, function(err, data){
                if(err){
                    res.status(400).send(err);
                } else{
                    req.ptype = data;
                }
            })
            db.query(`SELECT name FROM brand;`, function(err, data){
                if(err){
                    res.status(400).send(err);
                } else{
                    res.status(200).json({ptype: req.ptype, brand: data});
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

peripheralsCtrl.getOwnLoans = async (req, res) => {
        
    let role = "employee";
    
    // if(req.user.ROLE_NAME === "Administrator" || req.user.ROLE_NAME === "Focal"){
    //     role = "focal";
    // }

    let query = `SELECT
                    loan.peripheral_serial,
                    ptype.name as type,
                    brand.name as brand,
                    peripheral.model,
                    peripheral.description,
                    loan.creation,
                    loan.concluded,
                    loan.condition_accepted,
                    loan.security_auth
                FROM loan
                INNER JOIN loan_status ON loan.loan_status = loan_status.id
                INNER JOIN peripheral ON loan.peripheral_serial = peripheral.serial
                INNER JOIN ptype ON peripheral.ptype = ptype.id
                INNER JOIN brand ON peripheral.brand = brand.id
                WHERE loan.${role} = ${req.user.ID}`;

    pool.open(process.env.DATABASE_STRING, function (err, db) {
        
        if (err) {
            res.status(403).send(err)
        } else{
            db.query(`${query} AND loan.loan_status = (SELECT id FROM loan_status WHERE name = 'In process') ORDER BY creation;`, function(err, data){
                if(err){
                    res.status(400).send(err);
                } else{
                    req.in_process = data;
                }
            })
            db.query(`${query} AND loan.loan_status = (SELECT id FROM loan_status WHERE name = 'Borrowed') ORDER BY creation;`,[req.user.ID], function(err, data){
                if(err){
                    res.status(400).send(err);
                } else{
                    req.borrowed = data;
                }
            })
            db.query(`${query} AND loan.loan_status = (SELECT id FROM loan_status WHERE name = 'Concluded') ORDER BY creation;`,[req.user.ID], function(err, data){
                if(err){
                    res.status(400).send(err);
                } else{
                    res.status(200).json({in_process: req.in_process, borrowed: req.borrowed, concluded: data});
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

peripheralsCtrl.getPeripheralsById = async (req, res) => {

    let query = `SELECT
                    loan.peripheral_serial,
                    ptype.name as type,
                    brand.name as brand,
                    peripheral.model,
                    peripheral.description,
                    loan.creation,
                    loan.concluded,
                    loan.condition_accepted,
                    loan.security_auth
                FROM loan
                INNER JOIN loan_status ON loan.loan_status = loan_status.id
                INNER JOIN peripheral ON loan.peripheral_serial = peripheral.serial
                INNER JOIN ptype ON peripheral.ptype = ptype.id
                INNER JOIN brand ON peripheral.brand = brand.id
                WHERE loan.employee = ${req.body.employee_id}`;

    pool.open(process.env.DATABASE_STRING, function (err, db) {
        
        if (err) {
            res.status(403).send(err)
        } else{
            db.query(`${query} AND loan.loan_status = (SELECT id FROM loan_status WHERE name = 'In process') ORDER BY creation;`, function(err, data){
                if(err){
                    res.status(400).send(err);
                } else{
                    req.in_process = data;
                }
            })
            db.query(`${query} AND loan.loan_status = (SELECT id FROM loan_status WHERE name = 'Borrowed') ORDER BY creation;`,[req.user.ID], function(err, data){
                if(err){
                    res.status(400).send(err);
                } else{
                    req.borrowed = data;
                }
            })
            db.query(`${query} AND loan.loan_status = (SELECT id FROM loan_status WHERE name = 'Concluded') ORDER BY creation;`,[req.user.ID], function(err, data){
                if(err){
                    res.status(400).send(err);
                } else{
                    res.status(200).json({in_process: req.in_process, borrowed: req.borrowed, concluded: data});
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

function prepareForInQuery(s) {
    let res = s.toLowerCase();
    res = res.split(',');
    res = res.join("','");
    res = "'"+res+"'";
    return res;
}

peripheralsCtrl.searchLoan = async (req, res) => {

    if(req.user.ROLE_NAME === 'Administrator'){
        req.user.ID = 'true';
    }
    if(!req.query.search){
        req.query.search = "";
    }
    
    let typeQuery = '';
    if(req.query.type){
        typeQuery = `AND LOWER(ptype.name) IN (${prepareForInQuery(req.query.type)})`;
    }

    let brandQuery = '';
    if(req.query.brand){
        brandQuery = `AND LOWER(brand.name) IN (${prepareForInQuery(req.query.brand)})`;
    }

    let statusQuery = '';
    if(req.query.status){
        statusQuery = `AND LOWER(loan_status.name) IN (${prepareForInQuery(req.query.status)})`;
    }
    
    pool.open(process.env.DATABASE_STRING, function (err, db) {
        
        if (err) {
            res.status(403).send(err)
        } else{
            db.query(`SELECT
                        loan.id as loan_id,  
                        users.first_name || ' ' || users.last_name as employee_name,
                        loan.peripheral_serial,
                        ptype.name as type,
                        brand.name as brand,
                        peripheral.model,
                        peripheral.description,
                        loan.creation,
                        loan.concluded,
                        loan.condition_accepted,
                        loan.security_auth,
                        loan_status.name as loan_status
                    FROM loan
                    INNER JOIN users ON loan.employee = users.id
                    INNER JOIN loan_status ON loan.loan_status = loan_status.id
                    INNER JOIN peripheral ON loan.peripheral_serial = peripheral.serial
                    INNER JOIN ptype ON peripheral.ptype = ptype.id
                    INNER JOIN brand ON peripheral.brand = brand.id
                    WHERE loan.focal = ${req.user.ID}
                    AND
                    (LOWER(users.first_name) LIKE LOWER('%${req.query.search}%')
                    OR LOWER(users.last_name) LIKE LOWER('%${req.query.search}%')
                    OR LOWER(peripheral.model) LIKE LOWER('%${req.query.search}%')
                    OR LOWER(users.first_name || ' ' || users.last_name) LIKE LOWER('%${req.query.search}%'))
                    ${typeQuery} ${brandQuery} ${statusQuery}
                    ORDER BY loan.creation, loan.loan_status;`, function(err, data){
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
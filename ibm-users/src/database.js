const Pool = require("ibm_db").Pool
const pool = new Pool()
//const connStr = "DATABASE=bludb;HOSTNAME=2f3279a5-73d1-4859-88f0-a6c3e6b4b907.c3n41cmd0nqnrk39u98g.databases.appdomain.cloud;PORT=30756;PROTOCOL=TCPIP;UID=szg02442;PWD=xIRGnwrUBpJxLXyT;Security=SSL";

/*ibmdb.open(connStr, function (err,conn) {
    if (err){
        console.log(err);
        res.send("Error with connection");
    } else {
        module.exports = conn;
        console.log("Conexion establecida");
    }
});*/

module.exports = pool;
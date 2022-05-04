# IBM - Peripherals Loan

## Users microservice - IP: http://169.51.203.100:32688

### [POST] /login: 
Body: {

  "email": "",  
  "password": ""
  
}

#### Response: 
Casos 
- Credenciales correctas: Status(200), Mensaje("Inicio de sesion correcto")
- Credenciales incorrectas: Status(401), Mensaje("Credenciales incorrectas")
- Error al conectar con la base de datos: Status(403), Mensaje [Error lanzado por ibm_db]
- Error al cerrar la conexión a la base de datos: Status(403), Mensaje [Error lanzado por ibm_db]
- 

### [GET] /logout: 
*Body no requerido*
#### Response: 
Casos 
- Logout correcto: Status(200), Mensaje("Sesion cerrada correctamente")


### [POST] /register:
Body: {
    "email": "",
    "password": "",
    "firstName": "",
    "lastName": "",
    "department": Foreign Key(Int),
    "role": Foreign Key(Int)
}




//importaciones
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("./conexion");  //conexion

//configuracion
const app = express(); // para usar express
const env = process.env; // variables de ambiente colocamos el puerto para el despliegue, para sistemas externos
                         // que tome le numero del puerto o que es || el puerto 8080 , si no que tome cualquiera con el env.port
const port =env.port || 3000;
//app.use()
app.use(express.json()); // esta libreria sirve para enviar con el metodo post formato json para crear el registro
app.use(morgan('dev')); // aqui digo que ejecute morgan en modo desarrollador
app.use(cors()); // esto me permite hacer conexiones externas


// configuro el arranque
app.listen(port, ()=>{
    console.log("Hola peter servidor iniciado "+port);
});

//rutas base donde llamamos al local host al puerto 8080 
app.get("/", (request,response)=>{
    response.send("API INICIADO");
});

// ruta generica que va a ser clientes, importo cliente rutas
app.use("/clientes", require("./rutas/ClienteRutas"));

// ruta generica que va a ser login, importo login rutas
app.use("/login", require("./rutas/LoginRutas"));  // aqui envio con el motodo post para conectar con postman
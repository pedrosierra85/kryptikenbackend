const clienteModelo = require("../modelos/ClienteModelo"); // debo importar el js de cliente modelo
const bcrypt = require("bcrypt"); // importa para usar la funcion de encriptar
const ClienteOperacionesCRUD = {}


// estos metodos van a hacer operaciones asyncronicas
ClienteOperacionesCRUD.crearCliente = async (req, res) => {
  try {
    const body = req.body;
    body.password = await cifrarPassword(body.password);
    const cliente = new ClienteModelo(body);
    const clienteguardado = await cliente.save();
    res.status(201).send(clienteguardado);
   //77 const objeto = req.body; // para enviar por el boddy la informacion
   //77 console.log(objeto);
    /*  const objeto = {
          nombre_completo:"peter",
          cedula:91431,
          direccion:"calle 45",
          ciudad:"bucaramanga",
          barrio:"campohermoso",
          telefono:6523200,
          celular:3197800614,
          email:"pepe@uis.edu.co",
          password:"123"
       }*/
    //77const cliente = new clienteModelo(objeto);
   //77 const clienteguardado = await cliente.save();  //el await es que el espera para ejecutar esta orden
   //77 res.status(201).send(clienteguardado);
  } catch (error) {
    res.status(400).send("error muy trizte " + error);
   // console.log(error);
  }
}


/*
ClienteOperacionesCRUD.buscarClientes = async (req, res) => {
  try {
   const filtro = req.query; // si quisiera hace la busqueda con un filtro especifico ejemplo apellido
   console.log(filtro);  // lo envio con los parametro ejemplo http://localhost:8080/clientes?apellido=sierra
   // eb caso de que el filtro sea null entonces que me busqeu todos
   let listarclientes; 
   if(filtro != null){
     listarclientes = await clienteModelo.find(filtro);
   }else{
     listarclientes = await clienteModelo.find();
   }
    //const listarclientes = await clienteModelo.find();
    if (listarclientes.length > 0) {
      res.status(200).send(listarclientes);
    } else {
      res.status(404).send("No hay datos"); // si no hay datos arroja esto
    }

  } catch (error) {
    res.status(400).send("Mala peticion.");
  }
}
*/

ClienteOperacionesCRUD.buscarClientes = async (req, res) => {
  try {
    const filtro = req.query; // si quisiera hace la busqueda con un filtro especifico ejemplo apellido
    // console.log(filtro);  // lo envio con los parametro ejemplo http://localhost:8080/clientes?apellido=sierra
    // eb caso de que el filtro sea null entonces que me busqeu todos
    let listaclientes;
    /* if(filtro != null){ con esto busca en especifico un campo o nombre , o bien sea apellido
    listarclientes = await clienteModelo.find(filtro);
  }else{
    listarclientes = await clienteModelo.find();
  } */

    if (filtro.q != null) { // con este consulta en dos campos ejemplo nombre y apellido
      //  console.log(filtro.q);
      listaclientes = await clienteModelo.find(
        {
          "$or": [  // no funcionaba por q faltaba el signo peso
            { "nombre_completo": { $regex: filtro.q, $options: "i" } } //, // regex es una expresion regular
            // { "ciudad": { $regex:filtro.q, $options:"i" } } // esto es solo para string solo texto
          ]
        }
      );
    }
    //const listarclientes = await clienteModelo.find();
    // if (listarclientes.length > 0) {
    // res.status(200).send(listarclientes);
    else {
      listaclientes = await clienteModelo.find(filtro);
    }
    if (listaclientes.length > 0) {
      res.status(200).send(listaclientes);
    } else {
      res.status(404).send("no hay daticos");
    }
  } catch (error) {
    res.status(400).send("Mala peticion." + error);
  }
}

ClienteOperacionesCRUD.buscarCliente = async (req, res) => {
  try {
    const id = req.params.id;
    const cliente = await clienteModelo.findById(id);
    if (cliente != null) {
      res.status(200).send(cliente);
    } else {
      res.status(404).send("No hay datos"); // si no hay datos arroja esto
    }

  } catch (error) {
    res.status(400).send("Mala peticion." + error);
  }
}

ClienteOperacionesCRUD.modificarCliente = async (req, res) => {

  try {
    const id = req.params.id;
    const body = req.body;
    const datosactualizar = {
      nombre_completo: body.nombre_completo,
      //cedula:body.cedula, la quito porque esto no se debe nmodificar por logica ya q es unico
      direccion: body.direccion,
      ciudad: body.ciudad,
      barrio: body.barrio,
      telefono: body.telefono,
      celular: body.celular,
      //email:{type:String, maxLength:80, require:true, unique:true},
      password: body.password
    }
    const clienteactualizado = await clienteModelo.findByIdAndUpdate(id, datosactualizar, { new: true });
    if (clienteactualizado != null) {
      res.status(200).send(clienteactualizado);
    }
    else {
      res.status(404).send("no hay datirijillos");
    }
  } catch (error) {
    res.status(400).send("se daño la actualizacion " + error);
  }

}

ClienteOperacionesCRUD.guardarCliente = async (req, res) => {
  try {
    const body = req.body;
    body.password = await cifrarPassword(body.password);
    const cliente = new ClienteModelo(body);
    const clienteguardado = await cliente.save();
    res.status(201).send(clienteguardado);
  } catch (error) {
    res.status(400).json(error);
  
}
}

const cifrarPassword = async (password) => {
  const SALT_TIMES = 10;
  const salt = await bcrypt.genSalt(SALT_TIMES);
  return await bcrypt.hash(password, salt);
}
  


ClienteOperacionesCRUD.borrarcliente = async (req, res) => {
  try {
    const id = req.params.id;
    const cliente = await clienteModelo.findByIdAndDelete(id); // busca por id y lo borra
    if (cliente != null) {
      res.status(200).send(cliente);
    } else {
      res.status(404).send("no hay datos para borrar");
    }
  } catch (error) {
    res.status(400).send("peticion de borrado fallo" + error);
  }
}

ClienteOperacionesCRUD.crearTicket = async (req, res) => {
  try {
    const objeto = req.body; // para enviar por el boddy la informacion
    console.log(objeto);
    /*  const objeto = {
          nombre_completo:"peter",
          cedula:91431,
          direccion:"calle 45",
          ciudad:"bucaramanga",
          barrio:"campohermoso",
          telefono:6523200,
          celular:3197800614,
          email:"pepe@uis.edu.co",
          password:"123"
       }*/
    const cliente = new clienteModelo(objeto);
    const clienteguardado = await cliente.save();  //el await es que el espera para ejecutar esta orden
    res.status(201).send(clienteguardado);
  } catch (error) {
    res.status(400).send("error mariquis " + error);
  }
}





module.exports = ClienteOperacionesCRUD;



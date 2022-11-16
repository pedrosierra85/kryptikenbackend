// aqui incorporo las rutas exclusivamente para el modiulo de clientes

const ClienteOperacionesCRUD = require("../operaciones/ClienteOperacionesCRUD");
const router = require("express").Router(); // importo router q viene la estructura de los 
                                            //llamados para ver los metodos q necesito y donde lo llama

router.get("/", ClienteOperacionesCRUD.buscarClientes);  // ruta especifica para que el navegador ejecute ese modulo
router.get("/:id", ClienteOperacionesCRUD.buscarCliente);
router.post("/", ClienteOperacionesCRUD.crearCliente);
router.put("/:id", ClienteOperacionesCRUD.modificarCliente);
router.delete("/:id", ClienteOperacionesCRUD.borrarcliente);
//router.post("/", ClienteOperacionesCRUD.crearTicket);



module.exports = router;
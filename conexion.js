const { default: mongoose } = require("mongoose");

const username="admin";
const password="admin";
const database="BDkryptike"
// URI es es diferente a url esta es una localicacion de una pagina web y uri es una identificacion 
//para cualqueir tipo de recurso o de protocolo
const URI ="mongodb+srv://"+username+":"+password+"@cluster0.1lvbojb.mongodb.net/"+database+"?retryWrites=true&w=majority";


const conectar =async() =>{

    try{
        mongoose.connect(URI);
        console.log("Atlas esta en linea");

    }catch (error){
        console.log("Error de conexion "+error);
    }
}

/* otra forma del try catch
mongoose.connect(URI)
.then(()=>{console.log("Atlas esta en linea");})
.catch(()=>{console.log("Error de conexion "+error);})
*/
conectar();

module.exports=mongoose;
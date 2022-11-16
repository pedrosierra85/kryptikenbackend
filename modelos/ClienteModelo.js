const mongoose = require("mongoose");

const ClienteSchema = mongoose.Schema({
    nombre_completo:{type:String, maxLength:50, require:true, unique:false},
    cedula:{type:Number,  require:true, unique:true},
    direccion:{type:String, maxLength:80, require:true, unique:false},
    ciudad:{type:String, maxLength:50, require:true, unique:false},
    barrio:{type:String, maxLength:50, require:true, unique:false},
    telefono:{type:Number, require:false, unique:false},
    celular:{type:Number, require:true, unique:false},
    email:{type:String, maxLength:80, require:true, unique:true},
    password:{type:String, require:true, unique:false},
    es_admin: {type:Boolean, require:true}

})



module.exports =  mongoose.model("clientes", ClienteSchema);

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let proveedorSchema = new Schema({
    codigoSolicitud:{
        type: String
    },
    nombreProduct:{
        type: String
    },
    unidades:{
        type: Number
    },
    proveedor:{
        type: String
    }
});

proveedorSchema.plugin(uniqueValidator,{
    message: '{PATH} debe ser unico'
});

module.exports = mongoose.model('Proveedor', proveedorSchema);
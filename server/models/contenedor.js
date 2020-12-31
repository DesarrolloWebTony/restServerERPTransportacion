const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let categoriasValidas = {
    values: ['Electronica', 'Hogar', 'Linea blanca', 'Smartphone', 'Videojuegos', 'Papeleria'],
    message: '{VALUE} no es un rol valido'
}

let Schema = mongoose.Schema;

let contenedorSchema = new Schema({
    codigoContenedor: {
        type: String,
        required: [true, 'el codigo es necesario'],
        unique: true
    },
    tipoProducts:{
        type: String,
        required: [true, 'el tipo de productos es necesario'],
        enum: categoriasValidas
    },
    origen:{
        type: String,
        required: [true, 'el origen es necesario']
    },
    proveedor:{
        type: String,
        required: [true, 'el proveedor es necesario']
    },
    porcentajeVenta:{
        type: Number,
        required: [true, 'el porcentaje es necesario']
    },
    cantStock:{
        type: Number,
        required: [true, 'la cantidad de stock es necesaria']
    },
    fechaIngreso:{
        type: String,
        required: [true, 'la fecha de ingreso es necesaria']
    },
    fechaSalida:{
        type: String,
        required: false
    },
    localizacion:{
        type: String,
        required: [true, 'la localizacion es necesaria']
    }
});

contenedorSchema.plugin(uniqueValidator,{
    message: '{PATH} debe ser unico'
});

module.exports = mongoose.model('Contenedor', contenedorSchema);
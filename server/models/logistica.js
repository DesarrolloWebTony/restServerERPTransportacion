const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let tiposVehiculos = {
    values: ['moto','auto','camioneta','trailer'],
    message: '{VALUE} no es un rol valido'
};

let destinos = {
    values : ['Yucatan','CDMX','Mexico','Monterrey','Sinaloa','Veracruz'],
    message: '{VALUE} no es un destino valido'
};

let Schema = mongoose.Schema;

let logisticaSchema = new Schema({
    codigoRuta:{
        type: String,
        required: [ true, 'la codigo es necesario'],
        unique: true
    },
    ruta: {
        type: String,
        required: [ true, 'la ruta es necesaria']
    },
    tipoVehiculo: {
        type: String,
        required: [true, 'el tipo de vehiculo es necesario'],
        enum: tiposVehiculos
    },
    numArticulos: {
        type: Number,
        required: [true, 'el num Articulos es necesario']
    },
    tiempoEstimado: {
        type: String,
        required: [true, 'el tiempo estimado es necesario']
    },
    fechaSalida: {
        type: String,
        // required: [true, 'fecha de salida necesario']
    },
    destino: {
        type: String,
        enum: destinos,
        required:[true, 'el destino es necesario']
    },
    entregado:{
        type: Boolean,
        required: [true, 'especificar estado de entregado']
    }
});

logisticaSchema.plugin(uniqueValidator,{
    message: '{PATH} debe ser unico'
});

module.exports = mongoose.model('Logistica', logisticaSchema);
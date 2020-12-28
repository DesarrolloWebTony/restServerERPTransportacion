const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let logisticaSchema = new Schema({
    ruta: {
        type: String,
        required: [ true, 'la ruta es necesaria']
    },
    tipoVehiculo: {
        type: String,
        required: [true, 'el tipo de vehiculo es necesario']
    },
    numArticulos: {
        type: String,
        required: [true, 'el num Articulos es necesario']
    },
    tiempoEstimado: {
        type: String,
        required: [true, 'el tiempo estimado es necesario']
    },
    fechaSalida: {
        type: String,
        required: [true, 'fecha de salida necesario']
    },
    destino: {
        type: String,
        required:[true, 'el destino es necesario']
    }

});
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let distribucionSchema = new Schema({
    codigoDistribucion:{
        type: String,
        required: [true, 'el codigo es necesario'],
        unique: true
    },
    nombreRemi:{
        type: String,
        required: [true, 'el nombre de receptor es necesario']
    },
    nombreEmi:{
        type: String,
        required: [true, 'el nombre de emisor es necesario']
    },
    fechaEncargo:{
        type: String,
        required: [true, 'la fecha encargo es necesaria']
    },
    fechaSalida:{
        type: String,
    },
    numArticulos:{
        type: Number,
        required: [true, 'numero artic es necesario']
    },
    express:{
        type: Boolean,
        required: [true, 'especificar servicio express']
    },
    estadoDeEnvio:{
        type: String,
        required: [true, 'el estado de envio es necesario']
    },
    descrip:{
        type: String,
        required: [true, 'la descrip es necesaria']
    }
});

distribucionSchema.plugin(uniqueValidator,{
    message: '{PATH} debe ser unico'
});

module.exports = mongoose.model('Distribucion', distribucionSchema);
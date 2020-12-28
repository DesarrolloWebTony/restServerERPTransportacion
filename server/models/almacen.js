const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let categoriasValidas = {
    values: ['Electronica', 'Hogar', 'Linea blanca', 'Smartphone', 'Videojuegos', 'Papeleria'],
    message: '{VALUE} no es un rol valido'
}

let Schema = mongoose.Schema;

let almacenSchema = new Schema({
    codigoProdAlmacen: {
        type: String,
        required: [true, 'el codigo de almacen es necesario'],
        unique: true
    },
    nombreProd: {
        type: String,
        required: [true, 'el nombre es necesario']
    },
    tiempoEnAl: {
        type: String,
        required: [true, 'el tiempo en almacen es necesario']
    },
    localizacion: {
        type: String,
        required: [true, 'la localizacion es necesaria']
    },
    porcentaje: {
        type: Number,
        required: [true, 'el porcentaje es necesario']
    },
    cantStock: {
        type: Number,
        required: [true, 'la cantStock es necesario']
    },
    categoria: {
        type: String,
        required: [true, 'la categoria es necesario'],
        enum: categoriasValidas
    },
    proveedor: {
        type: String,
        required: [true, 'el proveedor es necesario']
    }
});

almacenSchema.plugin(uniqueValidator,{
    message: '{PATH} debe ser unico'
});


module.exports = mongoose.model('Almacen', almacenSchema);
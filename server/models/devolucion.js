const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let calidadProduct = {
    values: ['E','B','R','P'],
    message: '{VALUE} no es un rol valido'
}

let Schema = mongoose.Schema;

let devolucionSchema = new Schema({
    codigoProdDevolucion:{
        type: String,
        required: [true,'el codigo es necesario'],
        unique: true
    },
    tipoProduct:{
        type:String,
        required: [true,'el tipo de producto es necesario']
    },
    nombre:{
        type:String,
        required: [true,'el nombre es necesario']
    },
    origen:{
        type:String,
        required: [true,'el origen es necesario']
    },
    descripFalla:{
        type:String,
        required: [true,'la falla es necesaria']
    },
    calidad:{
        type:String,
        required: [true,'la calidad es necesaria'],
        enum: calidadProduct
    },
    tratado:{
        type: Boolean,
        required: [true,'el tratado es necesario']
    },
});

devolucionSchema.plugin(uniqueValidator,{
    message: '{PATH} debe ser unico'
});

module.exports = mongoose.model('Devolucion',devolucionSchema);
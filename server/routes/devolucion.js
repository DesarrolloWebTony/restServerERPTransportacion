const express = require('express');
const Devolucion = require('../models/devolucion');

const app = express();

app.post('/devolucion', function(req, res){
    let body = req.body;

    let devolucion = new Devolucion ({
        codigoProdDevolucion: body.codigoProdDevolucion,
        tipoProduct: body.tipoProduct,
        nombre: body.nombre,
        origen: body.origen,
        descripFalla: body.descripFalla,
        calidad: body.calidad,
        tratado: body.tratado,
    });

    devolucion.save((err, devolucionBD)=>{
        if(err){
            res.status(400).json({
                ok:false,
                err
            });
        }
        res.json({
            ok: true,
            devolucion: devolucionBD
        });                
    });
});

app.get('/contarDevoluciones', function(req, res){
    Devolucion.find().count((err,count)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }
        res.json({
            contador: count
        });
    })
});

module.exports = app;

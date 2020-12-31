const express = require('express');
const Distribucion = require('../models/distribucion');

const app = express();

app.post('/distribucion', function(req, res){
    
    let body = req.body;

    let distribucion = new Distribucion({
        codigoDistribucion: body.codigoDistribucion,
        nombreRemi: body.nombreRemi,
        nombreEmi: body.nombreEmi,
        fechaEncargo: body.fechaEncargo,
        fechaSalida: body.fechaSalida,
        numArticulos: body.numArticulos,
        express: body.express,
        estadoDeEnvio: body.estadoDeEnvio,
        descrip: body.descrip
    });

    distribucion.save((err, distribucionBD)=>{
        if(err){
            res.status(400).json({
                ok:false,
                err
            });
        }
        res.json({
            ok: true,
            distribucion: distribucionBD
        });
    });
});

module.exports = app;
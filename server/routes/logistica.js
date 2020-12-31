const express = require('express');
const Logistica = require('../models/logistica');

const app = express();

app.get('/logisticas', function (req, res) {

    Logistica.find()
        .exec((err, rutas) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                rutas
            });
        });
});

app.post('/logistica', function(req, res){
    let body = req.body;

    let logistica = new Logistica({
        codigoRuta: body.codigoRuta,
        ruta: body.ruta,
        tipoVehiculo: body.tipoVehiculo,
        numArticulos: body.numArticulos,
        tiempoEstimado: body.tiempoEstimado,
        fechaSalida: body.fechaSalida,
        destino: body.destino
    });

    logistica.save((err, logisticaBD)=>{
        if(err){
            res.status(400).json({
                ok:false,
                err
            });
        }
        res.json({
            ok: true,
            logistica: logisticaBD
        });
    });
});

module.exports = app;
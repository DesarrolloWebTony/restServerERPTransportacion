const express = require('express');
const Logistica = require('../models/logistica');

const app = express();

app.get('/logistica/:id', function (req, res) {

    let id = req.params.id;

    Logistica.findById(id, (err, logisticaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            logistica: logisticaDB
        });

    });

});

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

app.put('/logistica/:id', function (req, res) {

    let id = req.params.id;
    let body = req.body;

    Logistica.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
        context: 'query'
    }, (err, logisticaBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            logistica: logisticaBD
        });

    });

});

app.delete('/logistica/:id', function (req, res) {

    let id = req.params.id;

    //findOneAndRemove 
    // No funcionaba porque este encuentra uno y lo elimina al parecer el primero
    // se podia ocupar pero cambiando One por ById
    Logistica.findByIdAndDelete(id, (err, logisticaBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            logistica: logisticaBorrado
        });

    });
});

module.exports = app;
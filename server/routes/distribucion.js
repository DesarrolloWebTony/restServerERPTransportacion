const express = require('express');
const Distribucion = require('../models/distribucion');

const app = express();

app.get('/distribucion/:id', function (req, res) {

    let id = req.params.id;

    Distribucion.findById(id, (err, distribucionDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            distribucion: distribucionDB
        });

    });

});

app.get('/distribuciones', function (req, res) {

    Distribucion.find()
        .exec((err, distribucionesBD) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                distribucionesBD
            });
        });
});

// express o convencional

app.get('/tiposEntrega', function(req, res){
    Distribucion.aggregate([
        {
            $group:{ _id:"$express", numero:{$sum:1} }
        }
    
    ]).exec((err, tipos)=>{
        if(err){
            res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            tipos
        });
    })
});



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

app.put('/distribucion/:id', function (req, res) {

    let id = req.params.id;
    let body = req.body;

    Distribucion.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
        context: 'query'
    }, (err, distribucionBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            distribucion: distribucionBD
        });

    });

});

app.delete('/distribucion/:id', function (req, res) {

    let id = req.params.id;

    //findOneAndRemove 
    // No funcionaba porque este encuentra uno y lo elimina al parecer el primero
    // se podia ocupar pero cambiando One por ById
    Distribucion.findByIdAndDelete(id, (err, distribucionBorrada) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            logistica: distribucionBorrada
        });

    });
});

module.exports = app;
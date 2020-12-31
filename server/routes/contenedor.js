const express = require('express');
const contenedor = require('../models/contenedor');
const Contenedor = require('../models/contenedor');

const app = express();

app.post('/contenedor', function(req, res){

    let body = req.body;

    let contenedor = new Contenedor({
        codigoContenedor: body.codigoContenedor,
        tipoProducts: body.tipoProducts,
        origen: body.origen,
        proveedor: body.proveedor,
        porcentajeVenta: body.porcentajeVenta,
        cantStock: body.cantStock,
        fechaIngreso: body.fechaIngreso,
        fechaSalida: body.fechaSalida,
        localizacion: body.localizacion
    });

    contenedor.save((err, contenedorBD)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }
        res.json({
            ok: true,
            contenedor: contenedorBD
        });
    });
});

app.get('/contarContenedores', function(req, res){
    Contenedor.find().count((err,count)=>{
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

app.get('/contenedores', function (req, res) {

    Contenedor.find()
        .exec((err, contenedores) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                contenedores
            });
        });
});

module.exports = app
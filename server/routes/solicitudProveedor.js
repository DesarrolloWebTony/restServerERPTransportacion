const express = require('express');
const Proveedor = require('../models/solicitudProveedor');

const app = express();

app.post('/proveedor', function (req, res) {

    let body = req.body;

    let proveedor = new Proveedor({
        codigoSolicitud: body.codigoSolicitud,
        nombreProduct: body.nombreProduct,
        unidades: body.unidades,
        proveedor: body.proveedor,
    });

    proveedor.save((err, proveedorDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            solicitud: proveedorDB
        });
    });
});

app.get('/proveedor/:id', function (req, res) {

    let id = req.params.id;

    proveedor.findById(id, (err, proveedorDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            solicitud: proveedorDB
        });

    });

});

module.exports = app;
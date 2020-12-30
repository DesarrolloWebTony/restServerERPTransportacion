const express = require('express');
const Almacen = require('../models/almacen');

const app = express();

// ===================================================
//          C R U D - A L M A C E N
// ===================================================

// const Almacen = require('../server/models/almacen');

//db.getCollection('almacens').find({proveedor:"Xiaomi"})

//db.getCollection('almacens').find({ "cantStock" : {$lt: 100} })


//Obtener un almacen

app.get('/almacen/:id', function (req, res) {

    let id = req.params.id;

    Almacen.findById(id, (err, almacenDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            almacen: almacenDB
        });

    });

});

// Obtener todos
app.get('/almacenes', function (req, res) {

    Almacen.find()
        .exec((err, almacenes) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                almacenes
            });
        });
});

// almacenes sin mucho stock

app.get('/almacenesSinStock', function (req, res) {
    Almacen.find({ "cantStock": { $lt: 500 } })
        .exec((err, almacenes) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json(
                {
                    ok: true,
                    almacenes
                });
        });
});

// los mas solicitados

app.get('/almacenesSolicitados', function (req, res) {
    Almacen.find({ "porcentaje": { $gt: 75 } }).limit(4)
        .exec((err, almacenesSolicitados) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                almacenes: almacenesSolicitados
            })

        });
});

//productos almacenados

app.get('/productosAlmacenados', function (req, res) {

    Almacen.aggregate([
        {
            $group: {
                _id: "$categoria",
                num_productos:
                    { $sum: "$cantStock" }
            }
        }
    ]).exec((err, productosAlmacenados) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        res.status(200).json({
            ok: true,
            productos: productosAlmacenados
        });

    });
});

app.post('/almacen', function (req, res) {
    //obteniendo la informacion del POST
    let body = req.body;

    let almacen = new Almacen({
        codigoProdAlmacen: body.codigoProdAlmacen,
        nombreProd: body.nombreProd,
        tiempoEnAl: body.tiempoEnAl,
        localizacion: body.localizacion,
        porcentaje: body.porcentaje,
        cantStock: body.cantStock,
        categoria: body.categoria,
        proveedor: body.proveedor
    });

    almacen.save((err, almacenDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            almacen: almacenDB
        });
    });
});

app.put('/almacen/:id', function (req, res) {

    let id = req.params.id;
    let body = req.body;

    Almacen.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
        context: 'query'
    }, (err, almacenDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            almacen: almacenDB
        });

    });

});

app.delete('/almacen/:id', function (req, res) {

    let id = req.params.id;

    Almacen.findOneAndRemove(id, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });

    });

});


module.exports = app;
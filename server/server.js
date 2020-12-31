const express = require('express');
const app = express();

const mongoose = require('mongoose');
const db = mongoose.connection;

// ===================================================
//       CORS para hacer uso de mas localhost
// ===================================================

const cors = require('cors');
app.use(cors());

// ===================================================
//                  BODY PARSER
// ===================================================

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// ===================================================
//                   USO RUTAS
// ===================================================

app.use(require('./routes/almacen'));
app.use(require('./routes/contenedor'));
app.use(require('./routes/logistica'));
app.use(require('./routes/devolucion'));
app.use(require('./routes/distribucion'));


// ===================================================
//              MONGOOSE CONNECTION
// ===================================================

mongoose.connect('mongodb://localhost:27017/erp',
    { useNewUrlParser: true,
      useUnifiedTopology: true, 
      useCreateIndex: true
    }
);

db.on('error', console.error.bind(console, 'connection error revisa parametros'));
db.once('open', function() {
    console.log('Base de datos ONLINE YEAH!');
});



app.listen(3000,()=>{
    console.log('usando puerto 3000')
});

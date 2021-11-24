var express = require('express');
var app = express();

const tareaRouter = require('./api/tarea.router'); //no hace falta ponerle .js porque importa archivos js

//Middlewares
const cors = require('cors'); //funcion de seguridad del navegador, restringe las solicitudes http de origen cruzado
app.use(cors());

app.use(express.json()); //es igual que el body parser comprende las peticiones y las mapeas com json.

//hace una peticion GET a la url/ (raiz) 
app.get('/docs', function (req, res){ // puedo hacer una carpeta docs: para guardar documentacion de como se usar la api con sendFile html
    res.status(500).send('Hola Mundo');
});

//una peticion GET a la url/api/tarea
app.use('/api/tarea', tareaRouter); //hago uso de middleware (use) capa intermedia de recursos. le doy la ruta y  mapea con el router

app.listen(3001, function() {  //port:3001
    console.log('Aplicación: escuchando el puerto 3001!');
  });

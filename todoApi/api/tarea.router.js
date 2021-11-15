const {getTarea, getTareaId, postTarea}= require ('./tarea.controlador');

const ruta = require('express').Router(); //dentro de express contruye un router(meneja rutas) de post, get

ruta.get('/', getTarea); //importa en la raiz de donde lo importo (/api/tarea)
ruta.get('/id', getTareaId);
ruta.post('/', postTarea); //se le pasan datos al server con post 

module.exports = ruta; //exporta dentro de los modulos a "ruta"

const {getTarea, getTareaId, postTarea, deleteTareaId, putTareaId}= require ('./tarea.controlador');

const ruta = require('express').Router(); //dentro de express contruye un router(meneja rutas) de post, get

ruta.get('/', getTarea); //importa en la raiz de donde lo importo (/api/tarea)
ruta.get('/:id', getTareaId);
ruta.post('/', postTarea); //se le pasan datos al server con post 
ruta.delete('/:id', deleteTareaId); //agregado 1
ruta.put('/:id', putTareaId);
module.exports = ruta; //exporta dentro de los modulos a "ruta"

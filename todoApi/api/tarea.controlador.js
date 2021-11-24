const {getServicio, getIdServicio, postTareaService, deleteTareaServicio, putTareaServicio}=require ('./tarea.servicio');

module.exports={
    getTarea:(req, res) => {
        getServicio (req, (error, resultado) => { 
            console.log("enviar JSON controlador"); // test
            return res.json({
                sucess: true,
                data: resultado,
            });

        });
    },
    getTareaId:(req, res) => {
        const id = req.params.id;
        getIdServicio(id,(error, resultado)=> {
            return res.json({
                success: true,
                data: resultado,
            });
        });
    },
    postTarea:(req, res) => {            
        const tarea = {
            id: req.body.id,
            completado: req.body.completado,
            texto: req.body.texto,
            lat: req.body.lat,
            lon: req.body.lon,
        }
        try{
            postTareaService(tarea,(err,results)=>{
                if(err){
                        console.log(err);
                        return ;
                }
                return  res.status(200).json({
                        success: true,
                        data: results
                });

            });
       
        }catch(err){
            console.log(err);
        res.json({message: err});
        }
    },
    deleteTareaId:(req, res) => {
        const id = req.params.id;
        deleteTareaServicio(id,(error, resultado)=> {
            return res.json({
                success: true,
                data: resultado,
            });
        });
    },
    putTareaId:(req, res) => {
        const actualizar = {id: req.params.id,
                            completado: req.body.completado
                            }
        try{
            putTareaServicio(actualizar,(err,results)=>{
                if(err){
                        console.log(err);
                        return ;
                }
                return  res.status(200).json({
                        success: true,
                        data: results
                });

            });
       
        }catch(err){
            console.log(err);
        res.json({message: err});
        }
    }
}
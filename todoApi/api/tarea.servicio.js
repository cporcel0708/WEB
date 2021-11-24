const pool = require('../configuracion/db');

module.exports={
    getServicio:(req, callBack) => { 

        pool.query('SELECT * FROM tarea;',
        [],
        (error, resultado) => {
            console.log(error, resultado);
            if(error){
                console.log("Error en servicio");//tes
                return callBack(error ,null);
            } 
            else{
                console.log("try en servicio");//test
                return callBack(null, resultado);
            }
        }); 
    },

    getIdServicio:(id, callBack) => {
        pool.query('SELECT* FROM tarea WHERE id = ?;',
        [id],
        (error, resultado) => {
            if(error){
                return callBack(error ,null);
            } 
            else{
                return callBack(null, resultado);
            }
        });
    },
    postTareaService: (tarea, callBack) => {   
        console.log(tarea);    
        pool.query(`INSERT INTO tarea(completado,texto,lat,lon)
        VALUES (?,?,?,?);`,
            [                
                tarea.completado,
                tarea.texto,
                tarea.lat,
                tarea.lon  
            ],
            (error,results) => {
                console.log(results);
                if (error) {
                    console.log("UPS!");
                    return callBack(error,null);
                } else {
                    console.log("try!!");
                    return callBack(null, results);
                 }           
            });
    },
    deleteTareaServicio:(id, callBack) => {
        pool.query('DELETE FROM tarea WHERE id = ?;',
        [id],
        (error, resultado) => {
            if(error){
                return callBack(error ,null);
            } 
            else{
                return callBack(null, resultado);
            }
        });
    },
    putTareaServicio: (actualizar, callBack) => {
        pool.query('UPDATE tarea SET completado = ? WHERE id = ?;',
        [   
            actualizar.completado,
            actualizar.id    
        ],
        (error, resultado) => {
            if(error){
                return callBack(error ,null);
            } 
            else{
                return callBack(null, resultado);
            }
        });
    }


}
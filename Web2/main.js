var n = 0; //contador de elementos
let temp;
let tareaArray = [];
let checkeado = false;
//let textoTarea;
let geo = {lat: null, lon: null};

//GEOLOCALIZACION
  function recuperarUbicacion() { //copiado de clase walter

    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            (location) => {
                geo.lat = location.coords.latitude;
                geo.lon = location.coords.longitude;
            },
            (err) => {
                console.warn(err);
                geo.lat = null;
                geo.lon = null;
            }
        );
    } else {
        return null;
    }

}  

const  agregarBtn = document.getElementById("agregarBtn");
agregarBtn.addEventListener("click",agregarTarea); //evento que desencadena la lista

fullscreenBtn = document.getElementById("fullScreenBtn");
//EVENTO FULLSCREEN
fullscreenBtn.addEventListener("click", function(e){ 

    if (!document.fullscreenElement && document.documentElement.requestFullscreen ) { //no tiene que haber ningun elemento en fullScreen
        document.documentElement.requestFullscreen();
        document.getElementById("screen").src = "img/minimPantalla.svg";      

    } else if (document.exitFullscreen) {
        document.exitFullscreen();  
        document.getElementById("screen").src = "img/maximiPantalla.svg";        
    }
    
});
//AGREGAR TAREAS
function agregarTarea(){
    const nuevaTareaValue = document.getElementsByName("nuevaTarea")[0].value;    
    if( nuevaTareaValue != ""){
        const nuevaTareaNodo = document.createElement("li");
        nuevaTareaNodo.setAttribute("idNodo", n); //Asigno un id al dataSet

        nuevaTareaNodo.innerHTML = `
                                <div>                                  
                             
                                <input type="checkbox" class='chek' name="check" onClick="funcionCheck(this)" ${nuevaTareaNodo.completado? 'checked': ''}>                                
                                    <p>${nuevaTareaValue}</p>
                                </div>                               
                                <button class="botones" onclick="copiarTarea(this)"> <img src="img/copiar.svg" width="25" height="25"> </button>
                                <button class="botones" onclick="compartirTarea(this)"> <img src="img/compartir.svg" width="25" height="25"> </button>
                                <button class="botones" onclick="eliminarTarea(this)"> <img src="img/basura.svg" width="25" height="25"> </button>                                                             
                        `;            
        const listadoUl = document.querySelector("#listado");    
        listadoUl.insertBefore(nuevaTareaNodo, listadoUl.childNodes[0] ); //Agrego nuevaTarea al ul antes del primero         
        tareaArray.push({
                        idTarea: n,
                        completado: false,
                        texto: nuevaTareaValue,
                        ubicacion: {lat: geo.lat, lon: geo.lon}   
                      }
        );
        //guardamos la info con persistencia
        guardarTareaArray();     
        document.getElementById("nuevaTarea").value=""; //vacia el inputtext
        document.getElementById("nuevaTarea").focus(); //hace foco en el inputtext        
        n++;
    } 
    else {
        alert("INGRESE ALGUN CARACTER!");
        document.getElementById("nuevaTarea").focus();
    }
}

//key press enter
function runScript(e) {
    //Comprueba si apreta enter//
    if (e.keyCode == 13) {        
        document.getElementById("agregarBtn").click();        
    }
}

//FUNCION DEL CHECKBOX
const funcionCheck = (e) => {
    let index = tareaArray.findIndex(tareaArray => tareaArray.idTarea == e.parentElement.dataset.idTarea); //findIndex: retorna el indice...
    console.log(index, tareaArray[index]);
    tareaArray[index].completado = !tareaArray[index].completado;
    guardarTareaArray();
  }

 //FUNCION COMPARTIR
function compartirTarea(e){
    if(!("share" in navigator)){ //controla si la API esta en el navegador
            alert ("API Share no soportada");
            return;       
    }
    temp = e.parentElement.children[1].innerText;
    navigator.share({
        title: "Compartir Tarea",
        text: temp,
        url: document.URL
    })
    .then(() => {alert ("Compartido!");})
    .catch(err => console.log("Error: ", err));

}
//FUNCION COPIAR TAREA
function copiarTarea(e){
    if(navigator.clipboard != undefined){ //consulta si es soportado por el navegador  
           
           navigator.clipboard.writeText(e.parentElement.children[1].innerText)            
            .then(() => {alert ("Tarea copiada!");})
            .catch(err => console.log("Error: ", err));
    }
}
//FUNCION ELIMINAR TAREA
function eliminarTarea(e){
      e.parentElement.remove();   
    tareaArray.splice(tareaArray.findIndex(a => a.id == e.id), 1);
    //splice: elimina elementos del array.
    // findIndex: devuelve el valor del primer elemento del array que cumple la función      
    guardarTareaArray();
}
//GUARDA LA INFORMACION DEL ARRAYTAREA EN EL LOCALSTORE
function guardarTareaArray(){
    localStorage.setItem("tareaArray", JSON.stringify(tareaArray));
}

//METODO PARA CARGAR EL ARREGLO DESDE EL LOCALSTORE
function getTareasLocalStorage() {
    if ('localStorage' in window) {
        return JSON.parse(localStorage.getItem("tareaArray")) || []; //hace un parseo de lo que esta guardado en tareasArray
    } else {
        return []
    }
}
//METODO UPDATE DE TAREAARRAY 
function updateTareaArray(){
    for(let i = 0; i < tareaArray.length ; i++ ){
        const nuevaTareaNodo = document.createElement("li");
        nuevaTareaNodo.innerHTML = `
                                <div>
                                <input type="checkbox" onClick="funcionCheck(this)" ${tareaArray[i].completado ? 'checked' : ''};>  
                                    <p>${tareaArray[i].texto}</p>
                                </div>                               
                                <button class="botones" onclick="copiarTarea(this)"> <img src="img/copiar.svg" width="25" height="25"> </button>
                                <button class="botones" onclick="compartirTarea(this)"> <img src="img/compartir.svg" width="25" height="25"> </button>
                                <button class="botones" onclick="eliminarTarea(this)"> <img src="img/basura.svg" width="25" height="25"> </button>                                                             
                        `;            
        const listadoUl = document.querySelector("#listado");    
        listadoUl.insertBefore(nuevaTareaNodo, listadoUl.childNodes[0] );        
    }
    n = tareaArray.length+1;
}


//CARGA LA APP
window.onload = function() {
    recuperarUbicacion();
    console.log(geo);
    tareaArray = getTareasLocalStorage();
    updateTareaArray();
    
}
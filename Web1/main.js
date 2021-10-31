const  agregarBtn = document.getElementById("agregarBtn");
agregarBtn.addEventListener("click",agregarTarea); //evento que desencadena la lista

fullscreenBtn = document.getElementById("fullScreenBtn");
fullscreenBtn.addEventListener("click", function(e){ 

    if (!document.fullscreenElement && document.documentElement.requestFullscreen ) { //no tiene que haber ningun elemento en fullScreen
        document.documentElement.requestFullscreen();
        document.getElementById("screen").src = "img/minimPantalla.svg";      

    } else if (document.exitFullscreen) {
        document.exitFullscreen();  
        document.getElementById("screen").src = "img/maximiPantalla.svg";        
    }
    
});



var n = 0; //contador de elementos
//AGREGAR TAREAS
function agregarTarea(){
    const nuevaTareaValue = document.getElementsByName("nuevaTarea")[0].value;
    if( nuevaTareaValue != ""){
        const nuevaTareaNodo = document.createElement("li");
        nuevaTareaNodo.innerHTML = `
                                <div>
                                    <input type="checkbox" class="chek" name="check" id=" `+ n +`">
                                    <p>${nuevaTareaValue}</p>
                                </div>                               
                                <button class="botones" onclick="copiarTarea(this)"> <img src="img/copiar.svg" width="25" height="25"> </button>
                                <button class="botones" onclick="compartirTarea(this)"> <img src="img/compartir.svg" width="25" height="25"> </button>
                                <button class="botones" onclick="eliminarTarea(this)"> <img src="img/basura.svg" width="25" height="25"> </button> 
                                                            
                        `;
            
        const listadoUl = document.querySelector("#listado");    
        listadoUl.insertBefore(nuevaTareaNodo, listadoUl.childNodes[0] );
        document.getElementById("nuevaTarea").value=""; //vaciamos el inputtext
        document.getElementById("nuevaTarea").focus(); //hacemos foco en el inputtext
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

}



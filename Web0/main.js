const  agregarBtn = document.getElementById("agregarBtn");
agregarBtn.addEventListener("click",agregarTarea);
var n = 0; //contador de elementos

function agregarTarea(){
    const nuevaTareaValue = document.getElementsByName("nuevaTarea")[0].value;
    if( nuevaTareaValue != ""){
        const nuevaTareaNodo = document.createElement("li");
        nuevaTareaNodo.innerHTML = `
                                <div>
                                    <input type="checkbox" class="chek" name="check" id=" `+ n +`">
                                    <p>${nuevaTareaValue}</p>
                                </div>
                                <button onclick="this.parentElement.remove()"> <img src="img/basura.svg" width="25" height="25"> </button>
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
        //alert("apretaste enter");
        document.getElementById("agregarBtn").click();
        //return false;
    }
}

//FUNCION DE TAREA COMPLETADA//
function estaCheckeado(valor){
    var checkeado = document.getElementById("check"+valor.value).checked;
    //alert (checkeado);
  
    var texto = document.getElementById('completed'+valor.value);
    var texto2 = document.getElementById('dato'+valor.value);
  
    //compruebo si esta checkeada la tarea//
    if (checkeado){
      
      texto.innerHTML= "Completado ";
      texto.style.textDecoration = 'line-through';
      texto2.style.textDecoration = 'line-through';
    }
  
    else {
      texto.innerHTML= "";
      texto2.style.textDecoration = 'none';
    }
  }



//Creando la función constructora para la interfaz 
function UI(){}

UI.prototype.visualizarInterfaz = ()=>{
    const max = new Date().getFullYear();   
    const min = max - 23;

    //capturar el select 
    const yearSelect = document.querySelector("#year"); 

    for(let i=max; i>min; i--){
        //crear la opción 
        const option = document.createElement("option"); 
        option.value = i; 
        option.textContent = i;
        //insertar en el select 
        yearSelect.appendChild(option);
    }
}

//instanciar el objeto
const ui = new UI();

document.addEventListener("DOMContentLoaded",()=>{
    ui.visualizarInterfaz();
});

//Realizar validaciones
UI.prototype.mostrarMensaje = (mensaje,tipo)=>{
    //Creamos un div
    const div = document.createElement("div"); 
    if(tipo === "error"){
        div.classList.add("error"); 
    }
    else{
        div.classList.add("correcto");
    }
    //agregar el mensaje 
    div.textContent = mensaje; 
    const formulario = document.querySelector("#cotizar-seguro");
    const divResultado = document.querySelector("#resultado");
    //insertar en el formulario
    formulario.insertBefore(div,divResultado);
    //quitar el mensaje
    setTimeout(()=>{
        div.remove();
    },2000);
}

eventListener();

function eventListener(){
    //traer el formulario 
    const formulario = document.querySelector("#cotizar-seguro");
    formulario.addEventListener("submit",cotizarSeguro);
}
function cotizarSeguro(e){
    e.preventDefault();
    //leer la marca seleccionada
    const marca = document.querySelector("#marca").value;
    const year = document.querySelector("#year").value; 
    const tipo = document.querySelector("input[name='tipo']:checked").value;

    if(marca==="" || year === "" || tipo === ""){
        ui.mostrarMensaje("Todos los campos son obligatorios", "error");
    }
    else{
        ui.mostrarMensaje("Cotizando...","correcto");
    }

}
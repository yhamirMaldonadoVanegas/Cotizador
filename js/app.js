//Creando el constructor para el seguro
function Seguro(marca,year,tipo){
    this.marca = marca; 
    this.year = year; 
    this.tipo = tipo;
}
//Creando la función constructora para la interfaz 
function UI(){}

/*Prototype para la visualizacion de fechas */
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
/* Prototype para mostrar el resutlado */
UI.prototype.mostrarResultado = (seguro)=>{
    //Haciendo destructuring al objeto 
    const {marca,year,tipo} = seguro;
    //creamos el div 
    const resultado = document.createElement("div"); 
    resultado.innerHTML = `
        <p>TU RESUMEN</p>
        <p>Marca: ${marca}</p>
        <p>Año: ${year}</p>
        <p>Tipo: ${tipo}</p>
    `
    //insertar el resultado
    const divResultado = document.querySelector("#resultado"); 
    divResultado.appendChild(resultado);
}

//instanciar el objeto
const ui = new UI();

document.addEventListener("DOMContentLoaded",()=>{
    ui.visualizarInterfaz();
});

//Mostrar mensaje
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

/*Realizar Validaciones*/
function cotizarSeguro(e){
    e.preventDefault();
    //leer la marca seleccionada
    const marca = document.querySelector("#marca").value;
    const year = document.querySelector("#year").value; 
    const tipo = document.querySelector("input[name='tipo']:checked").value;

    if(marca==="" || year === "" || tipo === ""){
        ui.mostrarMensaje("Todos los campos son obligatorios", "error");
        return; 
    }

    ui.mostrarMensaje("Cotizando...","correcto");

    //instanciando el objeto seguro 
    const seguro = new Seguro(marca,year,tipo);

    //Utilizar el prototype que va a cotizar
    ui.mostrarResultado(seguro);

}
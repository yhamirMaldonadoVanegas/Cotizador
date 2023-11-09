//Creando el constructor para el seguro
function Seguro(marca,year,tipo){
    this.marca = marca; 
    this.year = year; 
    this.tipo = tipo;
}
// Creando el prototype para generar el total 
Seguro.prototype.cotizarSeguro = function(){
    /* DATOS
        1. Americano 1.15
        2. Asiatico 1.05
        3. Europeo 1.35
    */
   //Definir una cantidad base 
   const cantidadBase = 2000; 
   let cantidad; //cantidad a variar 
   //Evaluar la marca 
   switch(this.marca){
        case "1": 
            cantidad = cantidadBase*1.15;
            break; 
        case "2": 
            cantidad = cantidadBase*1.05; 
            break; 
        case "3": 
            cantidad = cantidadBase*1.35; 
            break; 
        default: 
            break; 
   }
   //leer el año
   //otener la diferencia del año 
   const diferencia = new Date().getFullYear() - this.year;
   //cada año de direncia se reduce un 3% de su valor
   cantidad -= diferencia*cantidad*0.03;
   /*
    Si el seguro es básico se multiplica por un 30% más
    Si el seguro es completo se multiplica por un 50% más
   */
   //el tipo de seguro 
   if(this.tipo === "basico"){
        cantidad*=1.30; 
   }
   else{
        cantidad*=1.50; 
   }
   return cantidad;
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
UI.prototype.mostrarResultado = (seguro,cantidad)=>{
    //Haciendo destructuring al objeto 
    const {marca,year,tipo} = seguro;
    //para evaluar la marca
    let marcaVar; 
    switch(marca){
        case "1": 
            marcaVar = "Americano"; 
            break;
        case "2": 
            marcaVar = "Asiatico";
            break;  
        case "3": 
            marcaVar = "Europeo";
            break; 
        default: 
            break; 
    }
    //creamos el div 
    const resultado = document.createElement("div");
    resultado.classList.add("div-resultado"); 
    resultado.innerHTML = `
        <p class="div-header">TU RESUMEN</p>
        <p class="font-bold">Marca: <span class="font-normal">${marcaVar}</span></p>
        <p class="font-bold">Año: <span class="font-normal">${year}</span></p>
        <p class="font-bold">Tipo: <span class="font-normal">${tipo}</span></p>
        <p class="font-bold">Cantidad: <span class="font-normal">$ ${cantidad}</span></p>
    `
    //insertar el resultado
    const divResultado = document.querySelector("#resultado"); 
    //mostrar el spinner
    const spinner = document.querySelector("#cargando");
    spinner.style.display = "block";
    //controlamos el tiempo
    setTimeout(()=>{
        spinner.style.display = "none"; 
        divResultado.appendChild(resultado);
    },2000)
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
    //Evaluar si hay resultado previo para borrarlo
    const resultados = document.querySelector("#resultado div");

    if(resultados !==null){
        resultados.remove();
    }
    //instanciando el objeto seguro 
    const seguro = new Seguro(marca,year,tipo);
    //una variable para almacenar la cantidad 
    const cantidad = seguro.cotizarSeguro();
    //Utilizar el prototype que va a cotizar
    ui.mostrarResultado(seguro,cantidad);

}
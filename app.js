/* V A R I A B L E S */

let numeroSecreto = 0; 
let intentos = 0;
let listaNumerosSorteados = []; 
let numeroMaximo = 10; 

/* F U N C I O N E S */

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function intentoDeUsuario() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value); //se obtiene el valor del input
    console.log(numeroDeUsuario === numeroSecreto);
    if (numeroDeUsuario === numeroSecreto) {  //se compara el número del usuario con el número secreto
        asignarTextoElemento('p', `¡Felicidades! ¡Ganaste en ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}!`); 
        document.getElementById('reiniciar').removeAttribute('disabled'); //se deshabilita el input
    } else {
        // No acertó el usuario, entonces:
        if (numeroDeUsuario > numeroSecreto) {  
            asignarTextoElemento('p', '¡El número secreto es menor!');
        } else {
            asignarTextoElemento('p', '¡El número secreto es mayor!');
        }
        intentos++; 
        limpiarCaja(); 
    }
    return;
}

//Función para limpiar el valor del input
function limpiarCaja() {
    document.querySelector('#valorUsuario').value = ''; 
}

//Función que genera un número aleatorio entre 1 y el número maximo
function generarNumeroSecreto () {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);
    //Si ya sorteamos todos los números
    if (listaNumerosSorteados.length === numeroMaximo) { 
        asignarTextoElemento('p', '¡Se han agotado los números! Reinicia el juego.'); //Se muestra un mensaje
        listaNumerosSorteados = []; //Se reinicia la lista
    } else {
        //Si el numero generado está incluido en la lista 
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto(); 
        } else { 
            listaNumerosSorteados.push(numeroGenerado); 
            return numeroGenerado;
        }
    }
}

function reiniciarJuego() {
    limpiarCaja(); //Se limpia el input
    condicionesIniciales(); //Se reinician las condiciones iniciales
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
}

//Función que reinicia los valores iniciales: mensaje, numero secreto y los intentos
function condicionesIniciales() {
    asignarTextoElemento('p', `Indica un número entre 1 y ${numeroMaximo}.`);
    asignarTextoElemento('h1', 'Juego del número secreto actualizado'); 
    numeroSecreto = generarNumeroSecreto(); //Se genera un número aleatorio
    intentos = 1; //Se reinician los intentos
}

condicionesIniciales(); //Se llama a la función para que se ejecute al cargar la página
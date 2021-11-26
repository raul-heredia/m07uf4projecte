/* BLACKJACK 
    - M07UF4 Marc Carbonell i Raúl Heredia
    - Changelog:
        2021-10-19: Hecha lógica base de blackjack, controlando las cartas que reciben tanto jugador como crupier y las que quedan.
    - To Do:
        - Si el jugador se planta el crupier sigue jugando.
        - Controlar si el jugador o el crupier llega o se pasa de 21
*/

let crupierSum = 0;
let jugadorSum = 0;
let numCarta = 13;

// R = Rombo
// C = Corazones
// P = Picas
// T = Treboles
let cartas = [
    {nom: 'AS', value: 1},
    {nom: '2R', value: 2},
    {nom: '3P', value: 3},
    {nom: '4C', value: 4},
    {nom: '5T', value: 5},
    {nom: '6R', value: 6},
    {nom: '7P', value: 7},
    {nom: '8C', value: 8},
    {nom: '9T', value: 9},
    {nom: '10C', value: 10},
    {nom: 'J', value: 10},
    {nom: 'Q', value: 10},
    {nom: 'K', value: 10},
]


document.getElementById('dobla').onclick = function(){
    pideJugador();
    crupier();

}

function pideJugador(){
    let carta = Math.floor(Math.random() * numCarta);  // genera un numero aleatorio de 0 a numCarta (La primera vez vale 13 por lo que genera de 0 a 12)
    // Si el total del jugador es menor a 11 nos interesa que el valor de AS sea 11, en caso contrario seguirá valiendo 1.
    if (jugadorSum < 11 && cartas[carta].nom == 'AS'){
        cartas[carta].value = 11;
        // cartas[0].value = 11; Es lo mismo ponerlo con 0 que con carta (Ya que está en la primera posición, si no estuviera en la posición 0, solo se podría usar con carta en vez de 0), solo se activará si sale un AS y el contador del jugador es menor a 11
    }
    jugadorSum += cartas[carta].value;
    console.log("Total jugador: " + cartas[carta].nom + " " + jugadorSum);
    numCarta -= 1;
    
    cartas.splice(carta, 1);
}

function crupier(){
    let carta = Math.floor(Math.random() * numCarta);  // genera un numero aleatorio de 0 a numCarta (La primera vez vale 13 por lo que genera de 0 a 12)
    // Si el total del crupier es mayor a 17, se planta y no sigue cogiendo cartas.   
    if (crupierSum < 17){
        // Si el total del crupier es menor a 11 nos interesa que el valor de AS sea 11, en caso contrario seguirá valiendo 1.
        if (crupierSum < 11 && cartas[carta].nom == 'AS'){
            cartas[carta].value = 11;
            // cartas[0].value = 11; Es lo mismo ponerlo con 0 que con carta (Ya que está en la primera posición, si no estuviera en la posición 0, solo se podría usar con carta en vez de 0), solo se activará si sale un AS y el contador del jugador es menor a 11
        }
        crupierSum += cartas[carta].value;
        console.log("Total Crupier: " + cartas[carta].nom + " " + crupierSum);
        numCarta -= 1;
        
        cartas.splice(carta, 1);
    }
}
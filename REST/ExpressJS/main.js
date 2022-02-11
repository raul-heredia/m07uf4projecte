const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json()) // per analitzar les peticions HTTP que portin JSON al body
app.use(express.static('public'));


// VARIABLES BLACKJACK
// T = Tréboles
// D = Diamantes
// C = Corazones
// P = Picas
// Declarem una constant de la baralla
const baralla = [
    { nom: 'AS de Trebols', value: 1 },
    { nom: '2 de rebols', value: 2 },
    { nom: '3 de Trebols', value: 3 },
    { nom: '4 de Trebols', value: 4 },
    { nom: '5 de Trebols', value: 5 },
    { nom: '6 de Trebols', value: 6 },
    { nom: '7 de Trebols', value: 7 },
    { nom: '8 de Trebols', value: 8 },
    { nom: '9 de Trebols', value: 9 },
    { nom: '10 de Trebols', value: 10 },
    { nom: 'J de Trebols', value: 10 },
    { nom: 'Q de Trebols', value: 10 },
    { nom: 'K de Trebols', value: 10 },
    { nom: 'AS de Diamants', value: 1 },
    { nom: '2 de Diamants', value: 2 },
    { nom: '3 de Diamants', value: 3 },
    { nom: '4 de Diamants', value: 4 },
    { nom: '5 de Diamants', value: 5 },
    { nom: '6 de Diamants', value: 6 },
    { nom: '7 de Diamants', value: 7 },
    { nom: '8 de Diamants', value: 8 },
    { nom: '9 de Diamants', value: 9 },
    { nom: '10 de Diamants', value: 10 },
    { nom: 'J de Diamants', value: 10 },
    { nom: 'Q de Diamants', value: 10 },
    { nom: 'K de Diamants', value: 10 },
    { nom: 'AS de Cors', value: 1 },
    { nom: '2 de Cors', value: 2 },
    { nom: '3 de Cors', value: 3 },
    { nom: '4 de Cors', value: 4 },
    { nom: '5 de Cors', value: 5 },
    { nom: '6 de Cors', value: 6 },
    { nom: '7 de Cors', value: 7 },
    { nom: '8 de Cors', value: 8 },
    { nom: '9 de Cors', value: 9 },
    { nom: '10 de Cors', value: 10 },
    { nom: 'J de Cors', value: 10 },
    { nom: 'Q de Cors', value: 10 },
    { nom: 'K de Cors', value: 10 },
    { nom: 'AS de Piques', value: 1 },
    { nom: '2 de Piques', value: 2 },
    { nom: '3 de Piques', value: 3 },
    { nom: '4 de Piques', value: 4 },
    { nom: '5 de Piques', value: 5 },
    { nom: '6 de Piques', value: 6 },
    { nom: '7 de Piques', value: 7 },
    { nom: '8 de Piques', value: 8 },
    { nom: '9 de Piques', value: 9 },
    { nom: '10 de Piques', value: 10 },
    { nom: 'J de Piques', value: 10 },
    { nom: 'Q de Piques', value: 10 },
    { nom: 'K de Piques', value: 10 },
];
let partides = [];


///////////////
// FUNCIONES //
///////////////


function isPartidaGet(idPartida, req, res) {
    let checkPartida = partides.find(a => a.codiPartida === idPartida); // Busquem la partida en el array partides
    if (!checkPartida) { // Si no existeix retornem un 404
        res.status(404, 'error'); // Si no troba partida retorna un 404
        res.send("Error, no s'ha trobat cap partida amb identificador: " + idPartida);
    }
}

function isPartidaFinalitzada(numPartida, req, res) {
    let partida = partides.find(x => x.codiPartida === numPartida); // Busquem la partida que el seu codiPartida sigui igual a numPartida
    if (partida.torn === -1) {
        res.status(404, 'error'); // Si no troba partida retorna un 404
        res.send(`No pots demanar més cartes, la partida ${numPartida} ha finalitzat`);
    }

}

function pideJugador(numPartida, req, res) {
    let partida = partides.find(x => x.codiPartida === numPartida); // Busquem la partida que el seu codiPartida sigui igual a numPartida
    let carta = Math.floor(Math.random() * partida.numCarta);  // genera un numero aleatorio de 0 a numCarta (La primera vez vale 13 por lo que genera de 0 a 12)

    if (partida.torn === 1) { // si es el primer torn 
        for (let i = 0; i < 2; i++) { // demanem dos cartes ja que la primera vegada es donen dues cartes
            jugadorAs(partida, carta); // Si el total del jugador es menor a 11 nos interesa que el valor de AS sea 11, en caso contrario seguirá valiendo 1.
            console.log(`Jugador: Ha sortit la carta ${partida.cartes[carta].nom}`) // printem per consola la carta que ha sortit
            partida.jugadorSum += partida.cartes[carta].value; // sumem el valor de la carta a la suma total del jugador
            partida.cartesJugador.push(partida.cartes[carta]); // afegim la carta que ha sortit al array de cartes del jugador
            partida.numCarta -= 1; // Restem el numero total de cartes
            partida.cartes.splice(carta, 1); // Traiem la carta del arrai
            if (i == 0) carta = Math.floor(Math.random() * partida.numCarta); // Si el valor de i val 0, traiem un altre número random
        }
        res.send(partida.cartesJugador) // retornem el total de cartes, ja que només hi haurà les dues primeres
    } else {
        jugadorAs(partida, carta); // Si el total del jugador es menor a 11 nos interesa que el valor de AS sea 11, en caso contrario seguirá valiendo 1.
        console.log(`Jugador: Ha sortit la carta ${partida.cartes[carta].nom}`) // Printem la carta per consola
        res.send(partida.cartes[carta]); // Retornem la carta que ha sortit al jugador
        partida.jugadorSum += partida.cartes[carta].value; // sumem el valor de la carta al total de la suma del jugador
        partida.cartesJugador.push(partida.cartes[carta]); // Afegim la carta que ha sortit al array de cartes del jugador
        partida.numCarta -= 1; // restem el numero de cartes total
        partida.cartes.splice(carta, 1); // Eliminem la carta del array de cartes total
    }
    partida.torn++ // sumem el torn
}

function jugadorAs(partida, carta) {
    if (partida.cartes[carta].value == 1) { // si el value de la carta es 1 (Un as)
        if (partida.jugadorSum < 11) { // si la suma de punts es menor a 11 ens interessa que el as valgui 11
            partida.cartes[carta].value = 11 // modifiquem el value del as que ha sortit per tal de que valgui 11
        }
    }
}

function crupier(numPartida) {
    let partida = partides.find(x => x.codiPartida === numPartida); // Busquem la partida que el seu codiPartida sigui igual a numPartida
    let carta = Math.floor(Math.random() * partida.numCarta);  // genera un numero aleatorio de 0 a numCarta (La primera vez vale 13 por lo que genera de 0 a 12)

    if (partida.crupierSum < 17) { // El crupier només rep una carta si el seu total es menor a 17
        if (partida.torn === 1) { // si es la primera vegada
            for (let i = 0; i < 2; i++) { // obté dues cartes
                crupierAs(partida, carta); // Si el total del crupier es mayor a 17, se planta y no sigue cogiendo cartas. 
                console.log(`Crupier: Ha sortit la carta ${partida.cartes[carta].nom}`) // printem per consola la carta que ha sortit
                partida.crupierSum += partida.cartes[carta].value; // sumem el value de la carta a la suma total del crupier
                partida.cartesCrupier.push(partida.cartes[carta]); // pujem la carta a les cartes del crupier
                partida.numCarta -= 1; // disminuim el numero de cartes del array de cartes
                partida.cartes.splice(carta, 1); // eliminem la carta del array
                if (i == 0) carta = Math.floor(Math.random() * partida.numCarta); // si es la primera volta del bucle generem un altre número random
            }
        } else {
            crupierAs(partida, carta); // Si el total del crupier es mayor a 17, se planta y no sigue cogiendo cartas. 
            console.log(`Crupier: Ha sortit la carta ${partida.cartes[carta].nom}`)
            partida.crupierSum += partida.cartes[carta].value;
            partida.cartesCrupier.push(partida.cartes[carta]);
            partida.numCarta -= 1;
            partida.cartes.splice(carta, 1);
        }
    }
}

function crupierAs(partida, carta) {
    if (partida.cartes[carta].value == 1) { // si el value de la carta es 1 (Un as)
        if (partida.crupierSum < 11) { // si el total del crupier es menor a 11 ens interessa que el as valgui 11
            partida.cartes[carta].value = 11 // posem que el valor del as que ha sortit es igual a 11
        }
    }
}

function guanya(res) {
    console.log('Has guanyat');
    res.send('Has guanyat');
}
function perd(res) {
    console.log('Has perdut');
    res.send('Has perdut');
}


function comprovaResultat(numPartida, req, res) {
    let partida = partides.find(x => x.codiPartida === numPartida); // Busquem la partida que el seu codiPartida sigui igual a numPartida
    partida.torn = -1;
    if (partida.crupierSum < partida.jugadorSum && partida.jugadorSum < 21) {
        console.log("Guanya primer if");
        guanya(res);
    } else if (partida.crupierSum > 21 && partida.jugadorSum < 21) {
        console.log("Guanya segon if");
        guanya(res);
    } else if (partida.jugadorSum == 21) {
        console.log("Guanya tercer if");
        guanya(res);
    } else if (partida.crupierSum == 21) {
        console.log("Perd quart if");
        perd(res);
    } else if (partida.jugadorSum > 21) {
        console.log("Perd cinqué if");
        perd(res);
    }
}
app.get('/', (req, res) => res.send('Hello World!'));

app.post('/crearPartida', (req, res) => {
    console.log(`S\`ha creat la partida: ${req.body.codiPartida}`);
    let cartesBaralla = Array.from(baralla);
    let partida = { codiPartida: parseInt(req.body.codiPartida), torn: 1, numCarta: 52, jugadorSum: 0, cartesJugador: [], crupierSum: 0, cartesCrupier: [], cartes: cartesBaralla };
    partides.push(partida);
    res.send(`Partida ${req.body.codiPartida} creada!`);
    //res.send(partides);
});
app.get('/:codiPartida/detallsPartida', (req, res) => {
    res.send(partides.find(a => a.codiPartida === parseInt(req.params.codiPartida)));
});
app.get('/:codiPartida/obtenirCarta', (req, res) => {
    let idPartida = parseInt(req.params.codiPartida);
    isPartidaGet(idPartida, req, res);
    isPartidaFinalitzada(idPartida, req, res)
    crupier(idPartida)
    pideJugador(idPartida, req, res);
});

app.get('/:codiPartida/mostraCartes', (req, res) => {
    let idPartida = parseInt(req.params.codiPartida);
    isPartidaGet(idPartida, req, res);
    res.send(partides.find(a => a.codiPartida === parseInt(req.params.codiPartida)).cartesJugador);
});
app.get('/:codiPartida/mostraCartesCrupier', (req, res) => {
    let idPartida = parseInt(req.params.codiPartida);
    isPartidaGet(idPartida, req, res);
    res.send(partides.find(a => a.codiPartida === parseInt(req.params.codiPartida)).cartesCrupier);
});
app.put('/:codiPartida/plantarse', (req, res) => {
    let idPartida = parseInt(req.params.codiPartida);
    let partida = partides.find(x => x.codiPartida === idPartida); // Busquem la partida que el seu codiPartida sigui igual a numPartida
    isPartidaGet(idPartida, req, res);
    isPartidaFinalitzada(idPartida, req, res);
    while (partida.crupierSum < 17) crupier(idPartida, req, res); // mentre que sigui menor a 17 demana cartes
    comprovaResultat(idPartida, req, res);
});
app.delete('/:codiPartida/acabaPartida', (req, res) => {
    let idPartida = parseInt(req.params.codiPartida);
    let index = partides.findIndex(obj => obj.codiPartida == idPartida);
    isPartidaGet(idPartida, req, res);
    partides.splice(index, 1);
    res.send(`Partida ${idPartida} eliminada`);
});

app.listen(3000, () => console.log('inici servidor'));
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json()) // per analitzar les peticions HTTP que portin JSON al body



// VARIABLES BLACKJACK
// T = Tréboles
// D = Diamantes
// C = Corazones
// P = Picas
const baralla = [
    { nom: 'AST', value: 1 },
    { nom: '2T', value: 2 },
    { nom: '3T', value: 3 },
    { nom: '4T', value: 4 },
    { nom: '5T', value: 5 },
    { nom: '6T', value: 6 },
    { nom: '7T', value: 7 },
    { nom: '8T', value: 8 },
    { nom: '9T', value: 9 },
    { nom: '10T', value: 10 },
    { nom: 'JT', value: 10 },
    { nom: 'QT', value: 10 },
    { nom: 'KT', value: 10 },
    { nom: 'ASD', value: 1 },
    { nom: '2D', value: 2 },
    { nom: '3D', value: 3 },
    { nom: '4D', value: 4 },
    { nom: '5D', value: 5 },
    { nom: '6D', value: 6 },
    { nom: '7D', value: 7 },
    { nom: '8D', value: 8 },
    { nom: '9D', value: 9 },
    { nom: '10D', value: 10 },
    { nom: 'JD', value: 10 },
    { nom: 'QD', value: 10 },
    { nom: 'KD', value: 10 },
    { nom: 'ASC', value: 1 },
    { nom: '2C', value: 2 },
    { nom: '3C', value: 3 },
    { nom: '4C', value: 4 },
    { nom: '5C', value: 5 },
    { nom: '6C', value: 6 },
    { nom: '7C', value: 7 },
    { nom: '8C', value: 8 },
    { nom: '9C', value: 9 },
    { nom: '10C', value: 10 },
    { nom: 'JC', value: 10 },
    { nom: 'QC', value: 10 },
    { nom: 'KC', value: 10 },
    { nom: 'ASP', value: 1 },
    { nom: '2P', value: 2 },
    { nom: '3P', value: 3 },
    { nom: '4P', value: 4 },
    { nom: '5P', value: 5 },
    { nom: '6P', value: 6 },
    { nom: '7P', value: 7 },
    { nom: '8P', value: 8 },
    { nom: '9P', value: 9 },
    { nom: '10P', value: 10 },
    { nom: 'JP', value: 10 },
    { nom: 'QP', value: 10 },
    { nom: 'KP', value: 10 },
];
let partides = [];


///////////////
// FUNCIONES //
///////////////


function isPartidaGet(idPartida, req, res) {
    let checkPartida = partides.find(a => a.codiPartida === idPartida); // Busquem la partida en el array partides
    if (!checkPartida) {
        res.status(404, 'error'); // Si no troba partida retorna un 404
        res.send("Error, no s'ha trobat cap partida amb identificador: " + idPartida)
    }
}



function pideJugador(numPartida, req, res) {
    let partida = partides.find(x => x.codiPartida === numPartida);
    let carta = Math.floor(Math.random() * partida.numCarta);  // genera un numero aleatorio de 0 a numCarta (La primera vez vale 13 por lo que genera de 0 a 12)
    let isFirst = false;
    // Si el total del jugador es menor a 11 nos interesa que el valor de AS sea 11, en caso contrario seguirá valiendo 1.
    if (partida.torn === 1) {
        console.log("Entra torn jugador")
        isFirst = true;
        for (let i = 0; i < 2; i++) {
            jugadorAs(partida, carta);
            console.log(`Ha sortit la carta ${partida.cartes[carta].nom}`)
            partida.jugadorSum += partida.cartes[carta].value;
            partida.cartesJugador.push(partida.cartes[carta]);
            partida.numCarta -= 1;
            partida.cartes.splice(carta, 1);
            if (i == 0) carta = Math.floor(Math.random() * partida.numCarta);
        }
    } else {
        jugadorAs(partida, carta);
        console.log(`Ha sortit la carta ${partida.cartes[carta].nom}`)
        res.send(partida.cartes[carta]);
        partida.jugadorSum += partida.cartes[carta].value;
        partida.cartesJugador.push(partida.cartes[carta]);
        partida.numCarta -= 1;
        partida.cartes.splice(carta, 1);
    }
    partida.torn++
    if (isFirst) res.send(partida.cartesJugador);
}

function jugadorAs(partida, carta) {
    console.log("Jugador: " + carta);
    console.log(partida.cartes[carta].value);
    if (partida.cartes[carta].value == 1) {
        if (partida.jugadorSum < 11) {
            partida.cartes[carta].value = 11
        }
    }
}

function crupier(numPartida) {
    let partida = partides.find(x => x.codiPartida === numPartida);
    let carta = Math.floor(Math.random() * partida.numCarta);  // genera un numero aleatorio de 0 a numCarta (La primera vez vale 13 por lo que genera de 0 a 12)
    let isFirst = false;

    // Si el total del crupier es mayor a 17, se planta y no sigue cogiendo cartas.   
    if (partida.crupierSum < 17) {
        if (partida.torn === 1) {
            isFirst = true;
            for (let i = 0; i < 2; i++) {
                crupierAs(partida, carta);
                console.log(`Ha sortit la carta ${partida.cartes[carta].nom} al crupier`)
                partida.crupierSum += partida.cartes[carta].value;
                partida.cartesCrupier.push(partida.cartes[carta]);
                partida.numCarta -= 1;
                partida.cartes.splice(carta, 1);
                if (i == 0) carta = Math.floor(Math.random() * partida.numCarta);
            }
        } else {
            crupierAs(partida, carta);
            console.log(`Ha sortit la carta ${partida.cartes[carta].nom} al crupier`)
            partida.crupierSum += partida.cartes[carta].value;
            partida.cartesCrupier.push(partida.cartes[carta]);
            partida.numCarta -= 1;
            partida.cartes.splice(carta, 1);
        }
    }


}

function crupierAs(partida, carta) {
    console.log("Crupier: " + carta);
    console.log(partida.cartes[carta].value);
    if (partida.cartes[carta].value == 1) {
        if (partida.crupierSum < 11) {
            partida.cartes[carta].value = 11
        }
    }
}


app.get('/', (req, res) => res.send('Hello World!'));

app.post('/crearPartida', (req, res) => {
    console.log(`S\`ha creat la partida: ${req.body.codiPartida}`);
    let partida = { codiPartida: parseInt(req.body.codiPartida), torn: 1, numCarta: 52, jugadorSum: 0, cartesJugador: [], crupierSum: 0, cartesCrupier: [], cartes: baralla };
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

app.listen(3000, () => console.log('inici servidor'));
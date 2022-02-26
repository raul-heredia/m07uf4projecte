window.onload = main;

function main() {
    const sala = document.getElementById('sala');
    const crearPartida = document.getElementById('crearPartida');
    const crearPartidaBtn = document.getElementById('crearPartidaBtn');
    const setPartidaBtn = document.getElementById('setPartidaBtn');
    const obtenirCarta = document.getElementById('obtenirCarta');
    const mostrarCartes = document.getElementById('mostrarCartes');
    const mostrarCartesCrupier = document.getElementById('mostrarCartesCrupier');
    const plantarse = document.getElementById('plantarse');
    const acabaPartida = document.getElementById('acabarPartida');
    const infoPartida = document.getElementById('partida');
    // VARIABLES
    let numPartida, cartesJugador = [];

    // ###################################################
    // #                                                 #
    // #                                                 #
    // #              Crear Partida                      #    
    // #                                                 #
    // #                                                 #
    // ###################################################
    crearPartidaBtn.addEventListener('click', () => {
        if (crearPartida.value) {
            numPartida = crearPartida.value;
            sala.innerText = `Sala actual: ${numPartida}`;
            crearPartida.value = '';


            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

            var urlencoded = new URLSearchParams();
            urlencoded.append("codiPartida", numPartida);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: urlencoded,
                redirect: 'follow'
            };

            fetch("http://localhost:8080/blackjack_war_exploded/api/blackjack/crearPartida/", requestOptions)
                .then(response => response.text())
                .then(result => infoPartida.innerHTML = result)
                .catch(error => console.log('error', error));
        }

    })
    // ###################################################
    // #                                                 #
    // #                                                 #
    // #              Obtenir Carta                      #
    // #                                                 #
    // #                                                 #
    // ###################################################
    obtenirCarta.addEventListener('click', () => {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`http://localhost:8080/blackjack_war_exploded/api/blackjack/obtenirCarta/${numPartida}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                infoPartida.innerHTML = '';
                try { // nomes es un array el primer torn
                    result.forEach(cartes => {
                        infoPartida.innerHTML += `Ha sortit la carta amb valor ${cartes}<br />`;
                    })
                } catch (e) {
                    infoPartida.innerHTML += `Ha sortit la carta amb valor ${result}<br />`;
                }
            })
            .catch(error => console.log('error', error));
    })
    // ###################################################
    // #                                                 #
    // #                                                 #
    // #              Mostrar Cartes                     #
    // #                                                 #
    // #                                                 #
    // ###################################################
    mostrarCartes.addEventListener('click', () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`http://localhost:8080/blackjack_war_exploded/api/blackjack/mostraCartes/${numPartida}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                infoPartida.innerHTML = '';
                let taula = document.createElement('TABLE');
                taula.className = 'table table-hover'
                taula.innerHTML = '<thead><tr><th scope="col">Valor de Carta</th></thead>';

                let valorJugador = 0;
                result.forEach(cartes => {
                    let fila = taula.insertRow(-1); // amb insertRow(-1) afegim cada linia al final
                    fila.insertCell(0).innerHTML = cartes;
                    valorJugador += cartes;
                })
                infoPartida.appendChild(taula);
                let p = document.createElement('P');
                p.innerHTML = `Suma de cartes: ${valorJugador}`;
                infoPartida.appendChild(p);
            })
            .catch(error => console.log('error', error));
    });
    // ###################################################
    // #                                                 #
    // #                                                 #
    // #              Mostrar Cartes Crupier             #
    // #                                                 #
    // #                                                 #
    // ###################################################
    mostrarCartesCrupier.addEventListener('click', () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`http://localhost:8080/blackjack_war_exploded/api/blackjack/mostraCartesCrupier/${numPartida}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                infoPartida.innerHTML = `
                <p>
                Total de cartes: ${result.length}<br />
                Valor de la carta visible: ${result[0]}
                `;
            })
            .catch(error => console.log('error', error));
    });
    // ###################################################
    // #                                                 #
    // #                                                 #
    // #                   PLANTAR-SE                    #
    // #                                                 #
    // #                                                 #
    // ###################################################
    plantarse.addEventListener('click', () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("codiPartida", numPartida);

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/blackjack_war_exploded/api/blackjack/plantarse", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                infoPartida.innerHTML = `<h2>${result}</h2>`
            })
            .catch(error => console.log('error', error));
    })

    acabaPartida.addEventListener('click', () => {
        var requestOptions = {
            method: 'DELETE',
            redirect: 'follow'
        };

        fetch(`http://localhost:8080/blackjack_war_exploded/api/blackjack/acabarPartida/${numPartida}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                sala.innerText = `Crea una partida nova o selecciona una existent`;
                infoPartida.innerHTML = result;
            })
            .catch(error => console.log('error', error));
    })

    setPartidaBtn.addEventListener('click', () => {
        numPartida = crearPartida.value;
        sala.innerText = `Sala actual: ${numPartida}`;
        crearPartida.value = '';
    })
}
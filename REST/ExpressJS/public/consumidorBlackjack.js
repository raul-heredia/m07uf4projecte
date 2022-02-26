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

            fetch("http://localhost:3000/crearPartida/", requestOptions)
                .then(response => response.text())
                .then(result => {
                    infoPartida.innerHTML = result;
                })
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

        fetch(`http://localhost:3000/${numPartida}/obtenirCarta`, requestOptions)
            .then(response => response.json())
            .then(result => {
                infoPartida.innerHTML = '';
                try { // nomes es un array el primer torn
                    result.forEach(cartes => {
                        infoPartida.innerHTML += `Ha sortit la carta ${cartes.nom}<br />`;
                    })
                } catch (e) {
                    infoPartida.innerHTML += `Ha sortit la carta ${result.nom}<br />`;
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

        fetch(`http://localhost:3000/${numPartida}/mostraCartes`, requestOptions)
            .then(response => response.json())
            .then(result => {
                infoPartida.innerHTML = '';
                cartesJugador = []
                result.forEach(cartes => {
                    let carta = {
                        nom: cartes.nom,
                        value: cartes.value
                    }
                    cartesJugador.push(carta);
                });
                let taula = document.createElement('TABLE');
                taula.className = 'table table-hover'
                taula.innerHTML = '<thead><tr><th scope="col">Nom de Carta</th><th scope="col">Valor</th></thead>';
                let valorJugador = 0;
                cartesJugador.forEach(cartes => {
                    let fila = taula.insertRow(-1); // amb insertRow(-1) afegim cada linia al final
                    fila.insertCell(0).innerHTML = cartes.nom;
                    fila.insertCell(1).innerHTML = cartes.value;
                    valorJugador += cartes.value;
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

        fetch(`http://localhost:3000/${numPartida}/mostraCartesCrupier`, requestOptions)
            .then(response => response.json())
            .then(result => {
                infoPartida.innerHTML = `
                <p>
                Total de cartes: ${result.length}<br />
                Carta visible: ${result[0].nom}<br />
                Valor de la carta visible: ${result[0].value}
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
        var requestOptions = {
            method: 'PUT',
            redirect: 'follow'
        };

        fetch(`http://localhost:3000/${numPartida}/plantarse`, requestOptions)
            .then(response => response.text())
            .then(result => infoPartida.innerHTML = `<h2>${result}</h2>`)
            .catch(error => console.log('error', error));
    })

    acabaPartida.addEventListener('click', () => {
        var requestOptions = {
            method: 'DELETE',
            redirect: 'follow'
        };

        fetch(`http://localhost:3000/${numPartida}/acabaPartida`, requestOptions)
            .then(response => response.text())
            .then(result => infoPartida.innerHTML = result)
            .catch(error => console.log('error', error));
    })

    setPartidaBtn.addEventListener('click', () => {
        numPartida = crearPartida.value;
        sala.innerText = `Sala actual: ${numPartida}`;
    })
}
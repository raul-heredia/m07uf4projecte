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
            crearPartida.value = '';
            sala.innerText = `Sala actual: ${numPartida}`;

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var graphql = JSON.stringify({
                query: `mutation{\r\n  crearPartida(codiPartida: ${numPartida})\r\n}`,
                variables: {}
            })
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: graphql,
                redirect: 'follow'
            };

            fetch("http://localhost:4000/graphql", requestOptions)
                .then(response => response.json())
                .then(result => infoPartida.innerHTML = result.data.crearPartida)
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

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var graphql = JSON.stringify({
            query: `query{\r\n  obtenirCarta(codiPartida: ${numPartida})\r\n}`,
            variables: {}
        })
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: graphql,
            redirect: 'follow'
        };

        fetch("http://localhost:4000/graphql", requestOptions)
            .then(response => response.json())
            .then(result => {
                infoPartida.innerHTML = '';
                let cartes = JSON.parse(result.data.obtenirCarta);
                try { // nomes es un array el primer torn
                    cartes.forEach(carta => {
                        infoPartida.innerHTML += `Ha sortit la carta ${carta.nom}<br />`;
                    })
                } catch (e) {
                    infoPartida.innerHTML += `Ha sortit la carta ${cartes.nom}<br />`;
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

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var graphql = JSON.stringify({
            query: `query{\r\n  mostraCartes(codiPartida: ${numPartida})\r\n}`,
            variables: {}
        })
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: graphql,
            redirect: 'follow'
        };

        fetch("http://localhost:4000/graphql", requestOptions)
            .then(response => response.json())
            .then(result => {
                infoPartida.innerHTML = '';
                let cartes = JSON.parse(result.data.mostraCartes);
                cartesJugador = []
                cartes.forEach(carta => {
                    let cartaTemp = {
                        nom: carta.nom,
                        value: carta.value
                    }
                    cartesJugador.push(cartaTemp);
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

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var graphql = JSON.stringify({
            query: `query{\r\n  mostraCartesCrupier(codiPartida: ${numPartida})\r\n}`,
            variables: {}
        })
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: graphql,
            redirect: 'follow'
        };

        fetch("http://localhost:4000/graphql", requestOptions)
            .then(response => response.json())
            .then(result => {
                let cartes = JSON.parse(result.data.mostraCartesCrupier);
                infoPartida.innerHTML = `
                <p>
                Total de cartes: ${cartes.length}<br />
                Carta visible: ${cartes[0].nom}<br />
                Valor de la carta visible: ${cartes[0].value}
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
        myHeaders.append("Content-Type", "application/json");

        var graphql = JSON.stringify({
            query: `mutation{\r\n  plantarse(codiPartida: ${numPartida})\r\n}`,
            variables: {}
        })
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: graphql,
            redirect: 'follow'
        };

        fetch("http://localhost:4000/graphql", requestOptions)
            .then(response => response.json())
            .then(result => {
                let estatus = JSON.parse(result.data.plantarse);
                infoPartida.innerHTML = `
                <h2>${estatus.estat}</h2><br />
                <p><b>El teu marcador és:</b> ${estatus.marcadorJugador}</p>
                <p><b>El marcador del crupier és:</b> ${estatus.marcadorCrupier}
                    `
            })
            .catch(error => console.log('error', error));
    })

    // ###################################################
    // #                                                 #
    // #                                                 #
    // #                 Acabar Partida                  #    
    // #                                                 #
    // #                                                 #
    // ###################################################

    acabaPartida.addEventListener('click', () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var graphql = JSON.stringify({
            query: `mutation{\r\n  acabarPartida(codiPartida: ${numPartida})\r\n}`,
            variables: {}
        })
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: graphql,
            redirect: 'follow'
        };

        fetch("http://localhost:4000/graphql", requestOptions)
            .then(response => response.json())
            .then(result => {
                sala.innerText = `Crea una partida nova o selecciona una existent`;
                infoPartida.innerHTML = result.data.acabarPartida
            })
            .catch(error => console.log('error', error));
    })

    setPartidaBtn.addEventListener('click', () => {
        numPartida = crearPartida.value;
        crearPartida.value = '';
        sala.innerText = `Sala actual: ${numPartida}`;
        infoPartida.innerHTML = `S'ha canviat a la sala ${numPartida}`;
    })
}
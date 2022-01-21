window.onload = main;

function main(){

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            console.log(this.responseText);
        }
    });

    xhr.open("GET", "http://localhost:8080/blackjack_war_exploded/api/blackjack/consultarTOTS");

    xhr.send();

}
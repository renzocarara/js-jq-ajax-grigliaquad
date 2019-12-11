// Esercizio di oggi: creare una griglia formata da 6x6 quadratini (anche in html va bene).
// Ad ogni click su un quadratino parte una chiamata AJAX all'API boolean
// https://flynn.boolean.careers/exercises/api/random/int
// che restituisce un numero intero.
// A seconda del valore restituito dall'API bisogna colorare il quadratino su cui si è cliccato, secondo queste regole:
// se il numero restituito dalle API è <= 5, il quadratino diventa giallo
// se il numero restituito dalle API è > 5, il quadratino diventa verde
// Nome repo: js-jq-ajax-grigliaquad
// -----------------------------------------------------------------------------
var side = 6; // lato griglia
var gridSize = side * side; // dimensione griglia, numero di elementi di cui è composta

// creo la griglia di (side x side) elementi
createGrid();

// intercetto click su una cella
$('.cell').click(function() {

    // mi salvo il riferimento alla cella cliccata
    var clicked = $(this);

    // eseguo una chiamata AJAX per avere un numero random
    $.ajax({
        url: 'https://flynn.boolean.careers/exercises/api/random/int',
        method: 'GET',
        success: function(data) {
            // mi salvo il valore ritornato dalla API
            var randomNumber = data.response;
            console.log("data:", data);
            console.log("data.response:", data.response);
            // chiamo una funzione che utilizza il dato in risposta ricevuto dalla API
            setCell(clicked, randomNumber);
        },
        error: function(err) {
            console.log("error");
        }
    }); // fine chiamata AJAX

}); // fine document ready

// ---------------------------- FUNCTIONs --------------------------------------
function createGrid() {
    // creo una griglia di "side" * "side" celle
    var HTMLgridCell = '<span class="cell"></span>'; // codice HTML da ripetere in pagina

    // ciclo per "gridSize" volte e aggiungo ogni volta il mio elemnto HTML
    for (var i = 0; i < gridSize; i++) {
        // appendo l'elemento
        $('.grid-container').append(HTMLgridCell);
    }
}


function setCell(clickedCell, randomNum) {
    console.log("cella cliccata!");
    // aggiorno colore cella, in clickedCell ho il riferimento all'elemento appena cliccato
    $(clickedCell).html(randomNum); // aggiungo il numero random generato

    if (randomNum <= 5) {
        $(clickedCell).addClass('yellow').removeClass('green'); // con la classe green cambio il background-color
    } else {
        $(clickedCell).addClass('green').removeClass('yellow'); // con la classe green cambio il background-color
    }
}
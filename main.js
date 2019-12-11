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
var gridSize = side * side; // dimensione griglia, numero di celle di cui è composta

// creo la griglia di (side x side) celle
createGrid();

// intercetto click sulle celle
$('.cell').click(function() {

    var clicked = $(this); // mi salvo il riferimento alla cella cliccata
    var randomInt0_9 = 'https://flynn.boolean.careers/exercises/api/random/int';

    // eseguo una chiamata AJAX
    $.ajax({
        // chiamo una API che mi rstituisce un numero intero random tra 0 e 9
        url: randomInt0_9,
        // sono io client che richiedo dei dati
        method: 'GET',
        // la chiamata è andata bene, utilizzo i dati ritornati
        success: function(data) {
            // mi salvo il valore ritornato dalla API
            var randomNumber = data.response;
            // chiamo una funzione che utilizza il dato in risposta ricevuto dalla API
            setCell(clicked, randomNumber);
        },
        // qui sotto ci arrivo se la API da' errore
        error: function(error) {
            alert("Errore dalla chiamata API");
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

    // in clickedCell ho il riferimento all'elemento appena cliccato
    // in randomNum, il numero casuale tra 0 e 9, ottenuto dalla chiamata alla API
    $(clickedCell).html(randomNum); // aggiungo il numero random generato

    // in base al valore del numero random coloro la cella
    if (randomNum <= 5) {
        $(clickedCell).addClass('yellow').removeClass('green'); // imposto a giallo il colore di sfondo
    } else {
        $(clickedCell).addClass('green').removeClass('yellow'); // imposto a verde il colore di sfondo
    }
}
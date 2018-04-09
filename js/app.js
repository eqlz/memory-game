/*
 * Create a list that holds all of your cards
 */
 //var allCards = document.getElementsByClassName("card");
var allCards = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt",
                "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function displayCards(array) {
    /*
    TODO
    another way:
    only change <i>'s attribute, so no need to create <li>, or <i>
    */
    var cards = shuffle(allCards);

    var deck = document.getElementsByClassName("deck");

    for (var i = 0; i < cards.length; i++) {
        // create <li class="card"></li> element
        var card = document.createElement("li");
        var att = document.createAttribute("class");
        att.value = "card";
        card.setAttributeNode(att);

        // create <i class="<card_name>"></i> element
        var cardName = document.createElement("i");
        var attCardName = document.createAttribute("class");
        attCardName.value = cards[i];
        cardName.setAttributeNode(attCardName);

        // append <i> into <li>
        card.appendChild(cardName);

        // append <li> to <ul class="deck">
        deck.appendChild(card);
    }

}

displayCards(allCards);



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
var openCards = [];
var matchedCards = [];

document.getElementsByClassName("card").addEventListener("click", compareCards);



function displayCardSymbol(card) {
    /*
    TODO:
    need to add open, show to class, not sure if the following will work
    */
    card.setAttribute("class", "card open show");
    //card.setAttribute("class", "show");
    openCards.push(card);
}

function compareCards(openCards) {
    if (openCards.length == 2) {
        var card1 = openCards[0];
        var card2 = openCards[1];

        var card1Symbol = card1.children[0].getAttribute("class");
        var card2Symbol = card2.children[0].getAttribute("class");

        // if cards match
        if (card1Symbol == card2Symbol) {
            card1.setAttribute("class", "card match");
            card2.setAttribute("class", "card match");
            matchedCards.push(card1, card2);
            openCards.pop(card1, card2);
        } else {
            card1.setAttribute("class", "card");
            card2.setAttribute("class", "card");
            openCards.pop(card1, card2);
        }
    }
    // increment move counter
    var moveCounter = Number(document.getElementsByClassName("move").innerHTML);
    document.getElementsByClassName("move").innerHTML = String(moveCounter++);

    // check if all cards have matched
    if (matchedCards.length == 16) {
        //TODO
        // display a message with final score
    }
}

















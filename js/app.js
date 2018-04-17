/*
 * Create a list that holds all of your cards
 */
 //var allCards = document.getElementsByClassName("card");
var allCardsSymbol = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt",
                "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb",
                "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt",
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

function randomizeCards() {
    var cardsSymbol = shuffle(allCardsSymbol);
    console.log(cardsSymbol);
    var cardsElement = document.getElementsByClassName("card");
    for (var i = 0; i < cardsElement.length; i++) {
        cardsElement[i].setAttribute("class", "card");
        cardsElement[i].children[0].setAttribute("class", cardsSymbol[i]);
    }
}


var restartElement = document.getElementsByClassName("restart")[0];
restartElement.addEventListener("click", randomizeCards);

//function setCardAttribute()
/*
function displayCards(array) {
    // TODO
    // another way:
    // only change <i>'s attribute, so no need to create <li>, or <i>
    
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
*/


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

var cardsElement = document.getElementsByClassName("card");

var moveCounterElement = document.getElementsByClassName("moves")[0];
var currentMoves = Number(moveCounterElement.innerHTML);

for (var i = 0; i < cardsElement.length; i++) {
    console.log(cardsElement[i]);
    cardClickEvent(cardsElement[i]);
}

function cardClickEvent(card) {
    card.addEventListener("click", function() {
        //var self = this;
        //displayCards(allCardsSymbol);
        //timerStart();
        displayCardSymbol(this);
        console.log("displayCardSymbol function")

        addToOpenCards(this);
        console.log(openCards[0]);
        console.log(openCards[1]);
        console.log(openCards.length);

        setTimeout(checkTwoOpenCards, 550);

        /*
        if (openCards.length > 1) {
            match = checkCardsMatch(openCards);
            
            if (match) {
                cardsMatch(openCards);
            }

            if (!match) {
                cardsNotMatach(openCards);
            }

            incrementMoves();

            if (matchedCards.length == 16) {
                alert("cards all matched!");
            }

            console.log("after checking cards match, open cards should be empty");
            console.log(openCards.length);
        }
        /**/
        
        
        
        
    })
}

function displayCardSymbol(card) {
    // TODO:
    // need to add open, show to class, not sure if the following will work
    card.setAttribute("class", "card open show");
    console.log("make card open show");
    //card.setAttribute("class", "show");
}

function addToOpenCards(card) {
    openCards.push(card);
}

/*
function keepCardsOpen() {
    setTimeout(checkTwoOpenCards, 1000);
}
/**/

//*
function checkTwoOpenCards() {
    console.log("run function checkTwoOpenCards");
    if (openCards.length > 1) {
        match = checkCardsMatch(openCards);
        
        if (match) {
            cardsMatch(openCards);
        }

        if (!match) {
            cardsNotMatach(openCards);
        }

        incrementMoves();
        console.log("current moves are" + currentMoves);

        starRatingChange();

        /*
        if (matchedCards.length == 16) {
            alert("cards all matched!");
            //displayCards(allCardsSymbol);
        }
        /**/
        cardsAllMatched();



        console.log("after checking cards match, open cards should be empty");
        console.log(openCards.length);
    }
}
/**/

// add the following functions on Apr 9th, 2018
// to make game logic work
function checkCardsMatch(openCardsArray) {
    console.log("check if cards match");

    card1 = openCardsArray[0];
    card2 = openCardsArray[1];

    card1Symbol = card1.children[0].getAttribute("class");
    card2Symbol = card2.children[0].getAttribute("class");

    if (card1Symbol == card2Symbol) {
        return true;
    }  else {
        return false;
    }
}

function cardsMatch(openCardsArray) {
    console.log("when cards match");
    //*
    card1 = openCardsArray[0];
    card2 = openCardsArray[1];

    card1.setAttribute("class", "card match");
    card2.setAttribute("class", "card match");

    matchedCards.push(card1, card2);

    openCardsArray.length = 0;
    /**/


}

function cardsNotMatach(openCardsArray) {
    /*
    console.log("when cards don't match");
    card1 = openCardsArray[0];
    card2 = openCardsArray[1];

    card1.setAttribute("class", "card");
    card2.setAttribute("class", "card");

    openCardsArray.pop(card1);
    openCardsArray.pop(card2);
    /**/

    console.log("when cards don't match");
    for (var i = 0; i < openCardsArray.length; i++) {
        openCardsArray[i].setAttribute("class", "card");       
    }
    // https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript
    openCardsArray.length = 0;
}

function incrementMoves() {
    //var moveCounterElement = document.getElementsByClassName("moves")[0];
    //var currentMoves = Number(moveCounterElement.innerHTML);
    currentMoves += 1;
    moveCounterElement.innerHTML = String(currentMoves);
}

function cardsAllMatched() {
    if (matchedCards.length == 16) {
        //alert("cards all matched!");
        //displayCards(allCardsSymbol);
        timerStop();
        //$('#myModal').modal('show');
        congratulationsPopup();
    } 
}

//*
function starRatingChange() {
    var starRatingElement = document.getElementsByClassName("fa fa-star");
    console.log(starRatingElement);
    console.log("current moves in starRatingChange function: " + currentMoves);
    console.log(typeof currentMoves);
    if ( 16 < currentMoves && currentMoves == 17) {
        starRatingElement[0].setAttribute("class", "''");
    }

    if (24 < currentMoves && currentMoves == 25) {
        starRatingElement[1].setAttribute("class", "''");
    }
}
/**/

cardsElement[0].addEventListener("click", timerStart, {once : true});

var timerInterval;
var minutesElement = document.getElementsByClassName("minutes")[0];
var secondsElement = document.getElementsByClassName("seconds")[0];

function zeroPad(val) {
    return val > 9 ? val : "0" + val;
}

function timerStart() {
    var totalSeconds = 0;

    timerInterval = setInterval(function() {
        totalSeconds++;
        secondsElement.innerHTML = zeroPad(totalSeconds % 60);
        minutesElement.innerHTML = zeroPad(parseInt(totalSeconds / 60, 10));        
    }, 1000);

    /*
    if (matchedCards == 16) {
        clearInterval(timerInterval);
    }
    /**/
}

/*
function incrementTimer() {
    totalSeconds++;
    secondsElement.innerHTML = zeroPad(totalSeconds % 60);
    minutesElement.innerHTML = zeroPad(parseInt(totalSeconds / 60, 10));
}
/**/

//*
function timerStop() {
    clearInterval(timerInterval);
}
/**/

/*
function congratulationsPopup() {
    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal 
    btn.onclick = function() {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}
/**/


// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

//var modalMessageElement = document.getElementsByClassName("modal-message")[0];

function timeUsedToMatchCards() {
    var minutesUsedElement = document.getElementsByClassName("minutes-used")[0];
    var secondsUsedElement = document.getElementsByClassName("seconds-used")[0];

    minutesUsedElement.innerHTML = minutesElement.innerHTML;
    secondsUsedElement.innerHTML = secondsElement.innerHTML;
}

function congratulationsPopup() {
// When the user clicks on the button, open the modal
    timeUsedToMatchCards(); 
    modal.style.display = "block";
}

btn.onclick = function() {
    timeUsedToMatchCards();
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

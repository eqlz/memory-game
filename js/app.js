var allCardsSymbol = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt",
                "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb",
                "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt",
                "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"];

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

/*
Game logic
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
        displayCardSymbol(this);
        console.log("displayCardSymbol function")

        addToOpenCards(this);
        console.log(openCards[0]);
        console.log(openCards[1]);
        console.log(openCards.length);

        setTimeout(checkTwoOpenCards, 550);        
    })
}

function displayCardSymbol(card) {
    card.setAttribute("class", "card open show");
    console.log("make card open show");
}

function addToOpenCards(card) {
    openCards.push(card);
}

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

        movesIncrement();
        starRatingChange();
        cardsAllMatched();
    }
}

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
    card1 = openCardsArray[0];
    card2 = openCardsArray[1];

    card1.setAttribute("class", "card match");
    card2.setAttribute("class", "card match");

    matchedCards.push(card1, card2);

    openCardsArray.length = 0;
}

function cardsNotMatach(openCardsArray) {
    console.log("when cards don't match");
    for (var i = 0; i < openCardsArray.length; i++) {
        openCardsArray[i].setAttribute("class", "card");       
    }
    openCardsArray.length = 0;
}

function cardsAllMatched() {
    if (matchedCards.length == 16) {
        timerStop();
        congratulationsPopup();
    } 
}

/*
Increment moves
*/
function movesIncrement() {
    currentMoves += 1;
    moveCounterElement.innerHTML = String(currentMoves);
}

/*
Change star rating as moves increase
*/
function starRatingChange() {
    var starRatingElement = document.getElementsByClassName("fa fa-star");
    if ( 16 < currentMoves && currentMoves == 17) {
        starRatingElement[0].setAttribute("class", "''");
    }

    if (24 < currentMoves && currentMoves == 25) {
        starRatingElement[1].setAttribute("class", "''");
    }
}

/*
Timer starts when first click a card, and timer stops when all cards match 
*/
var deckElement = document.getElementsByClassName("deck")[0];
var timerInterval;
var minutesElement = document.getElementsByClassName("minutes")[0];
var secondsElement = document.getElementsByClassName("seconds")[0];

deckElement.addEventListener("click", timerStart, {once: true});

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
}

function timerStop() {
    clearInterval(timerInterval);
}

/*
Restart the game
*/
function movesReset() {
    currentMoves = 0;
    moveCounterElement.innerHTML = String(currentMoves);
}

function starRatingReset() {
    var starRatingElement = document.getElementsByClassName("stars")[0].children;
    for (var i = 0; i < starRatingElement.length; i++) {
        starRatingElement[i].children[0].setAttribute("class", "fa fa-star");
    }
}

function timerReset() {
    timerStop();
    minutesElement.innerHTML = "00";
    secondsElement.innerHTML = "00";   
}

function matchedCardsEmpty() {
    matchedCards.length = 0;
}

function gameReset() {
    randomizeCards();
    movesReset();
    starRatingReset();
    timerReset();
    matchedCardsEmpty();
    deckElement.addEventListener("click", timerStart, {once: true});
}

var restartButtonElement = document.getElementsByClassName("restart")[0];
restartButtonElement.addEventListener("click", gameReset);

/*
Congratulations popup
*/
var modal = document.getElementsByClassName('modal')[0];

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var closeButton = document.getElementsByClassName("close")[0];
closeButton.addEventListener("click", function() {
    modal.style.display = "none";
})

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
})

var modalRetartButton = document.getElementsByClassName("modal-restart")[0];
modalRetartButton.addEventListener("click", gameReset);

function showFinalStarRating() {
    var starRatingElement = document.getElementsByClassName("stars")[0].getElementsByClassName("fa fa-star");

    var finalStarRatingElement = document.getElementsByClassName("modal-star-rating")[0];

    for (var i = 0; i < starRatingElement.length; i++) {
        var starElement = document.createElement("I");
        starElement.setAttribute("class", "fa fa-star");
        finalStarRatingElement.appendChild(starElement);
    }
}

function timeUsedToMatchCards() {
    var minutesUsedElement = document.getElementsByClassName("modal-minutes")[0];
    var secondsUsedElement = document.getElementsByClassName("modal-seconds")[0];

    minutesUsedElement.innerHTML = minutesElement.innerHTML;
    secondsUsedElement.innerHTML = secondsElement.innerHTML;
}

function congratulationsPopup() {
    timeUsedToMatchCards();
    showFinalStarRating(); 
    modal.style.display = "block";
}

btn.onclick = function() {
    timeUsedToMatchCards();
    showFinalStarRating();
    modal.style.display = "block";
}
/*
 * Load the game
 */
document.addEventListener("DOMContentLoaded", function() {
    randomizeCards();
});

var allCardsSymbol = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt",
                "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb",
                "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt",
                "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"];

function randomizeCards() {
    var cardsSymbol = shuffle(allCardsSymbol);
    var cardsElement = document.getElementsByClassName("card");
    for (var i = 0; i < cardsElement.length; i++) {
        // Close all cards that have been opened
        cardsElement[i].setAttribute("class", "card");
        cardsElement[i].children[0].setAttribute("class", cardsSymbol[i]);
    }
}

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

/*
 * Game logic
 */
var openCards = [];
var matchedCards = [];
var cardsElement = document.getElementsByClassName("card");
var moveCounterElement = document.getElementsByClassName("moves")[0];
var currentMoves = Number(moveCounterElement.innerHTML);

for (var i = 0; i < cardsElement.length; i++) {
    cardClickEvent(cardsElement[i]);
}

function cardClickEvent(card) {
    card.addEventListener("click", function() {
        card.setAttribute("class", "card open show");
        openCards.push(card);
        if (openCards.length > 1) {
            setTimeout(checkTwoOpenCards, 300);       
        }
    });
}

function checkTwoOpenCards() {
    card1 = openCards[0];
    card2 = openCards[1];

    card1Symbol = card1.children[0].getAttribute("class");
    card2Symbol = card2.children[0].getAttribute("class");

    if (card1Symbol == card2Symbol) {
        cardsMatch(card1, card2);
    }  else {
        cardsNotMatach(card1, card2);
    }
    
    movesIncrement();
    starRatingChange();
    cardsAllMatched();
}

function cardsMatch(card1, card2) {
    card1.setAttribute("class", "card match");
    card2.setAttribute("class", "card match");

    matchedCards.push(card1, card2);

    setTimeout(function() {
        openCards.length = 0;
    }, 601); // It takes 0.6s to finish css match-tada effect
}

function cardsNotMatach(card1, card2) {
    card1.setAttribute("class", "card unmatch-effect");
    card2.setAttribute("class", "card unmatch-effect");

    setTimeout(function() {
        card1.setAttribute("class", "card");
        card2.setAttribute("class", "card");
    }, 600); // It takes 0.6s to finish css unmatch-shake effect 

    setTimeout(function() {
        openCards.length = 0;
    }, 601);
}

/*
 * Increment moves
 */ 
function movesIncrement() {
    currentMoves += 1;
    moveCounterElement.innerHTML = String(currentMoves);
}

/*
 * Change star rating as moves increase
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

function cardsAllMatched() {
    if (matchedCards.length == 16) {
        timerStop();
        showCongratulationsPopup();
    }
}

/*
 * Timer starts when first click a card,
 * timer stops when all cards match.
 */ 
var deckElement = document.getElementsByClassName("deck")[0];
var minutesElement = document.getElementsByClassName("minutes")[0];
var secondsElement = document.getElementsByClassName("seconds")[0];
var timerInterval;

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
 * Restart the game
 */
var restartButtonElement = document.getElementsByClassName("restart")[0];

restartButtonElement.addEventListener("click", gameReset);

function gameReset() {
    randomizeCards();
    movesReset();
    starRatingReset();
    timerReset();

    matchedCards.length = 0;

    deckElement.addEventListener("click", timerStart, {once: true});
}

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

/*
 * Congratulations popup modal
 */
var modal = document.getElementsByClassName('modal')[0];
var closeButton = document.getElementsByClassName("close")[0];
var modalRetartButton = document.getElementsByClassName("modal-restart")[0];

closeButton.addEventListener("click", function() {
    modal.style.display = "none";
});

window.addEventListener("click", function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});

modalRetartButton.addEventListener("click", function() {
    gameReset();
    modal.style.display = "none";
});

function timeUsedToMatchCards() {
    var minutesUsedElement = document.getElementsByClassName("modal-minutes")[0];
    var secondsUsedElement = document.getElementsByClassName("modal-seconds")[0];

    minutesUsedElement.innerHTML = minutesElement.innerHTML;
    secondsUsedElement.innerHTML = secondsElement.innerHTML;
}

function showFinalStarRating() {
    var starRatingElement = document.getElementsByClassName("stars")[0].getElementsByClassName("fa fa-star");

    var finalStarRatingElement = document.getElementsByClassName("modal-star-rating")[0];

    for (var i = 0; i < starRatingElement.length; i++) {
        var starElement = document.createElement("I");
        starElement.setAttribute("class", "fa fa-star");
        finalStarRatingElement.appendChild(starElement);
    }
}

function showCongratulationsPopup() {
    timeUsedToMatchCards();
    showFinalStarRating(); 
    modal.style.display = "block";
}

/*
btn.onclick = function() {
    timeUsedToMatchCards();
    showFinalStarRating();
    modal.style.display = "block";
}
/**/
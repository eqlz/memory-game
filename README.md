# Memory Game
Memory game is a simple game to test how good your memory is.  This front-end project is built via JavaScript, HTML, CSS, and Font Awesome provides symbols behind each card.

## Version
Version 1.3 - released on May 3rd with css animation of cards unsuccessfully matched, and successfully matched

~~Version 1.2 - released on May 2nd with card flip effect feature added~~

~~Version 1.1 - released on Apr 23rd, 2018 with reponsive web design~~

~~Version 1.0 - released on Apr 22nd, 2018~~

Features to add:
* ~~Responsive, usable across desktop, tablet, mobile.~~
* ~~Add CSS animation, an effect of card flipping over when a card is clicked.~~
* ~~Add CSS animations when cards are clicked, unsuccessfully matched, and successfully matched.~~
* Implement a leaderboard, store game state using local storage.

## Run The Game
1. Download this repo, open `index.html` in your browser, or
2. Play it at github.io [Memory Game](https://eqlz.github.io/memory-game/).

## How To Play The Game
The game board consists of 16 cards.  This 16 cards are made up with 8 pairs of symbols, and every two cards have the same symbols.  These 16 cards are randomly arranged.

Click one card, to flip it open, and then click another to flip it open.  If two cards have the same symbols, then two cards match and they will be kept open.  If two cards have different symbols,  they will be flipped back to being closed.

A palyer's job is to match all cards.  Once all cards match, all of them will be open.

## How Star Rating Changes
At the beginning of the game, star rating is three.  As moves a player makes increase, star rating will decrease.

Star rating will change in this way:
* Less or equal to 16 moves, 3 star
* Between 17 and 24 moves, 2 star
* Beyond 24 moves, 1 star 

So, why set it up in this way?

To open all 16 cards, a player needs to make 8 moves.  If a player has a super good memory, she will remember each card's symbol after only one round of opening all cards. Now she just needs to make another 8 moves to match all cards, based on her memory.  In total 16 moves, thus 3 star.

Between 17 and 24 moves, it means, a player needs at most two rounds of opening all cards to match all cards. 8 moves - one round of opening all cards, another 8 moves - another round of opening all cards, and at last 8 moves to match all cards. In total, 24 moves.  So 2 star.

Beyond 24 moves, it means that a player needs to open all cards more than two rounds, so only 1 star.

This is not how players play this game, but to think in this ways, helps understand how to change star rating based on moves.
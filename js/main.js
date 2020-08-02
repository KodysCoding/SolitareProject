var deckOfCards = [[2, 'c'], [3, 'c'], [4, 'c'], [5, 'c'], [6, 'c'], [7, 'c'], [8, 'c'], [9, 'c'], [10, 'c'], ['J', 'c'], ['Q', 'c'], ['K', 'c'], ['A', 'c'],
[2, 'd'], [3, 'd'], [4, 'd'], [5, 'd'], [6, 'd'], [7, 'd'], [8, 'd'], [9, 'd'], [10, 'd'], ['J', 'd'], ['Q', 'd'], ['K', 'd'], ['A', 'd'],
[2, 'h'], [3, 'h'], [4, 'h'], [5, 'h'], [6, 'h'], [7, 'h'], [8, 'h'], [9, 'h'], [10, 'h'], ['J', 'h'], ['Q', 'h'], ['K', 'h'], ['A', 'h'],
[2, 's'], [3, 's'], [4, 's'], [5, 's'], [6, 's'], [7, 's'], [8, 's'], [9, 's'], [10, 's'], ['J', 's'], ['Q', 's'], ['K', 's'], ['A', 's']];

window.addEventListener('load', shuffelAndDeal);

//new game button reloads page
document.getElementById('new-game').addEventListener('click', () => {window.location.reload()});

var shuffeledDeck = []

function shuffelAndDeal () {

    //creating container arrays, to randomly select and put individual card value arrays into. chosen from deckOfCards array
    var cardStackOne =[], cardStackTwo =[], cardStackThree =[], cardStackFour =[], cardStackFive =[], cardStackSix =[], cardStackSeven =[];
    
    //choosing random card value arrays to put into empty container arrays, for every card stack and the shuffeled deck
    function dealArray (array, i) {
        while(i > 0){
            let newArray = deckOfCards.splice(Math.floor(Math.random()*deckOfCards.length-1), 1);
            array.push(newArray[0]);
            newArray = [];
            i--
        };
    };

    //assigning singular card value array to first card stack (no loop needed, since only 1 card)
    let newArray = deckOfCards.splice(Math.floor(Math.random()*deckOfCards.length-1), 1);
    cardStackOne.push(newArray[0]);

    //calling function to put random card value arrays into empty container arrays
    dealArray(cardStackTwo, 2);
    dealArray(cardStackThree, 3);
    dealArray(cardStackFour, 4);
    dealArray(cardStackFive, 5);
    dealArray(cardStackSix, 6);
    dealArray(cardStackSeven, 7);
    //putting remaining card value arrays into a container array at random
    dealArray(shuffeledDeck, 24);

    //grabbing the first card stack container div, to place singular flipped card into
    var firstStack = document.getElementById('first-stack');
    //grabbing all the card stack unknown card container divs (within the card container div)
    var secondStack = document.getElementById('second-unknown');
    var thirdStack = document.getElementById('third-unknown');
    var fourthStack = document.getElementById('fourth-unknown');
    var fifthStack = document.getElementById('fifth-unknown');
    var sixthStack = document.getElementById('sixth-unknown');
    var seventhStack = document.getElementById('seventh-unknown');
    //grabbing deck's card container div for remaining cards
    var remainingCards = document.getElementById('remaining-cards');

    //asigning (and styling) each array container card value array to its own individual div within the unknown card container divs
    function dealDiv (array, divStack) {
       array.forEach(arrayItem => {
            let newCard = document.createElement('div');
            if(arrayItem[1] == 'c'){
                newCard.style.backgroundImage = "url('../images/clubs.jpg')";
                newCard.style.color = 'black';
                } else if(arrayItem[1] == 'd'){
                newCard.style.backgroundImage = "url('../images/diamonds.jpg')";
                newCard.style.color = 'red';
                } else if(arrayItem[1] == 'h'){
                newCard.style.backgroundImage = "url('../images/hearts.jpg')";
                newCard.style.backgroundPosition = 'center 13px';
                newCard.style.color = 'red';
                } else if(arrayItem[1] == 's'){
                newCard.style.backgroundImage = "url('../images/spades.jpg')";
                newCard.style.color = 'black';
            };

            newCard.className = 'unknown-card';
            newCard.innerHTML = arrayItem[0];
            divStack.appendChild(newCard);
        });


        
    };

    //asigning (and styling) the first container array's card value array to its own div within the first card stack container div
    let newCard = document.createElement('div');
    if(cardStackOne[0][1] == 'c'){
        newCard.style.backgroundImage = "url('../images/clubs.jpg')";
        newCard.style.color = 'black';
        } else if(cardStackOne[0][1] == 'd'){
        newCard.style.backgroundImage = "url('../images/diamonds.jpg')";
        newCard.style.color = 'red';
        } else if(cardStackOne[0][1] == 'h'){
        newCard.style.backgroundImage = "url('../images/hearts.jpg')";
        newCard.style.backgroundPosition = 'center 13px';
        newCard.style.color = 'red';
        } else if(cardStackOne[0][1] == 's'){
        newCard.style.backgroundImage = "url('../images/spades.jpg')";
        newCard.style.color = 'black';
    };
    newCard.className = 'flipped-card';
    newCard.innerHTML = cardStackOne[0][0];
    firstStack.appendChild(newCard);

    //calling function to asign and style each container array's card value array to its own div and put into its respective card container div
    dealDiv(cardStackTwo, secondStack);
    dealDiv(cardStackThree, thirdStack);
    dealDiv(cardStackFour, fourthStack);
    dealDiv(cardStackFive, fifthStack);
    dealDiv(cardStackSix, sixthStack);
    dealDiv(cardStackSeven, seventhStack);
    //calling function to asign and style each remaining card for deck card container div
    dealDiv(shuffeledDeck, remainingCards);

    //flipping the last card by changing its class name, and putting it into its respective card container div (and removing it from the unknown card container div)
    function flipLastCard (stack, newStack) {
        let flippedCard = stack.lastChild;
        flippedCard.className = 'flipped-card';
        document.getElementById(newStack).appendChild(flippedCard);
    };
    //calling function to flip the last card by changing its class name, and putting it into its respective card container div (and removing it from the unknown card container div)
    flipLastCard(secondStack, 'second-stack');
    flipLastCard(thirdStack, 'third-stack');
    flipLastCard(fourthStack, 'fourth-stack');
    flipLastCard(fifthStack, 'fifth-stack');
    flipLastCard(sixthStack, 'sixth-stack');
    flipLastCard(seventhStack, 'seventh-stack');


};



var deckContainer = document.getElementById('deck');
var deck = document.getElementById('remaining-cards');
var flippedDeck = document.getElementById('flipped-deck');


deck.addEventListener('click', () => {

    if(deck.children.length == 1){
        deck.lastChild.className = 'flipped-card';
        flippedDeck.appendChild(deck.lastChild);
        console.log('hello again');
    }else if(deck.hasChildNodes()){
        deck.lastChild.className = 'flipped-card';
        flippedDeck.appendChild(deck.lastChild);
        console.log('2 times');   
    }else {
        while (flippedDeck.childNodes.length > 0){
            flippedDeck.children[0].className = 'unknown-card';
            deck.appendChild(flippedDeck.children[0]);
        };
    };

});

flippedDeck.addEventListener('click', () => {
    if(flippedDeck.children.length == 0){
        return false;
    }else {
        flippedDeck.lastChild.className = 'unknown-card';
        deck.appendChild(flippedDeck.lastChild);
    };
});


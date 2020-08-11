//creating an array for each card value in the deck
var deckOfCards = [[2, 'c'], [3, 'c'], [4, 'c'], [5, 'c'], [6, 'c'], [7, 'c'], [8, 'c'], [9, 'c'], [10, 'c'], ['J', 'c'], ['Q', 'c'], ['K', 'c'], ['A', 'c'],
[2, 'd'], [3, 'd'], [4, 'd'], [5, 'd'], [6, 'd'], [7, 'd'], [8, 'd'], [9, 'd'], [10, 'd'], ['J', 'd'], ['Q', 'd'], ['K', 'd'], ['A', 'd'],
[2, 'h'], [3, 'h'], [4, 'h'], [5, 'h'], [6, 'h'], [7, 'h'], [8, 'h'], [9, 'h'], [10, 'h'], ['J', 'h'], ['Q', 'h'], ['K', 'h'], ['A', 'h'],
[2, 's'], [3, 's'], [4, 's'], [5, 's'], [6, 's'], [7, 's'], [8, 's'], [9, 's'], [10, 's'], ['J', 's'], ['Q', 's'], ['K', 's'], ['A', 's']];

//shuffeling and dealing cards when the window loads
window.addEventListener('load', shuffelAndDeal);

//new game button reloads page
document.getElementById('new-game').addEventListener('click', () => {window.location.reload()});

//creating an empty array to put the shuffeled card value arrays into
var shuffeledDeck = []

//function to shuffel and deal when the window loads/when the new game button is pressed
function shuffelAndDeal () {

    //creating container arrays, to randomly select and put individual card value arrays into. chosen from deckOfCards array
    var cardStackOne =[], cardStackTwo =[], cardStackThree =[], cardStackFour =[], cardStackFive =[], cardStackSix =[], cardStackSeven =[];
    
    //function for choosing random card value arrays to put into empty container arrays, for every card stack(except first stack) and the shuffeled deck
    function dealArray (array, i) {
        //while i(the number of cards needed) is greater than zero, do this....
        while(i > 0){
            //returns array with random card value array, taken from deckOfCards
            let newArray = deckOfCards.splice(Math.floor(Math.random()*deckOfCards.length-1), 1);
            //placing random chosen array into specific card stack array
            array.push(newArray[0]);
            //resets newArray to be empty
            newArray = [];
            // i(the number of cards needed) iteration
            i--
        };
    };

    //assigning singular card value array to first card stack (no loop needed, since only 1 card)
    let newArray = deckOfCards.splice(Math.floor(Math.random()*deckOfCards.length-1), 1);
    //pushes newArray card value array into first card stack
    cardStackOne.push(newArray[0]);

    //calling function to put random card value arrays into empty container arrays for each card stack array
    dealArray(cardStackTwo, 2);
    dealArray(cardStackThree, 3);
    dealArray(cardStackFour, 4);
    dealArray(cardStackFive, 5);
    dealArray(cardStackSix, 6);
    dealArray(cardStackSeven, 7);
    //putting remaining card value arrays into a container array at random for the remaining card value arrays
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
                newCard.style.backgroundImage = "url('./images/clubs.jpg')";
                newCard.style.color = 'black';
                newCard.className = 'clubs';
                } else if(arrayItem[1] == 'd'){
                newCard.style.backgroundImage = "url('./images/diamonds.jpg')";
                newCard.style.color = 'red';
                newCard.className = 'diamonds';
                } else if(arrayItem[1] == 'h'){
                newCard.style.backgroundImage = "url('./images/hearts.jpg')";
                newCard.style.backgroundPosition = 'center 13px';
                newCard.style.color = 'red';
                newCard.className = 'hearts';
                } else if(arrayItem[1] == 's'){
                newCard.style.backgroundImage = "url('./images/spades.jpg')";
                newCard.style.color = 'black';
                newCard.className = 'spades';
            };
            newCard.addEventListener('dragstart', dragStart);
            newCard.addEventListener('dragend', dragEnd);
            newCard.className += ' unknown-card';
            newCard.innerHTML = arrayItem[0];
            divStack.appendChild(newCard);
        });


        
    };

    //asigning (and styling) the first container array's card value array to its own div within the first card stack container div
    let newCard = document.createElement('div');
    if(cardStackOne[0][1] == 'c'){
        newCard.style.backgroundImage = "url('./images/clubs.jpg')";
        newCard.style.color = 'black';
        newCard.className = 'clubs';
        } else if(cardStackOne[0][1] == 'd'){
        newCard.style.backgroundImage = "url('./images/diamonds.jpg')";
        newCard.style.color = 'red';
        newCard.className = 'diamonds';
        } else if(cardStackOne[0][1] == 'h'){
        newCard.style.backgroundImage = "url('./images/hearts.jpg')";
        newCard.style.backgroundPosition = 'center 13px';
        newCard.style.color = 'red';
        newCard.className = 'hearts';
        } else if(cardStackOne[0][1] == 's'){
        newCard.style.backgroundImage = "url('./images/spades.jpg')";
        newCard.style.color = 'black';
        newCard.className = 'spades';
    };
    newCard.addEventListener('dragstart', dragStart);
    newCard.addEventListener('dragend', dragEnd);
    newCard.className += ' flipped-card';
    newCard.innerHTML = cardStackOne[0][0];
    // newCard.style.webkitUserDrag = 'element';
    newCard.setAttribute('draggable', true);
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
        let flippedCard = stack.lastElementChild;
        flippedCard.classList.remove('unknown-card');
        flippedCard.className += ' flipped-card';
        // flippedCard.style.webkitUserDrag = 'element';
        flippedCard.setAttribute('draggable', true);
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


//if the deck is clicked, do this....
deck.addEventListener('click', () => {
    //grabbing the overlay element in the dom
    let overlay = document.getElementById('overlay');
    //setting overlay class to apply style to disable multiple click events
    overlay.className = 'overlay';

    //if theres anything in the deck, do this.....
    if(deck.hasChildNodes()){
        //change the classname of the last card in the deck to 'flipped-card'
        deck.lastElementChild.classList.remove('unknown-card');
        deck.lastElementChild.className += ' flipped-card';
        //set attribute of the last card in the deck to draggable
        // deck.lastElementChild.style.webkitUserDrag = 'element';
        deck.lastElementChild.setAttribute('draggable', true);

        //if theres more than one card in the flipped deck, do this.....
        if(flippedDeck.children.length > 0){
            //remove the draggable attribute for the second to last card in the flipped deck
            // flippedDeck.lastElementChild.style.webkitUserDrag = 'none';
            flippedDeck.lastElementChild.setAttribute('draggable', false);
        };

        //take the last card in the deck, and append it to flipped deck
        flippedDeck.appendChild(deck.lastElementChild);

    //if the deck is empty, do this instead.....
    }else {
        //while the flipped deck has anything in it, loop through it, and do this to each card.....
        while (flippedDeck.children.length > 0){
            //change the class name of the first card in the flipped deck to 'unknown-card'
            flippedDeck.lastElementChild.classList.remove('flipped-card');
            flippedDeck.lastElementChild.className += ' unknown-card';
            //remove the attribute (draggable) from the first card in the flipped deck
            // flippedDeck.firstElementChild.style.webkitUserDrag = 'none';
            flippedDeck.lastElementChild.setAttribute('draggable', false);
            //append the first card in the flipped deck back to the deck
            deck.appendChild(flippedDeck.lastElementChild);
        };
    };
    //remove white space in empty div so it registers as empty and applys relative stylings
    if(deck.children.length < 1){
        deck.innerHTML = '';
    }
    //removes overlay div's class name to enable click events
    setTimeout(() => {overlay.className = ''}, 400);
    

});



flippedDeck.addEventListener('click', () => {
    //grabbing the overlay element in the dom
    let overlay = document.getElementById('overlay');
    //setting overlay class to apply style to disable multiple click events
    overlay.className = 'overlay';

    if(flippedDeck.children.length > 0){
        flippedDeck.lastElementChild.classList.remove('flipped-card');
        flippedDeck.lastElementChild.className += ' unknown-card';
        // flippedDeck.lastElementChild.style.webkitUserDrag = 'none';
        flippedDeck.lastElementChild.setAttribute('draggable', false);
        deck.appendChild(flippedDeck.lastElementChild);
        if(flippedDeck.children.length > 0){
            //flippedDeck.lastElementChild.style.webkitUserDrag = 'element';
            flippedDeck.lastElementChild.setAttribute('draggable', true);
        };
    };
    //removes overlay div's class name to enable click events
    setTimeout(() => {overlay.className = ''}, 400);
});


function dragStart () {
    this.classList.add('dragging');
    var grabbedCard = document.querySelector('.dragging');
    let holdingDiv = document.getElementById('holding-div');

    if(grabbedCard.parentElement.classList.contains('cards-bottom')){
        if(grabbedCard.nextElementSibling !== null){
            while(grabbedCard.nextElementSibling !== null){
                holdingDiv.appendChild(grabbedCard.nextElementSibling);
            };
        };
    };


};


function dragEnd () {
    let dragging = document.querySelector('.dragging');
    dragging.classList.remove('dragging');

    function sortCards(cardValue){
        for(let i = 0; i < holdingDiv.children.length; i++){
            if(holdingDiv.children[i].innerHTML == cardValue){
                dragging.parentElement.appendChild(holdingDiv.children[i]);
            };
        };
    
    };

    let holdingDiv = document.getElementById('holding-div');
    if(holdingDiv.children.length > 0){
        while(holdingDiv.children.length > 0){
            sortCards('K');
            sortCards('Q');
            sortCards('J');
            sortCards('10');
            sortCards('9');
            sortCards('8');
            sortCards('7');
            sortCards('6');
            sortCards('5');
            sortCards('4');
            sortCards('3');
            sortCards('2');
        };
    };

};

var aceStack = document.getElementsByClassName('ace-stack');
var cardStacks = document.getElementsByClassName('cards-bottom');


for(let i = 0; i < cardStacks.length; i++){

    cardStacks[i].addEventListener('drop', ()=>{

        let dragging = document.querySelector('.dragging');
        if(cardStacks[i].children.length == 0){
            if(dragging.innerHTML == 'K'){
                cardStacks[i].appendChild(dragging);
            };
        }else if(cardStacks[i].lastElementChild.innerHTML == 'K'){
            cardCheck('Q');
        }else if(cardStacks[i].lastElementChild.innerHTML == 'Q'){
            cardCheck('J')
        }else if(cardStacks[i].lastElementChild.innerHTML == 'J'){
            cardCheck('10');
        }else if(cardStacks[i].lastElementChild.innerHTML == '10'){
            cardCheck('9');
        }else if(cardStacks[i].lastElementChild.innerHTML == '9'){
            cardCheck('8');
        }else if(cardStacks[i].lastElementChild.innerHTML == '8'){
            cardCheck('7');
        }else if(cardStacks[i].lastElementChild.innerHTML == '7'){
            cardCheck('6');
        }else if(cardStacks[i].lastElementChild.innerHTML == '6'){
            cardCheck('5');
        }else if(cardStacks[i].lastElementChild.innerHTML == '5'){
            cardCheck('4');
        }else if(cardStacks[i].lastElementChild.innerHTML == '4'){
            cardCheck('3');
        }else if(cardStacks[i].lastElementChild.innerHTML == '3'){
            cardCheck('2');
        };


        function cardCheck(cardValue){
            if(dragging.innerHTML == cardValue){
                if(cardStacks[i].lastElementChild.style.color == 'red' && dragging.style.color == 'black'){

                    cardStacks[i].appendChild(dragging);

                }else if(cardStacks[i].lastElementChild.style.color == 'black' && dragging.style.color == 'red'){
                    cardStacks[i].appendChild(dragging);
                };
            };

            function sortCards(cardValue){
                for(let i = 0; i < holdingDiv.children.length; i++){
                    if(holdingDiv.children[i].innerHTML == cardValue){
                        dragging.parentElement.appendChild(holdingDiv.children[i]);
                    };
                };
            
            };
        
            let holdingDiv = document.getElementById('holding-div');
            if(holdingDiv.children.length > 0){
                while(holdingDiv.children.length > 0){
                    sortCards('K');
                    sortCards('Q');
                    sortCards('J');
                    sortCards('10');
                    sortCards('9');
                    sortCards('8');
                    sortCards('7');
                    sortCards('6');
                    sortCards('5');
                    sortCards('4');
                    sortCards('3');
                    sortCards('2');
                };
            };
            
            if(flippedDeck.firstElementChild != null){
                // flippedDeck.lastElementChild.style.webkitUserDrag = 'element';
                flippedDeck.lastElementChild.setAttribute('draggable', true);
            };
            
                    
        };

        for(let i = 0; i < cardStacks.length; i++){
            if(cardStacks[i].children.length >= 1){
                if(cardStacks[i].lastElementChild.classList.contains('unknown-cards')){
                    if(cardStacks[i].firstElementChild.hasChildNodes()){
                        cardStacks[i].firstElementChild.lastElementChild.classList.remove('unknown-card');
                        cardStacks[i].firstElementChild.lastElementChild.className += ' flipped-card';
                        // cardStacks[i].firstElementChild.lastElementChild.style.webkitUserDrag = 'element';
                        cardStacks[i].firstElementChild.lastElementChild.setAttribute('draggable', true);
                        cardStacks[i].appendChild(cardStacks[i].firstElementChild.lastElementChild);
                        if(cardStacks[i].firstElementChild.children.length == 0){
                            cardStacks[i].removeChild(cardStacks[i].firstElementChild);
                        };
                    }else if(cardStacks[i].firstElementChild.children < 1){
                        cardStacks[i].removeChild(cardStacks[i].firstElementChild);
                    };

                };
            };
           
        }

    });

};


for(let i = 0; i < cardStacks.length; i++){
    cardStacks[i].addEventListener('dragover', e =>{
        e.preventDefault();
    });
};


for(let i = 0; i < aceStack.length; i++){
    let holdingDiv = document.getElementById('holding-div');

    aceStack[i].addEventListener('drop', ()=>{

        let dragging = document.querySelector('.dragging');
        if(holdingDiv.lastElementChild == null){
            if(aceStack[i].children.length == 0){
                if(dragging.innerHTML == 'A'){
                    aceStack[i].appendChild(dragging);
                    // aceStack[i].lastElementChild.style.webkitUserDrag = 'none';
                    aceStack[i].lastElementChild.setAttribute('draggable', false);
                };
            }else if(aceStack[i].lastElementChild.innerHTML == 'A'){
                cardCheck('2');
            }else if(aceStack[i].lastElementChild.innerHTML == '2'){
                cardCheck('3');
            }else if(aceStack[i].lastElementChild.innerHTML == '3'){
                cardCheck('4');
            }else if(aceStack[i].lastElementChild.innerHTML == '4'){
                cardCheck('5');
            }else if(aceStack[i].lastElementChild.innerHTML == '5'){
                cardCheck('6');
            }else if(aceStack[i].lastElementChild.innerHTML == '6'){
                cardCheck('7');
            }else if(aceStack[i].lastElementChild.innerHTML == '7'){
                cardCheck('8');
            }else if(aceStack[i].lastElementChild.innerHTML == '8'){
                cardCheck('9');
            }else if(aceStack[i].lastElementChild.innerHTML == '9'){
                cardCheck('10');
            }else if(aceStack[i].lastElementChild.innerHTML == '10'){
                cardCheck('J');
            }else if(aceStack[i].lastElementChild.innerHTML == 'J'){
                cardCheck('Q');
            }else if(aceStack[i].lastElementChild.innerHTML == 'Q'){
                cardCheck('K');
            };

        };

        function cardCheck(cardValue){
            if(dragging.innerHTML == cardValue){

                if(aceStack[i].lastElementChild.classList.contains('clubs') && dragging.classList.contains('clubs')){
                    aceStack[i].appendChild(dragging);
                    // aceStack[i].lastElementChild.style.webkitUserDrag = 'none'
                    aceStack[i].lastElementChild.setAttribute('draggable', false);
                }else if(aceStack[i].lastElementChild.classList.contains('diamonds') && dragging.classList.contains('diamonds')){
                    aceStack[i].appendChild(dragging);
                    // aceStack[i].lastElementChild.style.webkitUserDrag = 'none';
                    aceStack[i].lastElementChild.setAttribute('draggable', false);
                }else if(aceStack[i].lastElementChild.classList.contains('hearts') && dragging.classList.contains('hearts')){
                    aceStack[i].appendChild(dragging);
                    // aceStack[i].lastElementChild.style.webkitUserDrag = 'none';
                    aceStack[i].lastElementChild.setAttribute('draggable', false);
                }else if(aceStack[i].lastElementChild.classList.contains('spades') && dragging.classList.contains('spades')){
                    aceStack[i].appendChild(dragging);
                    // aceStack[i].lastElementChild.style.webkitUserDrag = 'none';
                    aceStack[i].lastElementChild.setAttribute('draggable', false);
                };
            };

            if(flippedDeck.firstElementChild != null){
                // flippedDeck.lastElementChild.style.webkitUserDrag = 'element';
                flippedDeck.lastElementChild.setAttribute('draggable', true);
            };
        };

        for(let i = 0; i < cardStacks.length; i++){
            if(cardStacks[i].children.length >= 1){
                if(cardStacks[i].lastElementChild.classList.contains('unknown-cards')){
                    if(cardStacks[i].firstElementChild.hasChildNodes()){
                        cardStacks[i].firstElementChild.lastElementChild.classList.remove('unknown-card');
                        cardStacks[i].firstElementChild.lastElementChild.className += ' flipped-card';
                        // cardStacks[i].firstElementChild.lastElementChild.style.webkitUserDrag = 'element';
                        cardStacks[i].firstElementChild.lastElementChild.setAttribute('draggable', true);
                        cardStacks[i].appendChild(cardStacks[i].firstElementChild.lastElementChild);
                        if(cardStacks[i].firstElementChild.children.length == 0){
                            cardStacks[i].removeChild(cardStacks[i].firstElementChild);
                        };
                    }else if(cardStacks[i].firstElementChild.children < 1){
                        cardStacks[i].removeChild(cardStacks[i].firstElementChild);
                    };

                };
            };
           
        }

    });

};


for(let i = 0; i < aceStack.length; i++){
    aceStack[i].addEventListener('dragover', e =>{
        e.preventDefault();
    });
};
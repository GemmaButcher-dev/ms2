// Game logic

//Declare Game Variables
let amountOfQuestions;
let correctAnswer;
let answersCorrect = 0;
let timer;
const TIMER_DURATION = 10;

// Declare game shuffling 
let shuffledGameData;

// Get the modal to pop up
let modal = document.getElementById('answerModal');
let modalMessage = document.getElementById('modal-message');

// Superman mode - game trigger
let startSuperman = document.getElementById('start-superman');

// batman mode - game trigger
let startBatman = document.getElementById('start-batman');

// wonderwoman mode - game trigger
let startWonderwoman = document.getElementById('start-wonderwoman');

// start superman game
function triviaSuperman() {

    //disable superman start button
    startSuperman.disabled = true;
    startBatman.disabled = true;
    startWonderwoman = true;
}

// start batman game
function triviaBatman() {

    //disable batman start button
    startSuperman.disabled = true;
    startBatman.disabled = true;
    startWonderwoman = true;
    
}

// start wonderwoman game
function triviaWonderwoman() {

    //disable wonderwoman start button
    startSuperman.disabled = true;
    startBatman.disabled = true;
    startWonderwoman = true;
    
}

// Shuffle arrays element order
function arrayShuffle(array) {

    //copy of array
    let currentIndex = array.length, temporaryValue, randomIndex;

    //while 
    while (0 !== currentIndex) {

        //pick remaining element...
        randomIndex = Math.floor(Math.random()* currentIndex);
        currentIndex -= 1;

        // swap with current element
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
}
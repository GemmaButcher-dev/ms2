// Game logic

//Declare Game Variables
let amountOfQuestions;
let correctAnswer;
let answersCorrect = 0;
let timer;
const TIMER_DURATION = 10;

// Declare game shuffling iterator
let shuffledGameDataIterator;

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

    setTimeout(function() {
        // get data for game
        fetch('./js/game-data/superman.json')

        //parse JSON data
        .then(response => response.json())

        //create game by handling parsed data
        .then(function(game_data) {
            
            //set question amount
            amountOfQuestions = game_data.length;

            //shuffle game data order
            let shuffledGameData = arrayShuffle([...game_data]);

            // shuffled game data iterator
            shuffledGameDataIterator = shuffledGameData[Symbol.iterator]();

            //show first question
            displayNextQuestion();
        }
    }

}

// start batman game
function triviaBatman() {

    //disable batman start button
    startSuperman.disabled = true;
    startBatman.disabled = true;
    startWonderwoman = true;

    setTimeout(function() {
        // get data for game
        fetch('./js/game-data/batman.json')

        //parse JSON data
        .then(response => response.json())

        //create game by handling parsed data
        .then(function(game_data) {
            
            //set question amount
            amountOfQuestions = game_data.length;

            //shuffle game data order
            let shuffledGameData = arrayShuffle([...game_data]);

            // shuffled game data iterator
            shuffledGameDataIterator = shuffledGameData[Symbol.iterator]();

            //show first question
            displayNextQuestion();
        }
    }
    
}

// start wonderwoman game
function triviaWonderwoman() {

    //disable wonderwoman start button
    startSuperman.disabled = true;
    startBatman.disabled = true;
    startWonderwoman = true;

    setTimeout(function() {
        // get data for game
        fetch('./js/game-data/wonderwoman.json')

        //parse JSON data
        .then(response => response.json())

        //create game by handling parsed data
        .then(function(game_data) {
            
            //set question amount
            amountOfQuestions = game_data.length;

            //shuffle game data order
            let shuffledGameData = arrayShuffle([...game_data]);

            // shuffled game data iterator
            shuffledGameDataIterator = shuffledGameData[Symbol.iterator]();

            //show first question
            displayNextQuestion();
        }
    }
    
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

    return array;
}

let questionCounter = 0;

//show next question
function displayNextQuestion() {

    // increase score counter
    questionCounter++;

    if (questionCounter === 5) {
        // get next question modal button
        let nextQuestionModalButton = document.getElementById('next-question-modal-button');

        //change button text
        nextQuestionModalButton.textContent = "View Results";
    }

    startTimer();

    //get next item from shuffled data iterator
    let nextItem = shuffledGameDataIterator.next();

    //get element from game area
    let gameArea = document.getElementById('game-area');

    //display message if finished questions
    if (nextItem.done) {

        stopTimer();
    }

    document.getElementById('timer').textContent = null;
    gameArea.innerHTML = `<h1>You scored ${answersCorrect} out of ${amountOfQuestions}</h1>
                          <div class='button-container'>
                              <button id="return-home" type="button" class="game-start" aria-label="button to return to home page">
                                  Restart Quiz
                              </button>
                          </div>`;

    let returnHome = document.getElementById('return-home');
    returnHome.addEventListener('click', function() {
        setTimeout(redirectToHome, 2000);
    });

    returnHome.addEventListener('touchend', function() {
        setTimeout(redirectToHome, 2000);
    });

    return;
}

function redirectToHome() {
    // Change the current URL to the home page URL
    window.location.href = '/MS2/index.html';
}
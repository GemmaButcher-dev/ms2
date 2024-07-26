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

// shuffle answers and create html
let shuffledAnswers = arrayShuffle([...nextItem.value.answers]);
let html = generateQuestionHTML(nextItem, shuffledAnswers);
gameArea.innerHTML = html;

//add event listeners to next question and answer button
attachAnswerListeners(shuffledAnswers, nextItem);

// Generate HTML for the question and answers
function generateQuestionHTML(nextItem, shuffledAnswers) {

    // Generate the HTML for the question
    let html = `<h2>${nextItem.value.question}</h2>`;

    // Generate the HTML for the answers
    shuffledAnswers.forEach((answer, index) => {
        html += `<div><input type="radio" id="answer${index}" name="answer" value="${answer}">
                 <label for="answer${index}">${answer}</label></div>`;
    });

    // Return the generated HTML
    return html;
}

// Attach event listeners to the possible answers
function attachAnswerListeners(shuffledAnswers, nextItem) {

    // Attach event listeners to the answers
    shuffledAnswers.forEach((answer, index) => {

        // Get the answer element
        let answerElement = document.getElementById(`answer${index}`);
        answerElement.addEventListener('click', function() {
            stopTimer();

            // Display the modal with the result of the answer
            if (answer === nextItem.value.correctAnswer) {
                // Get the element
                let background = document.getElementById('modal-content');
                // Change the background image
                background.style.backgroundImage = "url('')";
                answersCorrect++;

                modalMessage.textContent = 'Correct!';
            } else {
                // Get the element
                let background = document.getElementById('modal-content');
                // Change the background image
                background.style.backgroundImage = "url('')";
                modalMessage.textContent = 'Incorrect. The correct answer was ' + nextItem.value.correctAnswer;
            }
            modal.style.display = "block";
        });
    });

}

// Attach event listener to the next question modal button
let nextQuestionModalButton = document.getElementById('next-question-modal-button');
nextQuestionModalButton.addEventListener('click', function() {
    modal.style.display = "none";
    displayNextQuestion();
});

// Start Timer function
function startTimer() {
    let timeLeft = TIMER_DURATION;
    document.getElementById('timer').classList.add('countdown');
    document.getElementById('timer').textContent = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            // Get the element
            let background = document.getElementById('modal-content');
            // Change the background image
            background.style.backgroundImage = "url('')";
            modalMessage.textContent = 'Time is up!';
            modal.style.display = "block";
        }
    }, 1000);
}

// Stop Timer function
function stopTimer() {
    clearInterval(timer);
    document.getElementById('timer').classList.remove('countdown');
}
/* jshint esversion: 6 */
// Game Logic

    //game audio
let themeAudio = new Audio('./assets/audio/hero_theme.mp3');
let audio2 = new Audio('./assets/audio/superman.mp3');
let audio3 = new Audio('./assets/audio/im_batman.mp3');
let audio4 = new Audio('./assets/audio/wonderwoman.mp3');
let audio5 = new Audio('./assets/audio/game_over.mp3');
let audio6 = new Audio('./assets/audio/snag_im_having_a_bad_day.mp3');
let audio7 = new Audio('./assets/audio/its_all_part_of_the_plan.mp3');
let audio8 = new Audio('./assets/audio/superman_intro.mp3');



    //mute audio
themeAudio.muted = true;
audio2.muted = true;
audio3.muted = true;
audio4.muted = true;
audio5.muted = true;
audio6.muted = true;
audio7.muted = true;
audio8.muted = true;

let muted = true;

let muteButton = document.getElementById('muteButton');

function toggleMute() {
   //     if muted
    muted = !muted;
    // toggle muted state for all audio elements
    themeAudio.muted = muted;
    audio2.muted = muted;
    audio3.muted = muted;
    audio4.muted = muted;
    audio5.muted = muted;
    audio6.muted = muted;
    audio7.muted = muted;
    audio8.muted = muted;
    console.log(muteButton)
    console.log(muteButton.innerHTML);
    console.log(muted);

    if (muted) {
        console.log('if branch')
        muteButton.innerHTML = '<i class="fa-solid fa-volume-high"></i><br>Sound On'
        muteButton = document.getElementById('muteButton');
    } else { 
        console.log('else branch')
        muteButton.innerHTML = '<i class="fa-solid fa-volume-high"></i><br>Sound Off'
        muteButton = document.getElementById('muteButton');
    }
}

//let muteButton = document.getElementById('muteButton');
if (muteButton) {
    muteButton.addEventListener('click', toggleMute)
}

    //Declare Game Variables
    //let correctAnswer;
    let audio;
    let amountOfQuestions;
    let answersCorrect = 0;
    let timer;
    const TIMER_DURATION = 10;

    // Get the modal to pop up
    let modal = document.getElementById('answerModal');
    let modalMessage = document.getElementById('modal-message');

    //declare game shuffle iterator
    let shuffledGameDataIterator;

    // Superman mode - game trigger
    let startGameSuperman = document.getElementById('start-game-superman');

    startGameSuperman.addEventListener('click', triviaGameSuperman);

    startGameSuperman.addEventListener('click', function() {

        document.body.style.backgroundImage = "url('./assets/images/superman_background.jpg')";

    });

    // Batman mode - game trigger
    let startGameBatman = document.getElementById('start-game-batman');

    startGameBatman.addEventListener('click', triviaGameBatman);

    //background change
    startGameBatman.addEventListener('click', function() {

        document.body.style.backgroundImage = "url('./assets/images/batman_background.jpg')";
    });

    // Wonderwoman mode - game trigger
    let startGameWonderwoman = document.getElementById('start-game-wonderwoman');

    startGameWonderwoman.addEventListener('click', triviaGameWonderwoman);

    //background change
    startGameWonderwoman.addEventListener('click', function() {

        document.body.style.backgroundImage = "url('./assets/images/wonderwoman_background.jpg')";
    });

// Start Superman game
function triviaGameSuperman() {

    //superman audio
    audio2.play();

    //disable startGameSuperman button
    startGameSuperman.disabled = true;
    startGameBatman.disabled = true;
    startGameWonderwoman.disabled = true;

    //start timer
    //startTimer('triviaGameSuperman');


    setTimeout(function() {
        //fetch game data
        fetch('./assets/js/game-data/superman.json')

        //parse the JSON data
        .then(response => response.json())

        //handle parsed data & create game
        .then(function(game_data) {

            //set amount of questions
            amountOfQuestions = game_data.length;

            //shuffle game data order
            let shuffledGameData = shuffleArray([...game_data]);

            //create iterator for shuffled game data
            shuffledGameDataIterator = shuffledGameData[Symbol.iterator]();

            //show first question
            displayNextQuestion();

            //store interval ID
            let intervalId;

            // play audio every 30 seconds
            intervalId = setInterval(function(){
                themeAudio.currentTime = 0;
                themeAudio.play();
            }, 30000); // 30000 milliseconds = 30 seconds

             //play audio
            themeAudio.play();

        })
        // error handling
        .catch(error => console.error('Error fetching game data:', error));
    }, 2000);
    }

// Start Batman game
function triviaGameBatman() {

    //batman audio
    audio3.play();

    //disable batman game button
    startGameSuperman.disabled = true;
    startGameBatman.disabled = true;
    startGameWonderwoman.disabled = true;

    //start timer
    //startTimer('triviaGameBatman');

    setTimeout(function() {
        //get game data
        fetch('./assets/js/game-data/batman.json')

        //parse json data
        .then(response => response.json())

        //handle parsed data & create game
        .then(function(game_data) {

            //set amount of questions
            amountOfQuestions = game_data.length;

            //shuffle game data order
            let shuffledGameData = shuffleArray([...game_data]);

            //create iterator for shuffled game data
            shuffledGameDataIterator = shuffledGameData[Symbol.iterator]();

            //show first question
            displayNextQuestion();


            //store interval ID
            let intervalId;

            // play audio every 30 seconds
            intervalId = setInterval(function(){
                themeAudio.currentTime = 0;
                themeAudio.play();
            }, 30000); // 30000 milliseconds = 30 seconds
            

            //play audio
            themeAudio.play();

        })
        //error handling
        .catch(error => console.error('Error fetching game data:', error));
        }, 2000);
    }

// Start Wonderwoman game
function triviaGameWonderwoman() {

    //wonderwoman audio
    audio4.play();

    //disable wonderwoman game button
    startGameSuperman.disabled = true;
    startGameBatman.disabled = true;
    startGameWonderwoman.disabled = true;

    //start timer
    //startTimer('triviaGameWonderwoman');

    setTimeout(function() {
        //get game data
        fetch('./assets/js/game-data/wonderwoman.json')

        //parse json data
        .then(response => response.json())

        //handle parsed data & create game
        .then(function(game_data) {

            //set amount of questions
            amountOfQuestions = game_data.length;

            //shuffle game data order
                let shuffledGameData = shuffleArray([...game_data]);

            //create iterator for shuffled game data
                shuffledGameDataIterator = shuffledGameData[Symbol.iterator]();

            //show first question
            displayNextQuestion();

            //store interval ID
            let intervalId;

            // play audio every 30 seconds
            intervalId = setInterval(function(){
                themeAudio.currentTime = 0;
                themeAudio.play();
            }, 30000); // 30000 milliseconds = 30 seconds

            //play audio
            themeAudio.play();

            //sound off event listener
            soundOffButton.addEventListener('click', function() {
                //clear interval and pause audio
                themeAudio.pause();

            });

        })
            // error handling
            .catch(error => console.error('Error fetching game data:', error));
        }, 2000);
    }

// Shuffle arrays element order
function shuffleArray(array) {

    //create copy of array
    let currentIndex = array.length, temporaryValue, randomIndex;

    //while elements are left to shuffle
    while (0 !== currentIndex) {

        //pick remaining element
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        //swap with current element
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    
    return array;
}

let questionCounter = 0;

//show next question
function displayNextQuestion() {

    //increment score counter
    questionCounter++;

    if (questionCounter === 5) {
        //get next question modal button
        let nextQuestionModalButton = document.getElementById('next-question-modal-button');

        //change button text
        nextQuestionModalButton.textContent = "See Your Score";
    }

    startTimer();

    //get next item from shuffled data iterator
    let nextItem = shuffledGameDataIterator.next();

    //get element from game area
    let gameArea = document.getElementById('game-area');

    //show message when finished questions
    if (nextItem.done) {

        stopTimer();
        themeAudio.pause();

        themeAudio.currentTime = 0;

        let imageSrc;

        if (answersCorrect >= 3 && answersCorrect !=5) {
            audio7.play();
            imageSrc = './assets/images/joker.jpg';
        } else if (answersCorrect === 5) {
            audio8.play();
            imageSrc = './assets/images/superman_1.jpg';
        } else {
            audio6.play();
            imageSrc = './assets/images/lex_luther.jpg';
        }

        document.getElementById('timer').textContent = null;
        gameArea.innerHTML = `<h1>You scored ${answersCorrect} out of ${amountOfQuestions}</h1>
                              <img src="${imageSrc}" alt="result image" class="result-image">
                              <div class='button-container'>
                                  <button id="return-home" type="button" class="game-start" aria-label="button to return to home page">
                                      Restart Quiz
                                  </button>
                              </div>`;

        let returnHome = document.getElementById('return-home');
        returnHome.addEventListener('click', function() {
            audio5.play();
            setTimeout(redirectToHome, 4000);
        });
                      
        returnHome.addEventListener('touchend', function() {
            audio5.play();
            setTimeout(redirectToHome, 4000);
        });
            
        return;
    }

    function redirectToHome() {
        //change url to home url
        window.location.href = './index.html';
    }
    //shuffle answers & generate html
    let shuffledAnswers = shuffleArray([...nextItem.value.answers]);
    let html = generateQuestionHTML(nextItem, shuffledAnswers);
    gameArea.innerHTML = html;

    //next question and answers event listeners
    attachAnswerListeners(shuffledAnswers, nextItem);

}


//generate html for the question and answers
function generateQuestionHTML(nextItem, shuffledAnswers) {

    //generate html for question
    let html = `<h2>${nextItem.value.question}</h2>`;

    //generate html for answers
    shuffledAnswers.forEach((answer, index) => {
        html += `<div><input type="radio" id="answer${index}" name="answer" value="${answer}"></input>
                <label for="answer${index}">${answer}</label></div>`;
    });

    //return the generated html
    return html;
}

//attach answer event listeners
function attachAnswerListeners(shuffledAnswers, nextItem) {

    //add answer event listeners
    shuffledAnswers.forEach ((answer, index) => {

        //get answer Element
        let answerElement = document.getElementById(`answer${index}`);
        answerElement.addEventListener('click', function() {
            stopTimer();

            // show modal with answer result
            if (answer === nextItem.value.correctAnswer) {
                 //get element
                let background = document.getElementById('modal-content');
                //change background image
                background.style.backgroundImage = "url('./assets/images/superman_1.jpg')";
                answersCorrect++;

                modalMessage.textContent = 'Correct!';
                } else {
                    //get element
                    let background = document.getElementById('modal-content');
                    //change background image
                    background.style.backgroundImage = "url('./assets/images/joker.jpg')";
                    modalMessage.textContent = 'Incorrect. The correct answer was ' + nextItem.value.correctAnswer;
                }
                modal.style.display = "block";
            });
        });
    }
  
// add event listener to next question modal button
let nextQuestionModalButton = document.getElementById('next-question-modal-button');
nextQuestionModalButton.addEventListener('click', function() {
    modal.style.display = "none";
    displayNextQuestion();
});

//start timer function
function startTimer() {
    let timeLeft = TIMER_DURATION;
    //const timerElement = document.getElementById('timer');
    document.getElementById('timer').classList.add('countdown');
    document.getElementById('timer').textContent = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            // get element
            let background = document.getElementById('modal-content');
            //change background image
            background.style.backgroundImage =  "url('./assets/images/lex_luther.jpg')";
            modalMessage.textContent = 'Time is up!';
            modal.style.display = "block";
        }
    }, 1000);
}

//stop timer
function stopTimer() {
    clearInterval(timer);
    document.getElementById('timer').classList.remove('countdown');
}

// update date year when loaded function

function updateDate() {
    // Get the current date
    const today = new Date();

    // Format the date (e.g., Year)
    const formattedDate = today.toLocaleDateString('en-US', {
        year: 'numeric',
    });

    // Find the element by its ID and update its content
    document.getElementById('current-date').textContent = formattedDate;
}

// Call the function to update the date on page load
document.addEventListener('DOMContentLoaded', updateDate);

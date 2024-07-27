document.addEventListener('DOMContentLoaded', (event) => {
    //Declare Game Variables
    let amountOfQuestions;
    let correctAnswer;
    let answersCorrect = 0;
    let timer;
    const TIMER_DURATION = 10;
    let shuffledGameDataIterator;

    // Get the modal to pop up
    let modal = document.getElementById('answerModal');
    let modalMessage = document.getElementById('modal-message');

    // Superman mode - game trigger
    let startSuperman = document.getElementById('start-superman');

    // Batman mode - game trigger
    let startBatman = document.getElementById('start-batman');

    // Wonderwoman mode - game trigger
    let startWonderwoman = document.getElementById('start-wonderwoman');

    // Event listeners for buttons

    //oldcode
    //startSuperman.addEventListener('click', triviaSuperman);
    //startBatman.addEventListener('click', triviaBatman);
    //startWonderwoman.addEventListener('click', triviaWonderwoman); 

    //new listeners code
    document.getElementById('start-superman').addEventListener('click', function() {
        document.body.style.backgroundImage = "url('./assets/images/superman-background.jpg')";
        triviaSuperman();
    });

    document.getElementById('start-batman').addEventListener('click', function() {
        document.body.style.backgroundImage = "url('./assets/images/batman-background.jpg')";
        triviaBatman();
    });

    document.getElementById('start-wonderwoman').addEventListener('click', function() {
        document.body.style.backgroundImage = "url('./assets/images/wonderwoman-background.jpg')";
        triviaWonderwoman();
    });

    // Start Superman game
    function triviaSuperman() {
        startSuperman.disabled = true;
        startBatman.disabled = true;
        startWonderwoman.disabled = true;

        setTimeout(function() {
            fetch('./js/game-data/superman.json')
                .then(response => response.json())
                .then(function(game_data) {
                    amountOfQuestions = game_data.length;
                    let shuffledGameData = arrayShuffle([...game_data]);
                    shuffledGameDataIterator = shuffledGameData[Symbol.iterator]();
                    displayNextQuestion();
                })
                .catch(error => console.error('Error fetching game data:', error));
        }, 100);
    }

    // Start Batman game
    function triviaBatman() {
        startSuperman.disabled = true;
        startBatman.disabled = true;
        startWonderwoman.disabled = true;

        setTimeout(function() {
            fetch('./js/game-data/batman.json')
                .then(response => response.json())
                .then(function(game_data) {
                    amountOfQuestions = game_data.length;
                    let shuffledGameData = arrayShuffle([...game_data]);
                    shuffledGameDataIterator = shuffledGameData[Symbol.iterator]();
                    displayNextQuestion();
                })
                .catch(error => console.error('Error fetching game data:', error));
        }, 100);
    }

    // Start Wonderwoman game
    function triviaWonderwoman() {
        startSuperman.disabled = true;
        startBatman.disabled = true;
        startWonderwoman.disabled = true;

        setTimeout(function() {
            fetch('./js/game-data/wonderwoman.json')
                .then(response => response.json())
                .then(function(game_data) {
                    amountOfQuestions = game_data.length;
                    let shuffledGameData = arrayShuffle([...game_data]);
                    shuffledGameDataIterator = shuffledGameData[Symbol.iterator]();
                    displayNextQuestion();
                })
                .catch(error => console.error('Error fetching game data:', error));
        }, 100);
    }

    // Shuffle arrays element order
    function arrayShuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }
//show next question
    function displayNextQuestion() {

        //increment score counter
        questionCounter++;

        if (questionCounter === 5) {
            //get next question button
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
                setTimeout(redirectToHome, 2000);
            });
                      
            returnHome.addEventListener('touchend', function() {
            setTimeout(redirectToHome, 2000);
            });
            
            return;
        }

        function redirectToHome() {
            //change url to home url
            window.location.href = '/MS2/index.html';
        }
        //shuffle answers & generate html
        let shuffledAnswers = arrayShuffle([...nextItem.value.answers]);
        let html = generateQuestionHTML(nextItem, shuffledAnswers);
        gameArea.innerHTML = html;

        //next question and answers event listeners
        attachAnswerListeners(shuffledAnswers, nextItem);

    }


       // let questionHTML = generateQuestionHTML(nextItem.value);
        //gameArea.innerHTML = questionHTML;

        //attachAnswerListeners(nextItem.value);
       // startTimer();

       //generate html for the question and answers
    function generateQuestionHTML(nextItem, shuffledAnswers) {

        //generate html for question
        let html = `<h2>${nextItem.value.question}</h2>`;

        //generate html for answers
        shuffledAnswers.forEach((answer, index) => {
        html += <div><input type="radio" id="answer${index}" name="answer" value="${answer}"></input>
        <label for="answer${index}">${answer}</label></div>
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
                    background.style.backgroundImage = "url('')";
                    answersCorrect++;

                    modalMessage.textContent = 'Correct!';
                } else {
                    //get element
                    let background = document.getElementById('modal-content');
                    //change background image
                    background.style.backgroundImage = "url('')";
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
        document.getElementById('timer').classList.add('countdown');
        document.getElementById('timer').textContent = timeLeft;

        timer = setInterval(() => {
            timeLeft--;
            document.getElementById('timer').textContent = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(timer);
                // get element
                let background = document.getElementById('modal-content');
                background.style.backgroundImage =  "url('')";
                modalMessage.textContent = 'Time is up!';
                modal.style.display = "block";
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timer);
        document.getElementById('timer').classList.remove('countdown');
    }
})
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

    function displayNextQuestion() {
        let nextItem = shuffledGameDataIterator.next();
        if (nextItem.done) {
            showResults();
            return;
        }

        let gameArea = document.getElementById('game-area');
        let questionHTML = generateQuestionHTML(nextItem.value);
        gameArea.innerHTML = questionHTML;

        attachAnswerListeners(nextItem.value);
        startTimer();
    }

    function generateQuestionHTML(questionData) {
        let html = `<h2>${questionData.question}</h2>`;
        questionData.answers.forEach((answer, index) => {
            html += `<div><input type="radio" id="answer${index}" name="answer" value="${answer}">
                     <label for="answer${index}">${answer}</label></div>`;
        });
        return html;
    }

    function attachAnswerListeners(questionData) {
        questionData.answers.forEach((answer, index) => {
            let answerElement = document.getElementById(`answer${index}`);
            answerElement.addEventListener('click', function() {
                checkAnswer(answer, questionData.correctAnswer);
            });
        });
    }

    function checkAnswer(selectedAnswer, correctAnswer) {
        stopTimer();
        if (selectedAnswer === correctAnswer) {
            answersCorrect++;
            showModal('Correct!', '');
        } else {
            showModal('Incorrect', `The correct answer was ${correctAnswer}`);
        }
    }

    function showModal(message, additionalMessage) {
        modalMessage.textContent = `${message} ${additionalMessage}`;
        modal.style.display = "block";
    }

    function startTimer() {
        let timeLeft = TIMER_DURATION;
        document.getElementById('timer').classList.add('countdown');
        document.getElementById('timer').textContent = timeLeft;

        timer = setInterval(() => {
            timeLeft--;
            document.getElementById('timer').textContent = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(timer);
                showModal('Time is up!', '');
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timer);
        document.getElementById('timer').classList.remove('countdown');
    }
})
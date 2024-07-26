document.addEventListener('DOMContentLoaded', (event) => {
    // Declare Game Variables
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

    // Wonder Woman mode - game trigger
    let startWonderwoman = document.getElementById('start-wonderwoman');

    // Event listeners for buttons
    startSuperman.addEventListener('click', triviaSuperman);
    startBatman.addEventListener('click', triviaBatman);
    startWonderwoman.addEventListener('click', triviaWonderwoman);

    // Question data for each superhero
    const supermanQuestions = [
        { question: "What is Superman's real name?", answers: ["Clark Kent", "Bruce Wayne", "Peter Parker", "Tony Stark"], correctAnswer: "Clark Kent" },
        { question: "Which planet is Superman from?", answers: ["Earth", "Krypton", "Mars", "Venus"], correctAnswer: "Krypton" },
        // Add more questions as needed
    ];

    const batmanQuestions = [
        { question: "What is Batman's real name?", answers: ["Bruce Wayne", "Clark Kent", "Peter Parker", "Tony Stark"], correctAnswer: "Bruce Wayne" },
        { question: "Which city does Batman protect?", answers: ["Metropolis", "Gotham", "Central City", "Star City"], correctAnswer: "Gotham" },
        // Add more questions as needed
    ];

    const wonderwomanQuestions = [
        { question: "What is Wonder Woman's real name?", answers: ["Diana Prince", "Barbara Gordon", "Natasha Romanoff", "Carol Danvers"], correctAnswer: "Diana Prince" },
        { question: "Which island is Wonder Woman from?", answers: ["Themyscira", "Atlantis", "Paradise Island", "Skull Island"], correctAnswer: "Themyscira" },
        // Add more questions as needed
    ];

    // Start Superman game
    function triviaSuperman() {
        startSuperman.disabled = true;
        startBatman.disabled = true;
        startWonderwoman.disabled = true;

        setTimeout(function() {
            startGame(supermanQuestions);
        }, 100);
    }

    // Start Batman game
    function triviaBatman() {
        startSuperman.disabled = true;
        startBatman.disabled = true;
        startWonderwoman.disabled = true;

        setTimeout(function() {
            startGame(batmanQuestions);
        }, 100);
    }

    // Start Wonder Woman game
    function triviaWonderwoman() {
        startSuperman.disabled = true;
        startBatman.disabled = true;
        startWonderwoman.disabled = true;

        setTimeout(function() {
            startGame(wonderwomanQuestions);
        }, 100);
    }

    // Common function to start game
    function startGame(gameData) {
        amountOfQuestions = gameData.length;
        let shuffledGameData = arrayShuffle([...gameData]);
        shuffledGameDataIterator = shuffledGameData[Symbol.iterator]();
        displayNextQuestion();
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

    function showResults() {
        document.getElementById('timer').textContent = null;
        let gameArea = document.getElementById('game-area');
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
    }

    function redirectToHome() {
        window.location.href = '/MS2/index.html';
    }
});

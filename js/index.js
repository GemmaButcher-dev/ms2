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
// Global variables
var startButton = document.querySelector('#start');

var startScreenWrapper = document.querySelector('#start-screen');

var questionWrapper = document.querySelector('#questions');


var endScreenWrapper = document.querySelector('#end-screen');


var submitButton = document.querySelector('#submit');


var score = document.querySelector('#final-score');

var timer = 10;

var index = 0;

var timerInterval = null;

/* ---------------------------------------*/

// function to stop quiz 
function stopQuiz () {

    clearInterval(timerInterval);

    questionWrapper.className = "hide";

    endScreenWrapper.className = "start";

    score.innerHTML = timer
}

// submit score and reset quiz
function scoreSubmitted() {

    window.location.reload();

}

function userAnswered () {

   // console.log(index);
    
    if (index == 5) {
        stopQuiz();
    }

    index++
};

function startTimer() {

    timer--;

    document.querySelector('#time').innerHTML = timer;

    if (timer == 0) {
        stopQuiz();
    };

};

// function triggered when start button clicked
function quizStarted () {

    // note to self: set start screen to hide
    startScreenWrapper.className = "hide";

    // note to self: set questions wrapper to show first question
    questionWrapper.className = "start";


    // note to self: trigger function after first question answered.
    userAnswered();

    // trigger set interval

    document.querySelector('#time').innerHTML = timer;

    // note to self: trigger timer interval pass in start timer function as argument
    timerInterval = setInterval(startTimer,1000);

};

/*----------------------------------------*/

//Event listeners

// event listener for start button
startButton.addEventListener('click', quizStarted);

// event listener on the parent
questionWrapper.addEventListener('click', userAnswered);

// event listener for score submission
submitButton.addEventListener('click', scoreSubmitted);
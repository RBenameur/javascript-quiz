// Global variables
var startButton = document.querySelector('#start');

//console.log(startButton);

var startScreenWrapper = document.querySelector('#start-screen');

//console.log(startScreenWrapper);

var questionWrapper = document.querySelector('#questions');

//console.log(questionWrapper);

var endScreenWrapper = document.querySelector('#end-screen');

//console.log(endScreenWrapper);

var submitButton = document.querySelector('#submit');

//console.log(submitButton);

var score = document.querySelector('#final-score');

//console.log(score);

var timer = 75;

var index = 0;

var timerInterval = null;

/* ---------------------------------------*/

// submit score and reset quiz
function scoreSubmitted() {

    window.location.reload();

}

function userAnswered () {
    console.log(index);
    
    if (index == 5) {

        clearInterval(timerInterval);

        questionWrapper.className = "hide";

        endScreenWrapper.className = "start";

        score.innerHTML = timer;

    }

    index++
};

function startTimer() {

    timer--;

    document.querySelector('#time').innerHTML = timer;

    if (timer < 0) {

        // note to self: clear interval timer once time reaches 0
        clearInterval(timerInterval);

        // note to self: hide question wrapper
        questionWrapper.className = "hide";

        // note to self: show end screen
        endScreenWrapper.className = "start";

        // note to self: set the score to zero
        score.innerHTML = 0;
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
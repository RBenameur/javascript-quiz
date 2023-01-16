// Global variables
var startButton = document.querySelector('#start');

var startScreenWrapper = document.querySelector('#start-screen');

var questionWrapper = document.querySelector('#questions');

var endScreenWrapper = document.querySelector('#end-screen');

var submitButton = document.querySelector('#submit');

var score = document.querySelector('#final-score');

var timer = 75;

var questionIndex = 0;

var timerInterval = null;

/* ---------------------------------------*/

// function to stop quiz 
function stopQuiz () {

    clearInterval(timerInterval);

    questionWrapper.className = "hide";

    endScreenWrapper.className = "start";

    score.innerHTML = timer;
};

// function to get highscore
function getHighscore() {

    return JSON.parse(localStorage.getItem('high-score')) || {};
};

// function to sort list of highscores in descending order 
function sortHighscore(obj) {
    var sortedArray =  Object.entries(obj).sort((a, b) => b[1] - a[1]);
    var sortedObject = Object.fromEntries(sortedArray);;
    return sortedObject;

};


// submit score and reset quiz
function scoreSubmitted() {

    // get value from initials input
    var initials = document.querySelector('#initials').value;

    // returns an object of previous highscores
    var highscore = getHighscore();

    // append 
    highscore[initials] = score.innerHTML;

    var sortedHighscore = sortHighscore(highscore);

    localStorage.setItem('high-score', JSON.stringify(sortedHighscore));

    window.location.reload();

};

// function to loop through questions and replace html with text for current question
function userAnswered () {

    var questionTitle = document.querySelector('#question-title');

    //console.log(questionTitle);

    var choicesList = document.querySelectorAll('#choices button');

   // console.log(choicesList);

    // load in questions from questions js file
    var question = questions[questionIndex];

   // console.log(question);

    questionTitle.innerHTML = question.title;

    var questionOptions = question.options;

   // console.log(questionOptions)

    // put into loop
    for (index in questionOptions) choicesList[index].innerHTML= `${index}. ${questionOptions[index]}`;
    
    if (questionIndex == 4) stopQuiz();

    questionIndex++
};

// timer 
function startTimer() {

    timer--;

    document.querySelector('#time').innerHTML = timer;

    if (timer == 0) stopQuiz();

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
// Global variables
var startButton = document.querySelector('#start');

var questionWrapper = document.querySelector('#questions');

var submitButton = document.querySelector('#submit');

var score = document.querySelector('#final-score');

var timer = 50;

var questionIndex = 0;

var timerInterval = null;


// function to stop quiz 
function stopQuiz () {

    clearInterval(timerInterval);

    questionWrapper.className = "hide";

    var endScreenWrapper = document.querySelector('#end-screen');

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

    var sortedObject = Object.fromEntries(sortedArray);

    return sortedObject;

};


// submit score and reset quiz
function scoreSubmitted() {

    var initials = document.querySelector('#initials').value;

    var highscore = getHighscore();

    highscore[initials] = score.innerHTML;

    var sortedHighscore = sortHighscore(highscore);

    localStorage.setItem('high-score', JSON.stringify(sortedHighscore));

    window.location.reload();

};


// function to check if answer was correct

function isCorrect (event) {

    var questionItem = questions[questionIndex];

    var isCorrect = questionItem.isCorrect;

    var clickedButton = event.target.innerHTML;


    if (!clickedButton.includes(isCorrect)) {

        /* play incorrect sound */

        if (timer < 10) {

            timer = 0;
            
            updateTimer(timer);

        } else {

            timer -= 10;

            updateTimer(timer);
        };

    } else {
        /*play correct sound */
    };

};

// function to loop through questions and replace html with text for current question
function userAnswered () {

    if (questionIndex < 5 && timer > 0) {

        var questionTitle = document.querySelector('#question-title');

        var choicesList = document.querySelectorAll('#choices button');

        var question = questions[questionIndex];
    
        questionTitle.innerHTML = question.title;
    
        var questionOptions = question.options;
    
        for (index in questionOptions) {

            var choice = choicesList[index];

            choice.innerHTML= `${index}. ${questionOptions[index]}`;

            choice.addEventListener('click', isCorrect);
        };

    };

    if (questionIndex < 4) questionIndex++ 

};

// update timer text

function updateTimer (timerValue) {

    document.querySelector('#time').innerHTML = timerValue;

    if (timerValue == 0) stopQuiz();
};

// timer 
function startTimer() {

    if (timer < 0) {

        timer = 0;

    } else {

        timer--;
        
    };
     
 updateTimer(timer);

};

// function triggered when start button clicked
function quizStarted (event) {

    event.stopPropagation();

    var startScreenWrapper = document.querySelector('#start-screen');
    
    startScreenWrapper.className = "hide";

    questionWrapper.className = "start";

    userAnswered();

    document.querySelector('#time').innerHTML = timer;

    timerInterval = setInterval(startTimer,1000);

};

//Event listeners

// event listener for start button
startButton.addEventListener('click', quizStarted);

// event listener for score submission
submitButton.addEventListener('click', scoreSubmitted);

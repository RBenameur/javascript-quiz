// Global variables
var startButton = document.querySelector('#start');

var startScreenWrapper = document.querySelector('#start-screen');

var questionWrapper = document.querySelector('#questions');

var endScreenWrapper = document.querySelector('#end-screen');

var submitButton = document.querySelector('#submit');

var score = document.querySelector('#final-score');

var timer = 50;

var questionIndex = 0;

var timerInterval = null;

/* ---------------------------------------*/

// function to stop quiz 
function stopQuiz (timerValue) {

   // console.log(timerValue);

    clearInterval(timerInterval);

    questionWrapper.className = "hide";

    endScreenWrapper.className = "start";

    score.innerHTML = timerValue;
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
function userAnswered (event) {

    if (questionIndex == 5) {

        timer -= 10;

        if (timer < 0) timer = 0;

        document.querySelector('#time').innerHTML = timer;
        
        stopQuiz(timer);

    } else {
 
    //console.log(questionIndex);

    var questionTitle = document.querySelector('#question-title');

    var choicesList = document.querySelectorAll('#choices button');

    // load in questions from questions js file
    var question = questions[questionIndex];

    questionTitle.innerHTML = question.title;

    var questionOptions = question.options;

    // put into loop
    for (index in questionOptions) choicesList[index].innerHTML= `${index}. ${questionOptions[index]}`;

    if (event !== undefined) {

        var isCorrect = question.isCorrect;

        var clickedButton = event.target.innerHTML;

        if (!clickedButton.includes(isCorrect)) {

           // console.log('incorrect');

            timer -= 10;

            // TEST
            startTimer(timer);
        };
        
    };
    };

    questionIndex++ 
};

// timer 
function startTimer(timerValue) {
    console.log(timerValue)
    //console.log(timer)
    //timer--;
    timerValue--;
    console.log(timerValue)
    //console.log(timer)

    //document.querySelector('#time').innerHTML = timer;

    document.querySelector('#time').innerHTML = timerValue;

    if (timerValue < 0) {

        timerValue = 0;

        stopQuiz(timerValue);
    }

};

// function triggered when start button clicked
function quizStarted (event) {

    event.stopPropagation();
    
    // note to self: set start screen to hide
    startScreenWrapper.className = "hide";

    // note to self: set questions wrapper to show first question
    questionWrapper.className = "start";


    // note to self: trigger function after first question answered.
    userAnswered();

    // trigger set interval

    document.querySelector('#time').innerHTML = timer;

    // note to self: trigger timer interval pass in start timer function as argument
    timerInterval = setInterval(startTimer(timer),1000);

};

/*----------------------------------------*/

//Event listeners

// event listener for start button
startButton.addEventListener('click', quizStarted);

// event listener on the parent
questionWrapper.addEventListener('click', userAnswered);

// event listener for score submission
submitButton.addEventListener('click', scoreSubmitted);
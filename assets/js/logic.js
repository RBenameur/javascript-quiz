// Global variables
var startButton = document.querySelector('#start');

var questionWrapper = document.querySelector('#questions');

var submitButton = document.querySelector('#submit');

var score = document.querySelector('#final-score');

var choicesList = document.querySelectorAll('#choices button span');

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

function playSound(filePath) {
    document.querySelector('#sound').innerHTML="<embed src=\""+filePath+"\" hidden=\"true\" autostart=\"true\" loop=\"false\"/>";
};


// function to check if answer was correct

function isCorrect (event) {

    var questionItem = questions[questionIndex];

    var isCorrect = questionItem.isCorrect;

    var clickedButton = event.target.innerHTML;

    if (clickedButton !== isCorrect) {

        playSound("./assets/sfx/incorrect.wav");

        if (timer < 10) {

            timer = 0;
            
            updateTimer(timer);

        } else {

            timer -= 10;

            updateTimer(timer);
        };

    } else {

        playSound("./assets/sfx/correct.wav");
        console.log('correct');
    };

    if (questionIndex == 4) {

        stopQuiz();

    } else {

        questionIndex++ 

        userAnswered();
    };
};

// function to loop through questions and replace html with text for current question
function userAnswered () {

    if (questionIndex < 5 && timer > 0) {

        var questionTitle = document.querySelector('#question-title');

        var question = questions[questionIndex];
    
        questionTitle.innerHTML = question.title;
    
        var questionOptions = question.options;
    
        for (index in questionOptions) {

            var choice = choicesList[index];

            choice.innerHTML= questionOptions[index];

        };

    };

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
function quizStarted () {

    var startScreenWrapper = document.querySelector('#start-screen');
    
    startScreenWrapper.className = "hide";

    questionWrapper.className = "start";

    userAnswered();

    document.querySelector('#time').innerHTML = timer;

    timerInterval = setInterval(startTimer,1000);

};

//Event listeners

for (choice of choicesList) choice.addEventListener('click', isCorrect);

// event listener for start button
startButton.addEventListener('click', quizStarted);

// event listener for score submission
submitButton.addEventListener('click', scoreSubmitted);

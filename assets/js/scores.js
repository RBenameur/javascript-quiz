// function to clear highscore history

function clearHistory () {

    localStorage.removeItem('high-score');

    getHighscore();

};

// function to get highscore
function getHighscore () {

    var highscore = JSON.parse(localStorage.getItem('high-score')) || {};

    var highscorelist = document.querySelector('#highscores');

    highscorelist.innerHTML = '';

    //console.log(highscore);

    for (prop in highscore) {

        var li = document.createElement('li');

        li.innerHTML = `${prop}: ${highscore[prop]}`;

        //console.log(li);

        highscorelist.appendChild(li);
    };
};


function init () {

    var clearHighscore = document.querySelector('#clear');

    getHighscore();
    
    clearHighscore.addEventListener('click', clearHistory);

};

init();
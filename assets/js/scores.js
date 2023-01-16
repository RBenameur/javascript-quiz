// function to get highscore
function getHighscore() {

    return JSON.parse(localStorage.getItem('high-score')) || {};
};


function init () {

    var highscorelist = document.querySelector('#highscores');

    highscorelist.innerHTML = '';

    var highscore = getHighscore();

    //console.log(highscore);


    for (prop in highscore) {

        var li = document.createElement('li');

        li.innerHTML = `${prop}: ${highscore[prop]}`;

        //console.log(li);

        highscorelist.appendChild(li);
    };

};

init();
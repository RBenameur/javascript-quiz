# javascript-quiz

## Description

JavaScript application to help Junior Web Developers become more familiar with multiple choice questions that could get asked during coding assessment stage of the inteviewing process.

* When start button is clicked timer starts and presents question to user
* Once current question is answered the next question is presented
* Time is deducted if question is answered incorrectly
* Score saved as time remaining on the clock
* Saves user highscore to local storage


## Installation

N/a

## Usage

[Access JavaScript Quiz application](https://rbenameur.github.io/javascript-quiz "Link to deployed github page")

In order to commence the quiz click the 'Start Quiz' button.
![Screenshot of landing page for javascript quiz](./assets/img/Landing_page.PNG "Screenshot of landing page for javascript quiz")

Click on one of the four options to answer the question. If the response is incorrect 10 seconds is deducted from the timer.
![Screenshot of quiz started](./assets/img/Quiz_started.PNG "Screenshot of quiz started")

If all questions answered incorrectly, or user runs out of time the score will be zero.
![Screenshot of finished quiz with score zero](./assets/img/Quiz_finished_score_zero.PNG "Screenshot of quiz finished with a score of zero")

If all questions answered correctly, time left on the timer is saved as the score.
![Screenshot of finished quiz with score 27](./assets/img/Quiz_finished_score_27.PNG "Screenshot of quiz finished with a score of 27")

By clicking submit, the highscore is saved to local storage and the webpage is reset to the landing page. The highscore can be viewed by clicking the 'View Highscores' link which redirects user to highscores page. The user can navigate back to the quiz or clear storage by clicking 'Go Back' or 'Clear Highscores' respectively
![Screenshot of highscore page](./assets/img/Highscore_page.PNG "Screenshot of highscore page")




## Credits

N/a

## License

Please refer to the LICENSE in the repo.

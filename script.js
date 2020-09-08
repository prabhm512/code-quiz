var start = document.querySelector('.start');
var startBtn = document.querySelector('.startBtn');
var timeEl = document.querySelector(".time");
var line = document.querySelector("hr");
var finishScreen = document.querySelector(".finish-screen");
var score = document.querySelector(".score");
var finalScore = document.querySelector(".final-score");
var submitBtn = document.querySelector(".submit");
var highscores = document.querySelector(".highscores");
var leaders = document.querySelector('.leaders');
var initial = document.querySelector("#initials");

// Questions
var qWrapper = document.querySelector('.questions');
var ques1 = document.querySelector('.question-0');
var ques2 = document.querySelector('.question-1');
var ques3 = document.querySelector('.question-2');
var ques4 = document.querySelector('.question-3');
var ques5 = document.querySelector('.question-4');
var ques6 = document.querySelector('.question-5');
var ques7 = document.querySelector('.question-6');


// Questions hidden on screen
ques1.setAttribute("style", "display:none;");
ques2.setAttribute("style", "display:none;");
ques3.setAttribute("style", "display:none;");
ques4.setAttribute("style", "display:none;");
ques5.setAttribute("style", "display:none;");
ques6.setAttribute("style", "display:none;");
ques7.setAttribute("style", "display:none;");

// Questions put in an array
var questions = [ques1, ques2, ques3, ques4, ques5, ques6, ques7];

// Array that dynamically stores the initials and scores of quiz takers
var initialsList = [];

// Time give to complete quiz
var secondsLeft = 141;

// Quiz score initial value
var quizScore =  0;

// Quiz score displayed on webpage
score.innerHTML = quizScore;

// Timer, initials screen & leaderboard hidden
timeEl.parentElement.style.display = 'none';
finishScreen.style.display = 'none';
highscores.style.display = 'none';

// On clicking start, start menu is hidden and first question is shown.
function startQues() {
    start.style.display='none';

        ques1.setAttribute("style", "display:block;")

        setTime();
        displayQuestions();

}

// Timer that counts down to 0
function setTime() {
    var timeInterval = setInterval(function () {

        // Timer shown
        timeEl.parentElement.style.display = 'block';
        secondsLeft--;
        timeEl.textContent = secondsLeft;

        if (timeEl.textContent <=20 ) {
            timeEl.setAttribute("style", "background-color: red;");
        }


        // Stop timer when time seconds left are  OR when last button of last question is disabled
        if (secondsLeft === 0 || questions[questions.length-1].querySelector("#btn-3").disabled) {
            clearInterval(timeInterval);
            

            //Function that displays final screen once time is over or questions are completed
            final();
        }
    }, 1000);
}


// Dynamically displays next question on page after one has been answered
function displayQuestions() {


    for (let i=0; i<questions.length; i++) {

        // Automates the display of question options
        let options = ".options-"+i;
        var buttons = document.querySelector(options);
        buttons.addEventListener("click", function(event) {
            event.preventDefault();

            let lines = document.createElement("hr");
            let ansOutcome = document.createElement('footer');


            if(event.target.matches("button") && i < questions.length-1) {

                // current question hidden on any option being selected 
                questions[i].setAttribute("style", "display:none;");

                // next question shown 
                questions[i+1].setAttribute("style", "display:block;");


                if (event.target.matches("button.corrBtn") === false) {
                    ansOutcome.textContent = "Wrong Answer";
                    
                }

                else {
                    ansOutcome.textContent = "Correct Answer";

                    // Quiz score incremented on correct ans
                    quizScore = quizScore+10;
                    score.innerHTML = quizScore;

                }

                // Answer outcome printed below following question
                document.querySelector(".options-"+(i+1)).append(lines);
                document.querySelector(".options-"+(i+1)).append(ansOutcome);

                // Answer outcome displayed for only 1 second
                setTimeout(function() {
                    lines.style.display = "none";
                    ansOutcome.textContent = ''; 
                    document.querySelector(".options-"+(i+1)).children[4].style.display = "none";
                }, 1000);
            }

            // if question is last question of the quiz, answer outcome printed below current question and all current question buttons disables
            else if(event.target.matches("button") && i === questions.length-1) {
                if (event.target.matches("button.corrBtn") === false) {
                    ansOutcome.textContent = "Wrong Answer";

                }

                else {
                    ansOutcome.textContent = "Correct Answer";
                    quizScore = quizScore+10;
                    score.innerHTML = quizScore;

                }

                document.querySelector(options).append(lines);
                document.querySelector(options).append(ansOutcome);

                // Disables current question buttons while answer outcome is displayed
                for (k=0; k<4; k++) {
                    questions[i].querySelector("#btn-"+k).disabled = true;
                }
                
                // Answer outcome displayed for only 1 second
                setTimeout(function() {
                    lines.style.display = "none";
                    ansOutcome.textContent = '';
                    document.querySelector(options).children[4].style.display = "none";
                    final();
                }, 1000);
            }
        })

    }
}

// Content after times runs out or last question is answered dynamically changed based on quiz score

function final() {

    ques1.setAttribute("style", "display:none;");
    ques2.setAttribute("style", "display:none;");
    ques3.setAttribute("style", "display:none;");
    ques4.setAttribute("style", "display:none;");
    ques5.setAttribute("style", "display:none;");
    ques6.setAttribute("style", "display:none;");
    ques7.setAttribute("style", "display:none;");

    finalScore.textContent = quizScore;
    finishScreen.style.display = 'block';

    if (quizScore<40) {
        document.querySelector('#impr').style.display = "block";
        document.querySelector('#excel').style.display = "none";
        finalScore.setAttribute("style", "background-color: red;");

    }

    else {
        document.querySelector('#impr').style.display = "none";
        document.querySelector('#excel').style.display = "block";
        finalScore.setAttribute("style", "background-color: lightgreen;");
    }
    
    getInitials();
}

// Highscores board dynamically changed based on who has the highest score

function leaderboard() {

    leaders.innerHTML = '';

    let swapped;

    do {
       swapped = false;
        for (i=0; i<initialsList.length; i++) {
     
            if (i-1 !== -1 && initialsList[i].score > initialsList[i-1].score) {
                let swap = initialsList[i];
                initialsList[i] = initialsList[i-1];
                initialsList[i-1] = swap;
                swapped = true;
            }
        }
    } while (swapped);

    displayLeaderboard();
}

// Highscores board rendered

function displayLeaderboard() {

    
    for (i=0; i<initialsList.length; i++) {
        var temp = initialsList;

        var li = document.createElement("li");
        li.textContent = temp[i].initial.toUpperCase() + ":";
    
        li.setAttribute('data-index', i);
    
        leaders.appendChild(li);
        li.append(' ');
        li.append(temp[i].score);

    }

}

function getInitials() {

    // Get stored initials from localStorage
    // Parsing the JSON string to an object
    var storedInitials = JSON.parse(localStorage.getItem("initialsList"));

    if (storedInitials !== null) {
        initialsList = storedInitials;
    }

    // leaderboard();
}

function storeInitials() {
    // Stringify and set "initialsList" key in localStorage to initialsList array
    localStorage.setItem("initialsList", JSON.stringify(initialsList));
}

submitBtn.addEventListener("click", function(event) {
    event.preventDefault();

    var initialText = initials.value.trim();

    if (initialText === "") {

        // Set the background of initial input box to red if left empty
        initial.setAttribute("style", "background-color: red; opacity:0.5;")
        return;
    }

    // array storing initials and scoree updated
    initialsList.push({initial: initialText, score: quizScore});

    finishScreen.textContent = '';
    timeEl.parentElement.style.display = 'none';
    highscores.style.display = 'block';


    storeInitials();
    leaderboard();
});


startBtn.addEventListener("click", startQues);

// Back to start button on highscores board
document.querySelector("#backToStart").addEventListener("click", function() {
    location.reload();
})


// Clear highscores button on highscores board
document.querySelector("#clearScores").addEventListener("click", function() {
    leaders.textContent = "";
    localStorage.clear();
})
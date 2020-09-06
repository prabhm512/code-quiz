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

ques1.setAttribute("style", "display:none;");
ques2.setAttribute("style", "display:none;");
ques3.setAttribute("style", "display:none;");
ques4.setAttribute("style", "display:none;");
ques5.setAttribute("style", "display:none;");
ques6.setAttribute("style", "display:none;");
ques7.setAttribute("style", "display:none;");

var questions = [ques1, ques2, ques3, ques4, ques5, ques6, ques7];

var initialsList = [];

var secondsLeft = 141;
var quizScore =  0;
score.innerHTML = quizScore;

timeEl.parentElement.style.display = 'none';
finishScreen.style.display = 'none';
highscores.style.display = 'none';


function startQues() {
    start.style.display='none';

        ques1.setAttribute("style", "display:block;")

        setTime();
        displayQuestions();

}

function setTime() {
    var timeInterval = setInterval(function () {
        timeEl.parentElement.style.display = 'block';
        secondsLeft--;
        timeEl.textContent = secondsLeft;

        // Stop timer when time seconds left are  OR when last button of last question is disabled
        if (secondsLeft === 0 || questions[questions.length-1].querySelector("#btn-3").disabled) {
            clearInterval(timeInterval);
            final();
        }
    }, 1000);
}

function displayQuestions() {

    for (let i=0; i<questions.length; i++) {
        let options = ".options-"+i;
        var buttons = document.querySelector(options);
        buttons.addEventListener("click", function(event) {
            event.preventDefault();

            let lines = document.createElement("hr");
            let ansOutcome = document.createElement('footer');


            if(event.target.matches("button") && i < questions.length-1) {
                questions[i].setAttribute("style", "display:none;");
                questions[i+1].setAttribute("style", "display:block;");

                if (event.target.matches("button.corrBtn") === false) {
                    ansOutcome.textContent = "Wrong Answer";
                    
                }

                else {
                    ansOutcome.textContent = "Correct Answer";
                    quizScore = quizScore+10;
                    score.innerHTML = quizScore;

                }

                document.querySelector(".options-"+(i+1)).append(lines);
                document.querySelector(".options-"+(i+1)).append(ansOutcome);
                setTimeout(function() {
                    lines.style.display = "none";
                    ansOutcome.textContent = ''; 
                    document.querySelector(".options-"+(i+1)).children[4].style.display = "none";
                }, 1000);
            }

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
                for (k=0; k<4; k++) {
                    questions[i].querySelector("#btn-"+k).disabled = true;
                }
                
                
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


function final() {

    questions[questions.length-1].style.display = "none";
    finalScore.textContent = quizScore;
    finishScreen.style.display = 'block';
    
    getInitials();
}

function leaderboard() {

    leaders.innerHTML = '';

    // for (i=1; i<initialsList.length; i++) {

    //     if (initialsList[i].score > initialsList[i-1].score) {
    //         initialsList.splice(initialsList[i-1], 0, initialsList[i]);

    //     }
    // }

    // Highscores board rendered based on what initials are entered in the input box

    for (i=0; i<initialsList.length; i++) {
        var temp = initialsList[i];

        var li = document.createElement("li");
        li.textContent = temp.initial.toUpperCase() + ":";

        li.setAttribute('data-index', i);

        leaders.appendChild(li);
        li.append(' ');
        li.append(temp.score);

    }
}

function getInitials() {

    // Get stored initials from localStorage
    // Parsing the JSON string to an object
    var storedInitials = JSON.parse(localStorage.getItem("initialsList"));

    if (storedInitials !== null) {
        initialsList = storedInitials;
    }

    leaderboard();
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

document.querySelector("#backToStart").addEventListener("click", function() {
    location.reload();
})

document.querySelector("#clearScores").addEventListener("click", function() {
    leaders.textContent = "";
    localStorage.clear();
})
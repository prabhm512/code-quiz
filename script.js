var start = document.querySelector('.start');
var startBtn = document.querySelector('.startBtn');
var questions = document.querySelector('.questions');
var ques1 = document.querySelector('.question-1');
var ques2 = document.querySelector('.question-2');
var ques3 = document.querySelector('.question-3');
var timeEl = document.querySelector(".time");
var line = document.querySelector("hr");


// var correctAns = {
//     ques1: ["baaa", "undefined", "banana", "ba aa"],
//     ques2: ["isNaN()", "nonNaN()", "NaN()", "None of the above"], 
//     ques3: ["clearInvocation()", "clearInterval", "clearInterval()", "clear()"]
// };

var questions = [ques1, ques2, ques3];

// var question1 = {
//     ques: ques1,
//     answers: ["baaa", "undefined", "banana", "ba aa"], 
//     correctAns: "banana"
// }

// var question2 = {
//     ques: ques2,
//     answers: ["isNaN()", "nonNaN()", "NaN()", "None of the above"],
//     correctAns: "isNaN()"
// }

// var question3 = {
//     ques: ques3,
//     answers: ["clearInvocation()", "clearInterval", "clearInterval()", "clear()"],
//     correctAns: "clearInterval()"
// }


ques1.setAttribute("style", "display:none;");
ques2.setAttribute("style", "display:none;");
ques3.setAttribute("style", "display:none;");

function hideStart() {
    start.textContent='';

        ques1.setAttribute("style", "display:block;"); 
        displayQuestions();
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

                }

                document.querySelector(options).append(lines);
                document.querySelector(options).append(ansOutcome);
                setTimeout(function() {
                    lines.style.display = "none";
                    ansOutcome.textContent = '';
                    document.querySelector(options).children[4].style.display = "none";
                }, 1000);
            }
        })

    }
}

startBtn.addEventListener("click", hideStart);
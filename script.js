// DOM
var timeEl = document.querySelector("#time");
var startBtn = document.querySelector("#start");
var questionsEl = document.querySelector("#questions");
var choicesEl = document.querySelector("#choices")
var initialsEl = document.querySelector("#initials")
var submitBtn = document.querySelector("#submit")

// quiz elements
var currentQuestionI= 0;
var time = questions.length * 20;
var timerID;

// start quiz
function startQuiz() {
  // hide start screen
  var startScreenEl = document.getElementById("startScreen")
  startScreenEl.setAttribute("class", "hide");

  // display question
  questionsEl.removeAttribute("class");

  // start timer
  timerID = setInterval(clock, 1000);

  // display time
  timeEl.textContent = time;

  getQuestion();
}

function getQuestion() {
  // gets current question from array
  var currentQuestion = questions[currentQuestionI];

  // display current question
  var questionDisplay = document.getElementById("insertQuestions");
  questionDisplay.textContent = currentQuestion.title;

  // clear last question choices
  choicesEl.innerHTML = "";

  // loop over choices
  currentQuestion.choices.forEach(function(choice, i) {

    // create buttons for choices
    var choiceBtn = document.createElement("button");
    choiceBtn.setAttribute("class", "choice");
    choiceBtn.setAttribute("value", choice);
    choiceBtn.textContent = i + 1 + "." + choice;

    // click event for user choice
    choiceBtn.onclick = userChoice;

    // display on page
    choicesEl.appendChild(choiceBtn);
  })
};

function userChoice () {
  // check user choice answer
  // if wrong, penalize time
  // new time display
  // display right or wrong
  // ask next question
};

function quizEnd() {
  // stop timer
  // end screen
  // final score
};

function clock() {
  // current time
};

function saveScore() {

};

startBtn.onclick = startQuiz;
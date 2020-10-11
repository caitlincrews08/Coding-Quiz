// DOM
var timeEl = document.querySelector("#time");
var startBtn = document.querySelector("#start");
var questionsEl = document.querySelector("#questions");
var choicesEl = document.querySelector("#choices");
var initialsEl = document.querySelector("#initials");
var submitBtn = document.querySelector("#submit");
var feedbackEl = document.querySelector("#feedback");

// quiz elements
var currentQuestionI= 0;
var time = questions.length * 10;
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
    choiceBtn.textContent = i + 1 + ". " + choice;

    // click event for user choice
    choiceBtn.onclick = userChoice;

    // display on page
    choicesEl.appendChild(choiceBtn);
  });
}

function userChoice () {
  // check user choice answer
  if (this.value !== questions[currentQuestionI].answer) {
    // if wrong, penalize time
    time -= 10;

    if (time <= 0) {
      time = 0;
    }

    // new time display
      timeEl.textContent = time;
      feedbackEl.textContent = "Wrong!";
      feedbackEl.style.color = "#FF5789";
      feedbackEl.style.fontSize = "200%";
  } else {
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = "#A0DE6A";
    feedbackEl.style.fontSize = "200%";
  }

  // display right/wrong
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "fb hide");
  }, 1000);

  // next question
  currentQuestionI++;
  if (currentQuestionI === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  // stop timer
  clearInterval(timerID);

  // display end screen
  var endScreenEl = document.getElementById("end");
  endScreenEl.removeAttribute("class");

  // final score
  var finalScoreEl = document.getElementById("finalScore");
  finalScoreEl.textContent = time;

  // hide questions screen
  questionsEl.setAttribute("class", "hide");
}

function clock() {
  // current time
  time--;
  timeEl.textContent = time;

  if (time <= 0) {
    quizEnd();
    timeEl.textConent = 0;
  }
}

function saveScore() {
  var initials = initialsEl.value.trim();

  if (initials !== "") {
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
    
    var newScore = {
      score: time,
      initials: initials
    };

    // save to local storage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // show highscores page
    window.location.href = "score.html";
  }
}

// start quiz
startBtn.onclick = startQuiz;

// save highscore
submitBtn.onclick = saveScore;
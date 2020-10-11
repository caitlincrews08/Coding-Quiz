

function printHighscores() {
  var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

  // sorts scores in descending order on page
  highscores.sort(function(a, b) {
    return b.score - a.score;
  });

  highscores.forEach(function(score) {
    var listTag = document.createElement("li");
    listTag.textContent = score.initials + " - " + score.score;

    var olEl = document.getElementById("highscores");
    olEl.appendChild(listTag);
  });
}

function clearHighscores() {
  window.localStorage.removeItem("highscores");
  window.location.reload();
}

document.getElementById("clear").onclick = clearHighscores;

printHighscores();
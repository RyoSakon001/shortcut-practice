var SCREENS = {
  START: "start",
  QUIZ: "quiz",
  COMPLETE: "complete",
};

var screen = SCREENS.START;
var currentIndex = 0;
var currentEdition = null;
var app = document.getElementById("app");

function getQuestions() {
  return currentEdition ? currentEdition.questions : [];
}

function render() {
  app.innerHTML = "";

  if (screen === SCREENS.START) {
    app.appendChild(renderStart());
    return;
  }

  if (screen === SCREENS.QUIZ) {
    app.appendChild(renderQuiz());
    return;
  }

  if (screen === SCREENS.COMPLETE) {
    app.appendChild(renderComplete());
  }
}

function renderStart() {
  var el = document.createElement("div");
  el.className = "screen screen--start";

  var cardsHtml = "";
  for (var i = 0; i < EDITIONS.length; i++) {
    var edition = EDITIONS[i];
    cardsHtml +=
      '<button type="button" class="edition-card" data-edition="' +
      escapeHtml(edition.id) +
      '">' +
      '<img class="edition-card__icon" src="' +
      escapeHtml(edition.icon) +
      '" alt="" width="48" height="48" />' +
      '<span class="edition-card__name">' +
      escapeHtml(edition.name) +
      "</span>" +
      '<span class="edition-card__count">' +
      edition.questions.length +
      " 問</span>" +
      "</button>";
  }

  el.innerHTML =
    '<header class="hero">' +
    '<h1 class="title">Fignny QUEST</h1>' +
    '<p class="subtitle">編を選び、表示された操作をショートカットで実行してから「進む」を押してください</p>' +
    "</header>" +
    '<div class="edition-list">' +
    cardsHtml +
    "</div>";

  var buttons = el.querySelectorAll("[data-edition]");
  for (var j = 0; j < buttons.length; j++) {
    buttons[j].addEventListener("click", function () {
      startQuiz(this.getAttribute("data-edition"));
    });
  }

  return el;
}

function renderQuiz() {
  var questions = getQuestions();
  var q = questions[currentIndex];
  var el = document.createElement("div");
  el.className = "screen screen--quiz";

  el.innerHTML =
    '<div class="quiz-header">' +
    '<img class="quiz-header__icon" src="' +
    escapeHtml(currentEdition.icon) +
    '" alt="" width="24" height="24" />' +
    '<span class="quiz-header__name">' +
    escapeHtml(currentEdition.name) +
    "</span>" +
    '<span class="progress">' +
    (currentIndex + 1) +
    " / " +
    questions.length +
    "</span>" +
    "</div>" +
    '<main class="question-area">' +
    '<p class="question">' +
    escapeHtml(q.text) +
    "</p>" +
    '<p class="hint">' +
    escapeHtml(q.hint) +
    "</p>" +
    "</main>" +
    '<nav class="nav">' +
    '<button type="button" class="btn btn--secondary" data-action="back"' +
    (currentIndex === 0 ? " disabled" : "") +
    ">戻る</button>" +
    '<button type="button" class="btn btn--primary" data-action="next">進む</button>' +
    "</nav>";

  el.querySelector('[data-action="back"]').addEventListener("click", goBack);
  el.querySelector('[data-action="next"]').addEventListener("click", goNext);
  return el;
}

function renderComplete() {
  var questions = getQuestions();
  var el = document.createElement("div");
  el.className = "screen screen--complete";
  el.innerHTML =
    '<img class="complete-icon" src="' +
    escapeHtml(currentEdition.icon) +
    '" alt="" width="56" height="56" />' +
    '<p class="complete-message">お疲れ様でした！</p>' +
    '<p class="complete-sub">' +
    escapeHtml(currentEdition.name) +
    " — 全 " +
    questions.length +
    " 問を完了しました</p>" +
    '<button type="button" class="btn btn--primary" data-action="retry">もう一度やる</button>' +
    '<button type="button" class="btn btn--secondary" data-action="menu">メニューに戻る</button>';
  el.querySelector('[data-action="retry"]').addEventListener("click", retryEdition);
  el.querySelector('[data-action="menu"]').addEventListener("click", resetToStart);
  return el;
}

function startQuiz(editionId) {
  currentEdition = getEditionById(editionId);
  if (!currentEdition) {
    return;
  }
  currentIndex = 0;
  screen = SCREENS.QUIZ;
  render();
}

function retryEdition() {
  currentIndex = 0;
  screen = SCREENS.QUIZ;
  render();
}

function goBack() {
  if (currentIndex > 0) {
    currentIndex -= 1;
    render();
  }
}

function goNext() {
  var questions = getQuestions();
  if (currentIndex < questions.length - 1) {
    currentIndex += 1;
    render();
  } else {
    screen = SCREENS.COMPLETE;
    render();
  }
}

function resetToStart() {
  screen = SCREENS.START;
  currentIndex = 0;
  currentEdition = null;
  render();
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

render();

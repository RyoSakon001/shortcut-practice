var SCREENS = {
  START: "start",
  QUIZ: "quiz",
  COMPLETE: "complete",
};

var screen = SCREENS.START;
var currentIndex = 0;
var app = document.getElementById("app");

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
  el.innerHTML =
    '<header class="hero">' +
    '<h1 class="title">ショートカット練習</h1>' +
    '<p class="subtitle">表示された操作を、ショートカットで実行してから「進む」を押してください</p>' +
    "</header>" +
    '<button type="button" class="btn btn--primary" data-action="start">スタート</button>';
  el.querySelector('[data-action="start"]').addEventListener("click", startQuiz);
  return el;
}

function renderQuiz() {
  var q = QUESTIONS[currentIndex];
  var el = document.createElement("div");
  el.className = "screen screen--quiz";

  el.innerHTML =
    '<p class="progress">' +
    (currentIndex + 1) +
    " / " +
    QUESTIONS.length +
    "</p>" +
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
  var el = document.createElement("div");
  el.className = "screen screen--complete";
  el.innerHTML =
    '<p class="complete-message">お疲れ様でした！</p>' +
    '<p class="complete-sub">全 ' +
    QUESTIONS.length +
    " 問を完了しました</p>" +
    '<button type="button" class="btn btn--primary" data-action="retry">もう一度やる</button>';
  el.querySelector('[data-action="retry"]').addEventListener("click", resetToStart);
  return el;
}

function startQuiz() {
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
  if (currentIndex < QUESTIONS.length - 1) {
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
  render();
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

render();

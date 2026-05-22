var SCREENS = {
  START: "start",
  QUIZ: "quiz",
  COMPLETE: "complete",
};

var QUIZ_MODE = {
  ALL: "all",
  UNMASTERED: "unmastered",
};

var screen = SCREENS.START;
var currentIndex = 0;
var currentEdition = null;
var quizQuestionIndices = [];
var lastQuizMode = QUIZ_MODE.ALL;
var settingsOpen = false;
var aboutOpen = false;
var modePickerOpen = false;
var pendingEditionId = null;
var modePickerMessage = "";
var app = document.getElementById("app");

function buildQuizIndices(edition, mode) {
  var indices = [];
  for (var i = 0; i < edition.questions.length; i++) {
    if (mode === QUIZ_MODE.ALL || !isMastered(edition.id, i)) {
      indices.push(i);
    }
  }
  return indices;
}

function getCurrentQuestionIndex() {
  return quizQuestionIndices[currentIndex];
}

function getSessionQuestions() {
  var list = [];
  for (var i = 0; i < quizQuestionIndices.length; i++) {
    list.push(currentEdition.questions[quizQuestionIndices[i]]);
  }
  return list;
}

function render() {
  app.innerHTML = "";

  var shell = document.createElement("div");
  shell.className = "app-shell";

  var content = document.createElement("div");
  content.className = "app-content";

  if (screen === SCREENS.START) {
    content.appendChild(renderStart());
    if (settingsOpen) {
      shell.appendChild(renderSettingsModal());
    }
    if (modePickerOpen) {
      shell.appendChild(renderModePickerModal());
    }
    if (aboutOpen) {
      shell.appendChild(renderAboutModal());
    }
  } else if (screen === SCREENS.QUIZ) {
    content.appendChild(renderQuiz());
  } else if (screen === SCREENS.COMPLETE) {
    content.appendChild(renderComplete());
  }

  shell.appendChild(content);
  app.appendChild(shell);
}

function renderStart() {
  var el = document.createElement("div");
  el.className = "screen screen--start";

  var cardsHtml = "";
  for (var i = 0; i < EDITIONS.length; i++) {
    var edition = EDITIONS[i];
    var masteredCount = countMasteredInEdition(edition);
    var total = edition.questions.length;
    var allMastered = total > 0 && masteredCount === total;
    cardsHtml +=
      '<button type="button" class="edition-card' +
      (allMastered ? " edition-card--complete" : "") +
      '" data-edition="' +
      escapeHtml(edition.id) +
      '">' +
      '<img class="edition-card__icon" src="' +
      escapeHtml(edition.icon) +
      '" alt="" width="48" height="48" />' +
      '<span class="edition-card__name">' +
      escapeHtml(edition.name) +
      (allMastered
        ? '<span class="edition-card__sakura" aria-label="全問マスター">🌸</span>'
        : "") +
      "</span>" +
      '<span class="edition-card__meta">' +
      '<span class="edition-card__count">' +
      total +
      " 問</span>" +
      '<span class="edition-card__mastered' +
      (allMastered ? " edition-card__mastered--complete" : "") +
      '">マスター ' +
      masteredCount +
      "/" +
      total +
      "</span>" +
      "</span>" +
      "</button>";
  }

  el.innerHTML =
    '<header class="hero">' +
    '<h1 class="title">Fignny QUEST</h1>' +
    '<button type="button" class="btn btn--link" data-action="about">このサイトについて</button>' +
    "</header>" +
    '<div class="edition-list">' +
    cardsHtml +
    "</div>" +
    '<div class="start-footer">' +
    '<button type="button" class="btn btn--ghost btn--sm" data-action="settings">設定</button>' +
    "</div>";

  el.querySelector('[data-action="settings"]').addEventListener("click", openSettings);
  el.querySelector('[data-action="about"]').addEventListener("click", openAbout);

  var buttons = el.querySelectorAll("[data-edition]");
  for (var j = 0; j < buttons.length; j++) {
    buttons[j].addEventListener("click", function () {
      openModePicker(this.getAttribute("data-edition"));
    });
  }

  return el;
}

function renderAboutModal() {
  var overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-labelledby", "about-title");

  overlay.innerHTML =
    '<div class="modal modal--about">' +
    '<h2 id="about-title" class="modal__title">このサイトについて</h2>' +
    '<div class="modal__body">' +
    "<p>このサイトは、<strong>フィグニーの新入社員</strong>が日々の作業をより早く、スムーズに行えるようになることを目的に作られました。</p>" +
    "<p>Chrome・VSCode・Slack など、よく使うツールのショートカットを繰り返し練習し、手が自然と動く状態——いわゆる「マスター」を目指してください。</p>" +
    "</div>" +
    '<blockquote class="modal__encourage">' +
    "小さな一歩の積み重ねが、明日のスピードになります。" +
    "焦らず、何度でも挑戦してみてください。全問マスターした編には、桜マークが咲きます 🌸" +
    "</blockquote>" +
    '<div class="modal__actions modal__actions--single">' +
    '<button type="button" class="btn btn--primary" data-action="close">閉じる</button>' +
    "</div>" +
    "</div>";

  overlay.querySelector('[data-action="close"]').addEventListener("click", closeAbout);
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) {
      closeAbout();
    }
  });

  return overlay;
}

function renderSettingsModal() {
  var overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-labelledby", "settings-title");

  overlay.innerHTML =
    '<div class="modal">' +
    '<h2 id="settings-title" class="modal__title">設定</h2>' +
    '<p class="modal__label">マスターデータ</p>' +
    '<button type="button" class="btn btn--danger btn--block" data-action="reset-mastered">マスターしたデータをリセット</button>' +
    '<p class="modal__note">データはこのブラウザにのみ保存されます</p>' +
    '<div class="modal__actions modal__actions--single">' +
    '<button type="button" class="btn btn--secondary" data-action="cancel">閉じる</button>' +
    "</div>" +
    "</div>";

  overlay.querySelector('[data-action="cancel"]').addEventListener("click", closeSettings);
  overlay
    .querySelector('[data-action="reset-mastered"]')
    .addEventListener("click", resetMasteredFromSettings);
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) {
      closeSettings();
    }
  });

  return overlay;
}

function renderModePickerModal() {
  var edition = getEditionById(pendingEditionId);
  if (!edition) {
    return document.createElement("div");
  }

  var unmasteredCount = buildQuizIndices(edition, QUIZ_MODE.UNMASTERED).length;
  var overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-labelledby", "mode-picker-title");

  overlay.innerHTML =
    '<div class="modal">' +
    '<h2 id="mode-picker-title" class="modal__title">' +
    escapeHtml(edition.name) +
    " を始める</h2>" +
    '<p class="modal__desc">出題する問題を選んでください</p>' +
    (modePickerMessage
      ? '<p class="modal__message">' + escapeHtml(modePickerMessage) + "</p>"
      : "") +
    '<div class="mode-picker">' +
    '<button type="button" class="mode-picker__btn" data-mode="unmastered">' +
    "<span class=\"mode-picker__label\">マスターしていない問題のみ</span>" +
    '<span class="mode-picker__sub">' +
    unmasteredCount +
    " 問</span>" +
    "</button>" +
    '<button type="button" class="mode-picker__btn" data-mode="all">' +
    '<span class="mode-picker__label">全問</span>' +
    '<span class="mode-picker__sub">' +
    edition.questions.length +
    " 問</span>" +
    "</button>" +
    "</div>" +
    '<div class="modal__actions modal__actions--single">' +
    '<button type="button" class="btn btn--secondary" data-action="cancel">キャンセル</button>' +
    "</div>" +
    "</div>";

  overlay.querySelector('[data-action="cancel"]').addEventListener("click", closeModePicker);
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) {
      closeModePicker();
    }
  });

  var modeButtons = overlay.querySelectorAll("[data-mode]");
  for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function () {
      beginQuiz(pendingEditionId, this.getAttribute("data-mode"));
    });
  }

  return overlay;
}

function renderQuiz() {
  var questions = getSessionQuestions();
  var questionIndex = getCurrentQuestionIndex();
  var q = questions[currentIndex];
  var mastered = isMastered(currentEdition.id, questionIndex);
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
    '<main class="question-area' +
    (mastered ? " question-area--mastered" : "") +
    '">' +
    '<div class="question-area__toolbar">' +
    '<button type="button" class="btn btn--ghost btn--sm" data-action="home">トップに戻る</button>' +
    "</div>" +
    '<label class="master-check">' +
    '<input type="checkbox" data-action="master"' +
    (mastered ? " checked" : "") +
    " />" +
    '<span class="master-check__box" aria-hidden="true"></span>' +
    '<span class="master-check__label">マスターした</span>' +
    "</label>" +
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

  el.querySelector('[data-action="master"]').addEventListener("change", function () {
    setMastered(currentEdition.id, questionIndex, this.checked);
    var area = el.querySelector(".question-area");
    if (this.checked) {
      area.classList.add("question-area--mastered");
    } else {
      area.classList.remove("question-area--mastered");
    }
  });

  el.querySelector('[data-action="home"]').addEventListener("click", resetToStart);
  el.querySelector('[data-action="back"]').addEventListener("click", goBack);
  el.querySelector('[data-action="next"]').addEventListener("click", goNext);
  return el;
}

function renderComplete() {
  var questions = getSessionQuestions();
  var el = document.createElement("div");
  el.className = "screen screen--complete";
  el.innerHTML =
    '<img class="complete-icon" src="' +
    escapeHtml(currentEdition.icon) +
    '" alt="" width="56" height="56" />' +
    '<p class="complete-message">お疲れ様でした！</p>' +
    '<p class="complete-sub">' +
    escapeHtml(currentEdition.name) +
    " — " +
    questions.length +
    " 問を完了しました</p>" +
    '<button type="button" class="btn btn--primary" data-action="retry">もう一度やる</button>' +
    '<button type="button" class="btn btn--secondary" data-action="menu">メニューに戻る</button>';
  el.querySelector('[data-action="retry"]').addEventListener("click", retryEdition);
  el.querySelector('[data-action="menu"]').addEventListener("click", resetToStart);
  return el;
}

function openSettings() {
  settingsOpen = true;
  aboutOpen = false;
  render();
}

function closeSettings() {
  settingsOpen = false;
  render();
}

function openAbout() {
  aboutOpen = true;
  settingsOpen = false;
  modePickerOpen = false;
  render();
}

function closeAbout() {
  aboutOpen = false;
  render();
}

function resetMasteredFromSettings() {
  if (
    !window.confirm(
      "マスターしたデータをすべてリセットします。よろしいですか？"
    )
  ) {
    return;
  }
  resetMasteredData();
  settingsOpen = false;
  render();
}

function openModePicker(editionId) {
  pendingEditionId = editionId;
  modePickerMessage = "";
  modePickerOpen = true;
  aboutOpen = false;
  render();
}

function closeModePicker() {
  modePickerOpen = false;
  pendingEditionId = null;
  modePickerMessage = "";
  render();
}

function beginQuiz(editionId, mode) {
  var edition = getEditionById(editionId);
  if (!edition) {
    return;
  }

  var indices = buildQuizIndices(edition, mode);
  if (indices.length === 0) {
    modePickerMessage =
      "マスターしていない問題がありません。全問を選ぶか、マスターを外してください。";
    render();
    return;
  }

  currentEdition = edition;
  quizQuestionIndices = indices;
  lastQuizMode = mode;
  currentIndex = 0;
  screen = SCREENS.QUIZ;
  modePickerOpen = false;
  pendingEditionId = null;
  modePickerMessage = "";
  settingsOpen = false;
  render();
}

function retryEdition() {
  if (!currentEdition) {
    return;
  }
  var indices = buildQuizIndices(currentEdition, lastQuizMode);
  if (indices.length === 0) {
    resetToStart();
    return;
  }
  quizQuestionIndices = indices;
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
  if (currentIndex < quizQuestionIndices.length - 1) {
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
  quizQuestionIndices = [];
  settingsOpen = false;
  aboutOpen = false;
  modePickerOpen = false;
  pendingEditionId = null;
  modePickerMessage = "";
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

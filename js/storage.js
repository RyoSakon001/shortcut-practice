var STORAGE_KEY = "fignny-quest-data";

var appData = {
  mastered: {},
};

function loadAppData() {
  try {
    var raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return;
    }
    var parsed = JSON.parse(raw);
    if (parsed.mastered && typeof parsed.mastered === "object") {
      appData.mastered = parsed.mastered;
    }
  } catch (e) {
    appData = { mastered: {} };
  }
}

function saveAppData() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      mastered: appData.mastered,
    })
  );
}

function getQuestionKey(editionId, questionIndex) {
  return editionId + ":" + questionIndex;
}

function isMastered(editionId, questionIndex) {
  return appData.mastered[getQuestionKey(editionId, questionIndex)] === true;
}

function setMastered(editionId, questionIndex, value) {
  var key = getQuestionKey(editionId, questionIndex);
  if (value) {
    appData.mastered[key] = true;
  } else {
    delete appData.mastered[key];
  }
  saveAppData();
}

function countMasteredInEdition(edition) {
  var count = 0;
  for (var i = 0; i < edition.questions.length; i++) {
    if (isMastered(edition.id, i)) {
      count += 1;
    }
  }
  return count;
}

function resetMasteredData() {
  appData.mastered = {};
  saveAppData();
}

loadAppData();

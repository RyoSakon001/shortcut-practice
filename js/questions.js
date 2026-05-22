/** 各編の問題はここに追加していく */
var EDITIONS = [
  {
    id: "chrome",
    name: "Chrome編",
    icon: "icons/chrome.png",
    questions: [
      {
        text: "新しいタブを開くショートカットを実行してください",
        hint: "⌘ + T",
      },
      {
        text: "現在のタブを閉じるショートカットを実行してください",
        hint: "⌘ + W",
      },
      {
        text: "閉じたタブを元に戻すショートカットを実行してください",
        hint: "⌘ + Shift + T",
      },
      {
        text: "アドレスバー（検索欄）にフォーカスするショートカットを実行してください",
        hint: "⌘ + L",
      },
      {
        text: "シークレットウィンドウを開くショートカットを実行してください",
        hint: "⌘ + Shift + N",
      },
    ],
  },
  {
    id: "vscode",
    name: "VSCode編",
    icon: "icons/vscode.png",
    questions: [
      {
        text: "ファイルを保存するショートカットを実行してください",
        hint: "⌘ + S",
      },
      {
        text: "クイックオープン（ファイル検索）を開くショートカットを実行してください",
        hint: "⌘ + P",
      },
      {
        text: "コマンドパレットを開くショートカットを実行してください",
        hint: "⌘ + Shift + P",
      },
      {
        text: "サイドバーの表示／非表示を切り替えるショートカットを実行してください",
        hint: "⌘ + B",
      },
      {
        text: "統合ターミナルの表示／非表示を切り替えるショートカットを実行してください",
        hint: "⌃ + `",
      },
    ],
  },
  {
    id: "slack",
    name: "Slack編",
    icon: "icons/slack.png",
    questions: [
      {
        text: "クイックスイッチャーを開くショートカットを実行してください",
        hint: "⌘ + K",
      },
      {
        text: "チャンネルを検索・移動するショートカットを実行してください",
        hint: "⌘ + Shift + K",
      },
      {
        text: "ダイレクトメッセージを検索・移動するショートカットを実行してください",
        hint: "⌘ + Shift + L",
      },
      {
        text: "新しいメッセージを作成するショートカットを実行してください",
        hint: "⌘ + N",
      },
      {
        text: "ショートカット一覧を表示するショートカットを実行してください",
        hint: "⌘ + /",
      },
    ],
  },
];

function getEditionById(id) {
  for (var i = 0; i < EDITIONS.length; i++) {
    if (EDITIONS[i].id === id) {
      return EDITIONS[i];
    }
  }
  return null;
}

/** 各編の問題はここに追加していく */
var EDITIONS = [
  {
    id: "chrome",
    name: "Chrome編",
    icon: "icons/chrome.png",
    questions: [
      {
        text: "新しいウィンドウを開くショートカットを実行してください",
        hint: "⌘ + N",
      },
      {
        text: "ウィンドウを切り替えるショートカットを実行してください",
        hint: "⌘ + `",
      },
      {
        text: "新しいタブを開くショートカットを実行してください",
        hint: "⌘ + T",
      },
      {
        text: "タブを削除するショートカットを実行してください",
        hint: "⌘ + W",
      },
      {
        text: "左のタブに移動するショートカットを実行してください",
        hint: "⌘ + Shift + ←",
      },
    ],
  },
  {
    id: "vscode",
    name: "VSCode編",
    icon: "icons/vscode.png",
    questions: [
      {
        text: "メニューバーを開閉するショートカットを実行してください",
        hint: "⌘ + B",
      },
      {
        text: "ターミナルを開閉するショートカットを実行してください",
        hint: "⌘ + J",
      },
      {
        text: "ファイル内検索のショートカットを実行してください",
        hint: "⌘ + F",
      },
      {
        text: "リポジトリ内検索のショートカットを実行してください",
        hint: "⌘ + Shift + F",
      },
      {
        text: "ウィンドウを切り替えるショートカットを実行してください",
        hint: "⌘ + `",
      },
    ],
  },
  {
    id: "slack",
    name: "Slack編",
    icon: "icons/slack.png",
    questions: [
      {
        text: "チャンネルを切り替えるショートカットを実行してください",
        hint: "⌘ + K",
      },
      {
        text: "ワークスペースを切り替えるショートカットを実行してください",
        hint: "⌘ + 1, 2, …",
      },
      {
        text: "すべて既読にするショートカットを実行してください",
        hint: "⌘ + Shift + A → Esc",
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

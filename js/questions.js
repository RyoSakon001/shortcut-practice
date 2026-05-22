/** 各編の問題はここに追加していく */
var EDITIONS = [
  {
    id: "mac",
    name: "Mac編",
    icon: "images/icon/mac.png",
    questions: [
      {
        text: "スクリーンショット（範囲選択）を撮るショートカットを実行してください",
        hint: "⌘ + Shift + 4",
      },
    ],
  },
  {
    id: "chrome",
    name: "Chrome編",
    icon: "images/icon/chrome.png",
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
    icon: "images/icon/vscode.png",
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
    icon: "images/icon/slack.png",
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
  {
    id: "spreadsheet",
    name: "スプレッドシート編",
    icon: "images/icon/spreadsheet.png",
    questions: [
      {
        text: "行全体を選択するショートカットを実行してください",
        hint: "Shift + Space",
      },
    ],
  },
  {
    id: "ai",
    name: "AI編",
    icon: "images/icon/ai.png",
    questions: [
      {
        text: "Claude.ai で新しい会話を開始するショートカットを実行してください",
        hint: "⌘ + Shift + O",
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

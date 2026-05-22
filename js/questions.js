/** 各編の問題はここに追加していく */
var EDITIONS = [
  {
    id: "mac",
    name: "Mac編",
    icon: "images/icon/mac.png",
    questions: [
      {
        text: "離席モードにする",
        hint: "⌘ + control + Q",
      },
      // {
      //   text: "スクリーンショット（範囲選択）を撮り、クリップボードにコピー",
      //   hint: "⌘ + Shift + control + 4",
      // },
    ],
  },
  {
    id: "chrome",
    name: "Chrome編",
    icon: "images/icon/chrome.png",
    questions: [
      {
        text: "新しいタブを開く",
        hint: "⌘ + T",
      },
      {
        text: "タブを削除する",
        hint: "⌘ + W",
      },
      {
        text: "左のタブに移動する",
        hint: "⌘ + Shift + ←",
      },
      {
        text: "新しいウィンドウを開く",
        hint: "⌘ + N",
      },
      {
        text: "ウィンドウを切り替える",
        hint: "⌘ + `",
      },
    ],
  },
  {
    id: "vscode",
    name: "VSCode編",
    icon: "images/icon/vscode.png",
    questions: [
      {
        text: "メニューバーを開閉する",
        hint: "⌘ + B",
      },
      {
        text: "ターミナルを開閉する",
        hint: "⌘ + J",
      },
      // {
      //   text: "ファイル内検索の",
      //   hint: "⌘ + F",
      // },
      // {
      //   text: "リポジトリ内検索の",
      //   hint: "⌘ + Shift + F",
      // },
      // {
      //   text: "ウィンドウを切り替える",
      //   hint: "⌘ + `",
      // },
    ],
  },
  {
    id: "slack",
    name: "Slack編",
    icon: "images/icon/slack.png",
    questions: [
      {
        text: "チャンネルを切り替える",
        hint: "⌘ + K",
      },
      // {
      //   text: "ワークスペースを切り替える",
      //   hint: "⌘ + 1, 2, …",
      // },
      // {
      //   text: "すべて既読にする",
      //   hint: "⌘ + Shift + A → Esc",
      // },
    ],
  },
  // {
  //   id: "spreadsheet",
  //   name: "スプレッドシート編",
  //   icon: "images/icon/spreadsheet.png",
  //   questions: [
  //     {
  //       text: "行全体を選択する",
  //       hint: "Shift + Space",
  //     },
  //   ],
  // },
  // {
  //   id: "ai",
  //   name: "AI編",
  //   icon: "images/icon/ai.png",
  //   questions: [
  //     {
  //       text: "Claude.ai で新しい会話を開始する",
  //       hint: "⌘ + Shift + O",
  //     },
  //   ],
  // },
];

function getEditionById(id) {
  for (var i = 0; i < EDITIONS.length; i++) {
    if (EDITIONS[i].id === id) {
      return EDITIONS[i];
    }
  }
  return null;
}

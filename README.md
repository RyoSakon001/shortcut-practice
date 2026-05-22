# Fignny QUEST

ショートカットを実行してから「進む」で進む、練習用 Web アプリです（HTML / CSS / JavaScript のみ）。

## ローカルで開く

`index.html` をブラウザで開くか、簡易サーバーで表示します。

```bash
python3 -m http.server 8080
# http://localhost:8080
```

## 問題の追加

`js/questions.js` の `EDITIONS` に編を追加するか、既存編の `questions` 配列にオブジェクトを追加します。

```js
{
  id: "chrome",
  name: "Chrome編",
  icon: "images/icon/chrome.png",
  questions: [
    { text: "問題文", hint: "⌘ + T" },
  ],
}
```

## GitHub Pages へのデプロイ

1. リポジトリの **Settings → Pages → Build and deployment** で **Deploy from a branch** を選択
2. Branch: `main`、Folder: `/ (root)` を指定して保存
3. 公開 URL: `https://<ユーザー名>.github.io/shortcut-practice/`

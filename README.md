# ショートカット練習

ショートカットを実行してから「進む」で進む、練習用 Web アプリです（HTML / CSS / JavaScript のみ）。

## ローカルで開く

`index.html` をブラウザで開くか、簡易サーバーで表示します。

```bash
python3 -m http.server 8080
# http://localhost:8080
```

## 問題の追加

`js/questions.js` の `QUESTIONS` 配列にオブジェクトを追加します。

```js
{
  text: "問題文",
  hint: "⌘ + S",
}
```

## GitHub Pages へのデプロイ

1. リポジトリの **Settings → Pages → Build and deployment** で **GitHub Actions** を選択
2. `main` ブランチへ push すると `.github/workflows/deploy.yml` がデプロイを実行します
3. 公開 URL: `https://<ユーザー名>.github.io/shortcut-practice/`

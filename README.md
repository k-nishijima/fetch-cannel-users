# Slack APIを使ってチャンネルのメンバー名一覧を取得する
via https://qiita.com/darquro/items/53e85ce05b62cf32609e

# やりたかったこと

プライベートチャンネルのユーザー一覧を取り出して、個別にメールを送りたい（Slackの通知力が弱すぎるので(^_^;)

# 初期設定

上記@darquroさんの記事を参考に取得した値を、環境変数にセットしておく。

```
$ export SLACK_API_TOKEN=""
$ export CHANNEL_ID=""
```

# 変更した部分

試した所、プライベートチャンネルの場合、呼び出すAPIと戻り値が少しだけ違うので、その部分だけ変更しました。

# 実行

```
$ node index.js 
```

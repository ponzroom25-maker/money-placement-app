# 公開して配布する手順

このアプリはビルド不要の静的サイトです。Cloudflare Pages の「Direct Upload」はZIPを直接受け付けるため、このパッケージを使って公開できます。Direct Uploadで作ったプロジェクトは、後からGit連携方式へ切り替えられない仕様です。更新時は新しいZIPをアップロードしてください。

1. [Cloudflare Pages Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/) の手順に沿って、Cloudflareアカウントで Pages の新規プロジェクトを作成します。
2. 「Workers & Pages」→「Create application」→「Get started」→「Drag and drop your files」を選びます。
3. プロジェクト名を決め、`money-placement-app.zip` を選択して「Deploy site」を押します。
4. 発行された `*.pages.dev` のURLをスマートフォンで開き、ホーム画面への追加とオフライン起動を確認します。
5. URLをフォロワーに共有します。機種変更やブラウザーデータ消去に備えて、設定画面から定期的にバックアップするよう案内してください。

## 公開前に知っておくこと

- PagesにアップロードするのはアプリのHTML/CSS/JavaScriptだけです。家計データは含まれません。
- アプリは家計データをサーバーへ送信しません。Webサイト自体の閲覧では、ホスティング事業者に通常のアクセス情報（IPアドレス、アクセス時刻など）が見える場合があります。
- この公開URLは知っている人が誰でも開けます。アプリにログインや利用者制限はありません。
- 配布先ごとに保存領域が分かれるため、利用者同士でデータ共有はされません。
- 独自ドメインを使う場合は、Pagesプロジェクト作成後に別途設定できます。

Cloudflareの画面名や操作は変更される場合があります。最新の手順は上記の公式案内を参照してください。

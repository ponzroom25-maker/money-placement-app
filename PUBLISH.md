# 既存Vercelプロジェクトへの更新手順

現行公開URL `https://money-placement-app.vercel.app` と GitHub `ponzroom25-maker/money-placement-app` を前提にした手順です。この作業では公開操作を行っていません。変更を既定ブランチへ入れると、接続済みのVercelプロジェクトの設定によっては本番URLが自動更新されるため、必ず先にPreviewで確認します。

## 1. 変更を既定ブランチから分ける

`index.html`、`style.css`、`app.js`、`domain.js`、`sw.js` と文書類を、既定ブランチへ直接入れずに作業ブランチへコミットします。VercelのProduction Branch設定を先に確認してください。

## 2. Previewで確認する

GitHubのPull Requestまたは非本番ブランチのpushから作成されるVercel Preview URLを開きます。Vercelは連携済みGitブランチのpushやPull RequestにPreview Deploymentを作成します。Preview URLが本番URLと異なることを確認し、以下をスマートフォンとデスクトップで確認します。

- STEP1：全項目、5つの資産種類、5つの役割、30件上限、追加・編集・削除、カテゴリー合計。
- STEP2：4役割の自動集計・目標差、目的別4行・時期、現金で残す金額と候補額。
- STEP3：STEP1口座連動、3判断・件数、理由・次の行動・期限、解約前6項目の3状態、資金フロー5項目。
- 再読込後の保存、JSON書き出し、別のブラウザープロファイルでの復元、オフライン起動。
- 入力内容がリクエストとしてサーバーへ送られないこと。JSONバックアップを機密情報として扱うこと。

数値計算の自動確認は `node tests/domain.test.js` で実行できます。

## 3. 本番へ反映する

Previewを確認した後にだけ、Pull Requestを既定ブランチへマージします。VercelではProduction Branchへの変更がProduction Deploymentを作り、成功時には本番ドメインが更新されます。現在のURLを継続して使う場合、Vercel側でこのGitHubリポジトリが既存プロジェクトに接続されていること、Production Branchがどれかを確認してください。新規のVercelプロジェクトは作成しません。

PRを通さない運用なら、Vercel DashboardでPreviewを検証してから、既存プロジェクトで承認したコミット／ブランチだけを本番へ昇格します。`vercel --prod` は本番更新を直ちに起こすため、検証前に実行しないでください。

## 4. 更新後

本番URLを開き、旧キャッシュが残っていないか確認します。Service Workerのキャッシュ名はこのリビルドで更新済みです。VercelのDeployment画面から前のProduction Deploymentへ戻すこともできます。

## Vercelの参考資料

- [Deploying Git Repositories with Vercel](https://vercel.com/docs/git)：ブランチpush／Pull RequestのPreviewとProduction Branch。
- [Vercel Preview Environments](https://vercel.com/docs/deployments/environments)：Preview URLによる本番前確認。

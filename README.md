## AWS Amplify React+Vite Starter Template

This repository provides a starter template for creating applications using React+Vite and AWS Amplify, emphasizing easy setup for authentication, API, and database capabilities.

## Overview

This template equips you with a foundational React application integrated with AWS Amplify, streamlined for scalability and performance. It is ideal for developers looking to jumpstart their project with pre-configured AWS services like Cognito, AppSync, and DynamoDB.

## Features

- **Authentication**: Setup with Amazon Cognito for secure user authentication.
- **API**: Ready-to-use GraphQL endpoint with AWS AppSync.
- **Database**: Real-time database powered by Amazon DynamoDB.

## Deploying to AWS

For detailed instructions on deploying your application, refer to the [deployment section](https://docs.amplify.aws/react/start/quickstart/#deploy-a-fullstack-app-to-aws) of our documentation.

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This library is licensed under the MIT-0 License. See the LICENSE file.


## やったことメモ
- S3アクセス追加
Amplify フォルダに、
storage/　 という名前の新しいフォルダを作成し、
resource.ts　 ファイルを追加します。

npm ampx sandobox 
エラーが出たので(・・・・ amplify_CLI is not authorized to perform: ＊＊＊  　＊＊＊が不足しているポリシー )
amplify_CLIのポリシーアタッチ
  AmazonSSMReadOnlyAccess (SSM:Getするポリシー)
　AWSCloudFormationReadOnlyAccess　 (CloudFormationスタックの状態を取得ポリシー）
　AmazonS3FullAccess

ファイルを更新（npm ampx sandoboxが実行中なので、ファイルを更新すると自動再実行してくれる）
エラーが出たので
amplify_CLIのポリシーに以下のポリシー作成後アタッチ
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Effect": "Allow",
			"Action": "sts:AssumeRole",
			"Resource": [
				"arn:aws:iam::722536240299:role/cdk-*-deploy-role-*",
				"arn:aws:iam::722536240299:role/cdk-*-lookup-role-*",
				"arn:aws:iam::722536240299:role/cdk-*-file-publishing-role-*",
				"arn:aws:iam::722536240299:role/cdk-*-image-publishing-role-*"
			]
		},
        {
            "Effect": "Allow",
            "Action": "appsync:UpdateApiKey",
            "Resource": "*"
        }
	]
}

このあと、npm ampx sandbox でビルド成功　
amplify_outputs.json が更新される。

dev run 後　実行時エラー（ブラウザの開発者ツールで確認 Cognite のs3書き込み権限エラー）
s3アクセスを設定する
export const storage = defineStorage({
  ・
  ・
  ・
  access:(allow) => ({
    'upload/*':[ allow.guest.to(['read','write','delete']) ],
  })
});

この、 allow.guest は認証方式にかかわらずつかえるらしい。
書き方は頻繁に変わる様子。　次回この書き方でダメだったら、公式ドキュメント確認する。　
amplify プロジェクトの strage にドキュメントURLがあった。https://docs.amplify.aws/react/build-a-backend/storage/set-up-storage/#define-file-path-access


- 携帯からのアクセス
vite.config.ts 
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // ここが重要！
    port: 5173, // 任意のポート（デフォルトは5173）
  },
})

# Module-1: ブロックチェーン

## 1. 開発環境のセットアップ

ダウンロードしたリポジトリ内で、開発環境のセットアップを続けましょう。

> [!NOTE]
> 下記のいずれのコマンドにおいても、**`$`はコマンドライン入力であること示すため**のみに記述しているため、入力は不要です。

### 1-1. ディレクトリの移動

```sh
$ cd ./blockchain-lecture-series
```

### 1-2. Volta のインストール

パッケージバージョン管理ツール `Volta` をインストールしましょう（参考記事: [Zenn](https://zenn.dev/longbridge/articles/30c70144c97d32)）。

```sh
# バージョンを確認
$ volta --version
```

### 1-3. Node のインストール

各種スクリプト（TypeScript環境）実行用に `Node.js` をインストールしましょう。

```sh
# node(v22.15.0)をインストール
$ volta install node@22.15.0
# バージョンを確認
$ node -v
```

### 1-4. Yarn のインストール

パッケージ管理ツール `Yarn` をインストールしましょう。

```sh
# Yarn(v4.7.0)をインストール
$ volta install yarn@4.7.0
# バージョンを確認
$ yarn -v
```

### 1-5. 必要パッケージのインストール

```sh
$ yarn
```

### 1-6. Foundry のインストール

スマートコントラクト開発環境を提供する Foundry をインストールしましょう（参考記事: [Foundry](https://getfoundry.sh/introduction/installation/)）。

```sh
# foundryをインストール
$ curl -L https://foundry.paradigm.xyz | bash
# 各種ツール群 (forge, cast, anvil, and chisel) をインストール
$ foundryup
# バージョンを確認
$ forge --version
```

## 2. ローカルネットワークの立ち上げ

ローカルネットワーク上でブロックチェーンを立ち上げてみましょう。

```sh
$ yarn dev
```

## 3. スマートコントラクトのコンパイル

スマートコントラクトがコンパイル（ビルド）できるかを確認しましょう。  
コンパイルが成功したら、[./contracts/Greeting.sol](./contracts/Greeting.sol) を開いて実装内容をみてみましょう。

```sh
$ yarn compile
```

## 4. スマートコントラクトのデプロイ

2で立ち上げたローカルネットワークに対して、3の `Greeting` コントラクトをデプロイ（公開）してみましょう。

```sh
# contracts/Greeting.solをデプロイ
$ yarn deploy:greeting
```

## 5. スマートコントラクトの呼び出し

スクリプトを実行して、4でデプロイしたコントラクトの挙動を確認することができます。

```sh
# contracts/Greeting.solの各関数を呼び出すスクリプトを実行
$ yarn run:greeting
```

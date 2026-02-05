# Lecture 2: スマートコントラクト

## 1. 開発環境のセットアップ

リポジトリを用いて、開発環境のセットアップを続けましょう。

### 1-1. ディレクトリの移動

```sh
$ cd ./blockchain-lecture-series/lectures/2
```

### 1-2. Volta のインストール

パッケージバージョン管理ツール Volta をインストールしましょう（参考記事: [Zenn](https://zenn.dev/longbridge/articles/30c70144c97d32)）。

```sh
# バージョンを確認
$ volta --version
```

### 1-3. Node のインストール

各種スクリプト（TypeScript環境）実行用に Node.js をインストールしましょう。

```sh
# node(v22.15.0)をインストール
$ volta install node@22.15.0
# バージョンを確認
$ node -v
```

### 1-4. Yarn のインストール

パッケージ管理ツール Yarn をインストールしましょう。

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

## 2. スマートコントラクトのコンパイル

スマートコントラクトがコンパイル（ビルド）できるかを確認しましょう。

```sh
$ yarn compile
```

## 3. ローカルネットワークの立ち上げ

ローカルネットワーク上（外部公開されない）でブロックチェーンを立ち上げることができます。

```sh
$ yarn dev
```

## 4. スマートコントラクトのデプロイ

立ち上げたローカルネットワークに対して、指定したスマートコントラクトをデプロイしてみましょう。

```sh
# contracts/Greeting.solをデプロイ
$ yarn deploy:greeting
```

| コマンド | 説明                                  |
| -----------: | :---------------------------------------- |
|  `deploy:greeting` | `Greeting` コントラクトのデプロイ |
|  `deploy:counter` | `Counter` コントラクトのデプロイ |
|  `deploy:counterOwnable` | `CounterOwnable` コントラクトのデプロイ |
|  `deploy:counterPausable` | `CounterPausable` コントラクトのデプロイ |

## 5. コーディング演習

### 5-1. `Greeting`: Solidityに触れる

- 簡単なコントラクトをみてみる
- 簡単な関数を実装してみる

### 5-2. `Counter`: Solidityの文法を把握する

- コントラクトの構造・文法を理解する
- 簡単な関数を実装してみる

### 5-3. `CounterOwnable`: 所有可能性を理解する

- `Counter` コントラクトを拡張して所有可能性を実装してみる

### 5-4. `CounterPausable`: 停止可能性を理解する

- `CounterOwnable` コントラクトを拡張して停止可能性を実装してみる

> [!NOTE]
> 各コントラクトに対して、簡潔なスクリプトを実行して挙動を確認することができます。

> [!IMPORTANT]
> 各スクリプトの実行前に `yarn deploy-status` を実行して、コントラクトアドレスを指定しましょう。

```sh
# contracts/Greeting.solに対するスクリプトを実行
$ yarn run:greeting
```

| コマンド | 説明                                  |
| -----------: | :---------------------------------------- |
|  `run:greeting` | `Greeting` コントラクトに対するスクリプト実行 |
|  `run:counter` | `Counter` コントラクトに対するスクリプト実行 |
|  `run:counterOwnable` | `CounterOwnable` コントラクトに対するスクリプト実行 |
|  `run:counterPausable` | `CounterPausable` コントラクトに対するスクリプト実行 |

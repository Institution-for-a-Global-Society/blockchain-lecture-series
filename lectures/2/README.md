# Lecture 2

## 1. 開発環境のセットアップ

リポジトリを用いて、開発環境のセットアップを続けましょう。

```sh
# ディレクトリを移動
$ cd ./blockchain-lecture-series/lectures/2
# 必要パッケージをインストール
$ yarn
```

> [!IMPORTANT]
> 上記に加えて、TypeScript実行用にNode環境を[参考文献](https://qiita.com/282Haniwa/items/a764cf7ef03939e4cbb1)に沿って構築します。`nodenv`を用いて、Node **`v22.15.0`** をインストールしましょう。

## 2. ローカルネットワークの立ち上げ

ローカルネットワーク上（外部公開されない）でブロックチェーンを立ち上げることができます。

```sh
$ yarn dev
```

## 3. スマートコントラクトのコンパイル

スマートコントラクトがコンパイル（ビルド）できるかを確認しましょう。

```sh
$ yarn compile
```

## 4. スマートコントラクトのデプロイ

2で立ち上げたローカルネットワークに対して、指定したスマートコントラクトをデプロイしてみましょう。

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

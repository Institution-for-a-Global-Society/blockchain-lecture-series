// SPDX-License-Identifier: MIT
pragma solidity ^0.8.33;

import { Counter } from "./Counter.sol";

/// @title Sample contract for the learning purposes.
/// Topics: Inheritance, msg.sender, and ownership.
contract CounterOwnable is Counter {
    /////////////////////
    // State Variables //
    /////////////////////

    /// Owner address
    address public owner;

    ////////////
    // Events //
    ////////////

    /**
     * Emitted when contract ownership is transferred from `oldAddress` to `newAddress`.
     *
     * @param oldAddress Old owner address
     * @param newAddress New owner address
     */
    event OwnershipTransferred(address oldAddress, address newAddress);

    /**
     * Emitted when `_count` is incremented.
     */
    event CountIncremented();

    ////////////
    // Errors //
    ////////////

    /**
     * Thrown if `msg.sender` is not the contract owner.
     */
    error OnlyOwner();

    /**
     * Thrown if the supplied address is invalid (e.g., zero address).
     */
    error InvalidAddress();

    ///////////////
    // Modifiers //
    ///////////////

    // TODO #1: 呼び出しアドレスがコントラクトオーナーでなければ、`OnlyOwner`エラーを返す修飾子を実装しましょう
    // modifier onlyOwner() {}

    /////////////////
    // Constructor //
    /////////////////

    /**
     * Constructor of contract.
     *
     * @param _delta Custom delta (increment and decrement)
     */
    constructor(uint8 _delta) Counter(_delta) {
        owner = msg.sender;
    }

    ///////////////
    // Functions //
    ///////////////

    // TODO #2: increment()を、以下の実装となるようにオーバーライドしましょう（ヒント: override 修飾子を用いる）
    //          - コントラクトオーナーしか呼び出せない
    //          - DELTA ではなく、DELTA+1 を増加分とする
    //          - `CountIncremented`イベントを発火する
    // function increment() {}

    // TODO #3: コントラクトの所有権を他のアドレスに移行する関数を実装しましょう
    //          - 移行先がゼロアドレス（address(0)）であった場合は、`InvalidAddress`エラーを返す
    //          - `OwnershipTransferred`イベントを発火する
    // function transferOwnership() {}
}

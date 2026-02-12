// SPDX-License-Identifier: MIT
pragma solidity ^0.8.33;

import { IToken } from "./IToken.sol";

/// @title Sample token contract for the learning purposes.
contract Token is IToken {
    /////////////////////
    // State Variables //
    /////////////////////

    /// Token name (e.g., USD Coin)
    string public name;
    /// Token symbol (e.g., USDC)
    string public symbol;
    /// Owner address
    address public owner;
    /// Total supply
    uint256 private _totalSupply;

    ///////////////
    // Modifiers //
    ///////////////

    /**
     * Checks if `msg.sender` is the contract owner.
     */
    modifier onlyOwner() {
        if (msg.sender != owner) {
            revert OnlyOwner();
        }
        _;
    }

    /////////////////
    // Constructor //
    /////////////////

    /**
     * Constructor of contract.
     *
     * @param _name Token name
     * @param _symbol Token symbol
     */
    constructor(
        string memory _name,
        string memory _symbol
    ) {
        owner = msg.sender;
        name = _name;
        symbol = _symbol;
    }

    ///////////////
    // Functions //
    ///////////////

    // TODO: 実装すべき関数を実装しましょう（ヒント: yarn compileを実行してみる）。
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.33;

/// @title Interface for `Token` contract.
interface IToken {
    ////////////
    // Events //
    ////////////

    /**
     * Emitted when `_amount` tokens are minted.
     */
    event TokenMinted(uint256 _amount);

    /**
     * Emitted when `_amount` tokens are burned.
     */
    event TokenBurned(uint256 _amount);

    ////////////
    // Errors //
    ////////////

    /**
     * Thrown if `msg.sender` is not the contract owner.
     */
    error OnlyOwner();

    ///////////////
    // Functions //
    ///////////////

    /**
     * Returns `_totalSupply`.
     *
     * @return totalSupply Total supply
     */
    function totalSupply() external view returns (uint256);

    /**
     * Mints `_amount` tokens.
     *
     * @dev
     * - Only contract owner can call this function.
     * - Must emit `TokenMinted` event upon completion.
     *
     * @param _amount Amount of tokens to mint
     */
    function mint(uint256 _amount) external;

    /**
     * Burns `_amount` tokens.
     *
     * @dev
     * - Only contract owner can call this function.
     * - Must emit `TokenBurned` event upon completion.
     *
     * @param _amount Amount of tokens to burn
     */
    function burn(uint256 _amount) external;
}

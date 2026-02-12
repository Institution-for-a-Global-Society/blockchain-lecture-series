// SPDX-License-Identifier: MIT
pragma solidity ^0.8.33;

/// @title Interface for `ERC20` contract.
interface IERC20 {
    ////////////
    // Events //
    ////////////

    /**
     * Emitted when `_value` tokens are transferred from `_from` to `_to`.
     */
    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    /**
     * Emitted when `_value` tokens are approved for `_spender` by `_owner`.
     */
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);

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

    /**
     * Thrown if the balance of sender address is insufficient for transfer.
     */
    error InsufficientBalance();

    /**
     * Thrown if the allowance of sender address is insufficient for transfer.
     */
    error InsufficientAllowance();

    ///////////////
    // Functions //
    ///////////////

    /**
     * Returns total supply of tokens.
     *
     * @return totalSupply Total supply of tokens
     */
    function totalSupply() external view returns (uint256);

    /**
     * Returns token balance of `_owner`.
     *
     * @param _owner Owner address
     * @return balance Token balance of `_owner`
     */
    function balanceOf(address _owner) external view returns (uint256 balance);

    /**
     * Transfers `_value` tokens to `_to`.
     *
     * @dev
     * - Must throw an `InvalidAddress` error if `_to` is the zero address.
     * - Must throw an `InsufficientBalance` error if the balance of `msg.sender` is insufficient.
     * - Must emit a `Transfer` event upon completion.
     *
     * @param _to Destination address
     * @param _value Value to transfer
     * @return success True if success, false otherwise
     */
    function transfer(address _to, uint256 _value) external returns (bool success);

    /**
     * Returns the allowance of `_spender` over tokens of `_owner`.
     *
     * @param _owner Owner address
     * @param _spender Spender address
     * @return remaining Remaining allowance
     */
    function allowance(address _owner, address _spender) external view returns (uint256 remaining);

    /**
     * Approves `_spender` can use up to `_value` tokens of `msg.sender`.
     *
     * @dev
     * - Must throw an `InvalidAddress` error if `_spender` is the zero address.
     * - Must emit an `Approval` event upon completion.
     *
     * @param _spender Spender address
     * @param _value Value to approve
     * @return success True if success, false otherwise
     */
    function approve(address _spender, uint256 _value) external returns (bool success);

    /**
     * Transfers `_value` tokens from `_from` to `_to`.
     *
     * @dev
     * - Must throw an `InvalidAddress` error if `_from` or `_to` is the zero address.
     * - Must throw an `InsufficientBalance` error if the balance of `_from` is insufficient.
     * - Must throw an `InsufficientAllowance` error if the allowance of `_from` is insufficient.
     * - Must emit a `Transfer` event upon completion.
     *
     * @param _from Source address
     * @param _to Destination address
     * @param _value Value to transfer
     * @return success True if success, false otherwise
     */
    function transferFrom(address _from, address _to, uint256 _value) external returns (bool success);

    /**
     * Mints `_amount` tokens.
     *
     * @dev
     * - Must throw an `OnlyOwner` error if someone other than the contract owner calls the function.
     * - Must throw an `InvalidAddress` error if `_to` is the zero address.
     * - Must emit a `Transfer` event (`_from` = zero address) upon completion.
     *
     * @param _value Amount of tokens to mint
     * @param _to Target address
     */
    function mint(uint256 _value, address _to) external;

    /**
     * Burns `_amount` tokens.
     *
     * @dev
     * - Must throw an `OnlyOwner` error if someone other than the contract owner calls the function.
     * - Must throw an `InvalidAddress` error if `_from` is the zero address.
     * - Must emit a `Transfer` event (`_to` = zero address) upon completion.
     *
     * @param _value Value of tokens to burn
     * @param _from Target address
     */
    function burn(uint256 _value, address _from) external;
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.33;

/// @title Sample contract for the learning purposes.
/// Topics: Constructor, state (global) variables, state visibility, events, errors, and modifiers.
contract Counter {
    /////////////////////
    // State Variables //
    /////////////////////

    /// Max count
    uint8 public constant MAX_COUNT = 50;
    /// Min count
    uint8 public constant MIN_COUNT = 0;
    /// Delta of increment & decrement
    uint8 public immutable DELTA;

    /// Count
    uint8 internal _count;

    ////////////
    // Events //
    ////////////

    /**
     * Emitted when `_count` is decremented.
     */
    event CountDecremented();

    ////////////
    // Errors //
    ////////////

    /**
     * Thrown if `_count` is to be above `MAX_COUNT`.
     */
    error CountTooHigh();

    /**
     * Thrown if `_count` is to be below `MIN_COUNT`.
     */
    error CountTooLow();

    ///////////////
    // Modifiers //
    ///////////////

    /**
     * Checks if `MIN_COUNT` < `_count` < `MAX_COUNT`.
     */
    modifier onlyValidCountRange() {
        if (_count == MAX_COUNT) {
            revert CountTooHigh();
        } else if (_count == MIN_COUNT) {
            revert CountTooLow();
        }
        _;
    }

    /////////////////
    // Constructor //
    /////////////////

    /**
     * Constructor of contract.
     *
     * @param _delta Custom delta (increment and decrement)
     */
    constructor(uint8 _delta) {
        DELTA = _delta;
    }

    ///////////////
    // Functions //
    ///////////////

    /**
     * Returns `_count`.
     *
     * @return count Current count
     */
    function getCount() external view returns (uint8) {
        return _count;
    }

    /**
     * Increments `_count`.
     */
    function increment() public virtual {
        _count += DELTA;
    }

    /**
     * Increments `_count` by `_delta`.
     *
     * @param _delta Custom increment
     */
    function increment(uint8 _delta) external {
        _count += _delta;
    }

    /**
     * Increments `_count` within the fixed range.
     */
    function incrementConditional() external {
        if (_count == MAX_COUNT) {
            revert CountTooHigh();
        }
        _count += DELTA;
    }

    /**
     * Decrements `_count`.
     */
    function _decrement() private {
        _count -= DELTA;

        emit CountDecremented();
    }

    /**
     * Decrements `_count` by `_delta`.
     *
     * @param _delta Custom decrement
     */
    function decrement(uint256 _delta) external {
        _count -= uint8(_delta);

        emit CountDecremented();
    }

    /**
     * Decrements `_count` within the fixed range.
     */
    function decrementConditional() external onlyValidCountRange() {
        _decrement();
    }

    // TODO: カウントを0にリセットする関数を実装しましょう
    //       - リセット後にはイベントを発火する
    // function reset() {}
}

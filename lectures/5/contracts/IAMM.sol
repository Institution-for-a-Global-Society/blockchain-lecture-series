// SPDX-License-Identifier: MIT
pragma solidity ^0.8.33;

/// @title Interface for `AMM` contract.
interface IAMM {
    ////////////
    // Errors //
    ////////////

    /**
     * Thrown if the provided liquidity is too low to mint shares.
     */
    error InsufficientLiquidity();

    /**
     * Thrown if the provided share is too low to be burned.
     */
    error InsufficientLiquidityBurned();

    /**
     * Thrown if the provided share is larger than the current balance.
     */
    error InsufficientShare();

    ///////////////
    // Functions //
    ///////////////

    /**
     * Returns the current k.
     *
     * @return _k Constant product k
     */
    function calcK() external view returns (uint256 _k);

    /**
     * Add liquidity (token pair) to the pool.
     *
     * @param _amountX Amount of X token
     * @param _amountY Amount of Y token
     * @return _shares Minted LP tokens
     */
    function addLiquidity(
        uint256 _amountX,
        uint256 _amountY
    ) external returns (uint256 _shares);

    /**
     * Swaps tokens.
     *
     * @param _tokenIn Address of token (X or y)
     * @param _amountIn Amount of token (X or y)
     * @return _amountOut Amount to be paid back
     */
    function swap(
        address _tokenIn,
        uint256 _amountIn
    ) external returns (uint256 _amountOut);

    /**
     * Remove liquidity (token pair) from the pool.
     *
     * @param _shares Amount of shares to be burned
     * @return _amountX Amount of X token to be redeemed
     * @return _amountY Amount of Y token to be redeemed
     */
    function removeLiquidity(
        uint256 _shares
    ) external returns (uint256 _amountX, uint256 _amountY);
}

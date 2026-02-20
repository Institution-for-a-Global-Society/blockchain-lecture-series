// SPDX-License-Identifier: MIT
pragma solidity ^0.8.33;

import "@openzeppelin/contracts/utils/math/Math.sol";

import { IAMM } from "./IAMM.sol";
import { IERC20 } from "./IERC20.sol";
import { ERC20 } from "./ERC20.sol";

/// @title Sample CP-AMM contract for the learning purposes.
contract AMM is ERC20, IAMM {
    using Math for uint256;

    /////////////////////
    // State Variables //
    /////////////////////

    /// Contract address of the first token of the pair
    IERC20 public immutable X_TOKEN;
    /// Contract address of the second token of the pair
    IERC20 public immutable Y_TOKEN;

    /// x (the amount of first token of the pair)
    uint256 public x;
    /// y (the amount of second token of the pair)
    uint256 public y;

    /////////////////
    // Constructor //
    /////////////////

    /**
     * Constructor of contract.
     *
     * @param _xToken Address of X token
     * @param _yToken Address of Y token
     */
    constructor(
        address _xToken,
        address _yToken
    ) ERC20("Simple AMM", "sAMM", 18) {
        owner = msg.sender;
        X_TOKEN = IERC20(_xToken);
        Y_TOKEN = IERC20(_yToken);
    }

    ///////////////
    // Functions //
    ///////////////

    // TODO: インターフェースとコメントに沿って実装する
    /// @inheritdoc IAMM
    function calcK() public view returns (uint256 _k) {
        // k を計算して返しましょう（注意: x, y 共に 10^18 が掛けられています）
    }

    // TODO: インターフェースとコメントに沿って実装する
    /// @inheritdoc IAMM
    function addLiquidity(
        uint256 _amountX,
        uint256 _amountY
    ) external returns (uint256 _shares) {
        // 1. 発行するLPトークン量を計算しましょう（与えられたコードはそのまま）
        //    A. 流動性が存在しない（ゼロ）の場合: dx & dy の平方根（n.sqrt()を用いる）を発行LPトークン量とします
        //    B. 流動性が存在するの場合: (x + y) * dx/x と (x + y) * dy/y のうち小さい方（n.min()を用いる）を発行LPトークン量とします
        uint256 _totalSupply = totalSupply();

        if (_totalSupply == 0) {
            _shares = (_amountX * _amountY).sqrt();
        }

        // 2. 算出された発行LPトークン量がゼロ以下の場合は、`InsufficientLiquidity` エラーを返しましょう

        // 3. `transferFrom` を用いて、流動性供給者からこのコントラクトアドレスへ指定された額のトークンを送付しましょう

        // 4. x, y を更新しましょう

        // 5. 算出された量のLPトークンを流動性供給者に対して発行しましょう

        // 6. 発行したLPトークン量を返しましょう

    }

    // TODO: インターフェースとコメントに沿って実装する
    /// @inheritdoc IAMM
    function swap(
        address _tokenIn,
        uint256 _amountIn
    ) external returns (uint256 _amountOut) {
        // 1. 与えられたトークンアドレスが有効でない場合は、`InvalidAddress` エラーを返しましょう

        // 2. スワップ元のトークンを特定します（このまま）
        (IERC20 _tIn, IERC20 _tOut, uint256 _rIn, uint256 _rOut) = _tokenIn == address(X_TOKEN)
            ? (X_TOKEN, Y_TOKEN, x, y)
            : (Y_TOKEN, X_TOKEN, y, x);

        // 3. トレーダーからこのコントラクトアドレスへ指定された額のトークンを送付しましょう

        // 4. スワップ額を dy = (y * dx) / (x + dx) として計算し、トレーダーに対して送付しましょう

        // 5. x, y を更新しましょう

        // 6. 送付したトークン量を返しましょう

    }

    // TODO: インターフェースとコメントに沿って実装する
    /// @inheritdoc IAMM
    function removeLiquidity(
        uint256 _shares
    ) external returns (uint256 _amountX, uint256 _amountY) {
        // 1. LPトークン残高が不足している場合は、`InsufficientShare` エラーを返しましょう（このまま）
        if (_shares > balanceOf(msg.sender)) {
            revert InsufficientShare();
        }

        // 2. 流動性供給者に返却するトークン量を X,Y それぞれ LPトークン量 * x / (x + y)、LPトークン量 * y / (x + y) として計算しましょう

        // 3. いずれかのトークン量が0以下の場合は、`InsufficientLiquidityBurned` エラーを返しましょう

        // 4. LPトークンを焼却しましょう

        // 5. x, y を更新しましょう

        // 6. X,Y それぞれで算出した返却量を流動性供給者に送付しましょう

        // 7. 送付したトークン量を返しましょう
    }
}

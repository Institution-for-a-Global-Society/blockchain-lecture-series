// SPDX-License-Identifier: MIT
pragma solidity ^0.8.33;

import { IERC20 } from "./IERC20.sol";

/// @title Sample ERC20 contract for the learning purposes.
contract ERC20 is IERC20 {
    /////////////////////
    // State Variables //
    /////////////////////

    /// Token name (e.g., USD Coin)
    string public name;
    /// Token symbol (e.g., USDC)
    string public symbol;
    /// Token decimals (e.g., 18)
    uint8 public decimals;

    /// Owner address
    address public owner;

    /// Total supply
    uint256 private _totalSupply;
    /// Balances
    mapping (address => uint256) private _balances;
    /// Allowances
    mapping (address => mapping (address => uint256)) private _allowances;

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
     * @param _decimals Token decimals
     */
    constructor(
        string memory _name,
        string memory _symbol,
        uint8 _decimals
    ) {
        owner = msg.sender;
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
    }

    ///////////////
    // Functions //
    ///////////////

    /// @inheritdoc IERC20
    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    /// @inheritdoc IERC20
    function balanceOf(address _owner) public view returns (uint256 balance) {
        return _balances[_owner];
    }

    /// @inheritdoc IERC20
    function transfer(address _to, uint256 _value) public returns (bool success) {
        if (_to == address(0)) {
            revert InvalidAddress();
        }
        if (_balances[msg.sender] < _value) {
            revert InsufficientBalance();
        }

        _balances[msg.sender] -= _value;
        _balances[_to] += _value;

        emit Transfer(msg.sender, _to, _value);

        return true;
    }

    /// @inheritdoc IERC20
    function allowance(address _owner, address _spender) public view returns (uint256 remaining) {
        return _allowances[_owner][_spender];
    }

    /// @inheritdoc IERC20
    function approve(address _spender, uint256 _value) public returns (bool success) {
        if (_spender == address(0)) {
            revert InvalidAddress();
        }

        _allowances[msg.sender][_spender] = _value;

        emit Approval(msg.sender, _spender, _value);

        return true;
    }

    /// @inheritdoc IERC20
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        if (_from == address(0) || _to == address(0)) {
            revert InvalidAddress();
        }
        if (_balances[_from] < _value) {
            revert InsufficientBalance();
        }
        if (_allowances[_from][msg.sender] < _value) {
            revert InsufficientAllowance();
        }

        _balances[_from] -= _value;
        _balances[_to] += _value;
        _allowances[_from][msg.sender] -= _value;

        emit Transfer(_from, _to, _value);

        return true;
    }

    /// @inheritdoc IERC20
    function mint(uint256 _value, address _to) public virtual onlyOwner {
        if (_to == address(0)) {
            revert InvalidAddress();
        }

        _balances[_to] += _value;
        _totalSupply += _value;

        emit Transfer(address(0), _to, _value);
    }

    /// @inheritdoc IERC20
    function burn(uint256 _value, address _from) public onlyOwner {
        if (_from == address(0)) {
            revert InvalidAddress();
        }

        _balances[_from] -= _value;
        _totalSupply -= _value;

        emit Transfer(_from, address(0), _value);
    }
}

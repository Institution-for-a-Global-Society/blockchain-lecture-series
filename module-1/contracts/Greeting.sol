// SPDX-License-Identifier: MIT
pragma solidity ^0.8.33;

/// @title Sample contract for the learning purposes.
contract Greeting {
    /**
     * Returns "Hello smart contract!".
     *
     * @return greeting Constant greeting string
     */
    function hello() public pure returns (string memory) {
        return "Hello smart contract!";
    }

    /**
     * Returns "Hello `_name`!".
     *
     * @param _name Name to be concatenated with the greeting
     * @return greeting Greeting string with `_name`
     */
    function hello(string calldata _name) public pure returns (string memory) {
        return string.concat("Hello ", _name, "!");
    }
}

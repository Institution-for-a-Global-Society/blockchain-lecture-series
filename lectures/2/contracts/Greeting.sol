// SPDX-License-Identifier: MIT
pragma solidity ^0.8.33;

/// @title Sample contract for the learning purposes.
/// Topics: functions, function visibility, and local variables
contract Greeting {
    /**
     * Returns "Hello Solidity!".
     *
     * @return greeting Constant greeting string
     */
    function hello() public pure returns (string memory) {
        return "Hello Solidity!";
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

    // TODO #1: "挨拶 名前!"（挨拶と名前はどちらも任意の値に指定可能）を返す関数を実装しましょう
    // function hello() {}
}

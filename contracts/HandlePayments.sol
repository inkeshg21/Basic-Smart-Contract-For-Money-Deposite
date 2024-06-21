// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract HandlePayments {
    
    event Withdraw(address user, uint amount);
    event Deposit(address user, uint amount);

    mapping(address => uint) public balances; 

    receive() payable external {
        balances[msg.sender] = balances[msg.sender] + msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    /*
     * @param _amount Total coins to withdraw
     * @dev Allows a user to withdraw their coins from the smart contract
     */
    function withdraw(uint _amount) public payable {
        // Check - Enough coins?
        require(balances[msg.sender] >= _amount, "User must have sufficient balance to withdraw."); 

        // Effect - Update local balance before withdraw
        balances[msg.sender] = balances[msg.sender] - _amount; 

        // Interaction - let's send the coins!
        address payable receiver = payable(msg.sender); // msg.sender.transfer no longer works as "msg.sender" is not payable

        // Transfer will throw exception if it fails
        receiver.transfer(_amount);

        emit Withdraw(msg.sender, _amount);
    }
}
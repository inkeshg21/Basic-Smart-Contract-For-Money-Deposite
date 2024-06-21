// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface EchoInterface {
    function broadcast(string memory _msg) external;
}

contract CallContract { 

    event Revert(string reason);

    function broadcastViaInterface(address _echoContract, string memory _message) public {
        EchoInterface(_echoContract).broadcast(_message);
    }

    function callAnyFunction(address _contract, bytes memory _data) public {
        bool success; // Whether call was successful
        bytes memory returnData; // Returned values
        
        (success, returnData) = _contract.call{value: 0}(abi.encodePacked(_data));
    
        if(!success) {
            emit Revert("Transaction failed.");
        }
    
    }


}
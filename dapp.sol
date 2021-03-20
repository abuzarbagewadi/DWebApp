pragma solidity >=0.5.0 <0.6.0;

contract Linked{
    struct User{
        bytes32 name;
        uint number;
    }
    
    struct Message {
        string content;
        address writtenBy;
        uint256 timestamp;
    }
    
    mapping(address => User) public userInfo;
    mapping(address => Message[]) public userMessages;
    
    Message[] public messages;
    
    function setProfile(bytes32 _name, uint _number) public {
    User memory user = User(_name, _number);
    userInfo[msg.sender] = user;
    }
    
    function writeMessage(string memory _content) public {
    Message memory message = Message(_content, msg.sender, now);
    userMessages[msg.sender].push(message);
    messages.push(message);
    }
}
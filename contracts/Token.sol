pragma solidity ^0.8.1;

contract Token{

    address Owner;
    string public tokenName = "Akash";
    string public symbol = "Ak";
    uint public decimals = 18;
    uint public totalSupply = 2100000;

    mapping(address => uint)public balanceOf;
    mapping(address => mapping(address =>uint))public allowance;
    //The Transfer Function Is Used To Transfer The Token From Msg Sender Account to Another Account.....
    constructor() {
        Owner = msg.sender;
        balanceOf[msg.sender] = totalSupply;
    }
    function transfer(address _to , uint _amount)public returns(bool success){
        require(balanceOf[msg.sender] >= _amount ,"The Token Balance Is Less Then The _amount");
        balanceOf[msg.sender] = balanceOf[msg.sender] - _amount;
        balanceOf[_to] = balanceOf[_to] + _amount;
        return true;
    }
    function fromTransfer(address _from , address _to ,uint _amount)public returns(bool success){
        require(balanceOf[_from]>=_amount,"The Balance In From Account Is less Then The Amount");
        balanceOf[_from ] = balanceOf[_from] - _amount;
        balanceOf[_to] = balanceOf[_to] + _amount;
    }
    //Give The Number Of The Approvance From The Account to spender Account....
    function approve(address _spender , uint _amount)public returns(bool success){
        //require(allowance[msg.sender][_spender] > _amount,"The Amount Of Token Is Less The The _amount");
        allowance[msg.sender][_spender] = _amount;
        return true;
    }
}
pragma solidity ^0.4.23;

contract HelloWorld{
  function sayHelloWorld() public pure returns (string){
   return ("hello world!");
  }

  uint num1;
  uint num2;

/*写入区块链中 */
  function set(uint x,uint y) public  {
     num1 = x;
     num2 = y;
  }

/*从区块链中查询*/
  function get() public view returns(uint){
    return num1+num2;
  }
}

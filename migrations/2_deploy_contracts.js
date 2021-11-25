var SimpleStorage = artifacts.require("./SimpleStorage.sol");
const Token = artifacts.require("./Token.sol");
const CrowdSale = artifacts.require("./crowdsale.sol");
module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(Token);
  deployer.deploy(CrowdSale,1000,120);
};

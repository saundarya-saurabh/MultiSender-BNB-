var MultiSender = artifacts.require("./MultiSender.sol");

module.exports = function(deployer) {
  deployer.deploy(MultiSender);
};
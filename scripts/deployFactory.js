const hre = require("hardhat");
require('dotenv').config();

async function main() {
  await hre.run("clean");
  await hre.run('compile');

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  const balance = await deployer.getBalance();
  console.log("Account balance:", balance.toString());

  const Factory = await hre.ethers.getContractFactory("UniswapV2Factory");
  const factory = await Factory.deploy(deployer.address);

  await factory.deployed();

  await factory.setFeeTo(process.env.FEE_TO);
  await factory.setMigrator(process.env.MIGRATOR);

  const hash = await factory.pairCodeHash();
  const feeTo = await factory.feeTo();
  const feeToSetter = await factory.feeToSetter();
  const migrator = await factory.migrator();

  console.log("Factory:     ", factory.address);
  console.log("Hash:        ", hash);
  console.log("FeeTo:       ", feeTo);
  console.log("FeeToSetter: ", feeToSetter);
  console.log("Migrator:    ", migrator);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

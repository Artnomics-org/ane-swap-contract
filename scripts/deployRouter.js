const hre = require("hardhat");
require('dotenv').config();

async function main() {
  await hre.run("clean");
  await hre.run('compile');

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  const balance = await deployer.getBalance();
  console.log("Account balance:", balance.toString());

  const Router = await hre.ethers.getContractFactory("UniswapV2Router02");
  const router = await Router.deploy(process.env.FACTORY, process.env.WBNB);

  await router.deployed();

  console.log("Router:      ", router.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

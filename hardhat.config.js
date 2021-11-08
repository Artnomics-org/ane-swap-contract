require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config();

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.6.12",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    bsc_mainnet: {
      chainId: 56,
      url: 'https://bsc-dataseed.binance.org/',
      timeout: 1000 * 60,
      accounts: [process.env.PRIVATE_KEY || '0x0000000000000000000000000000000000000000']
    },
    bsc_testnet: {
      chainId: 97,
      url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      timeout: 1000 * 60,
      accounts: [process.env.PRIVATE_KEY || '0x0000000000000000000000000000000000000000']
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: process.env.SCAN_KEY,
  },
};

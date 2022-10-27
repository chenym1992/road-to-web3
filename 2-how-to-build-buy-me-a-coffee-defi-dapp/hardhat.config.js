require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config();

const { BNB_TEST_URL, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    bsctest: {
      url: BNB_TEST_URL,
      accounts: [PRIVATE_KEY]
    }
  },
  solidity: "0.8.17",
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  }
};

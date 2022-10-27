require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config();

const { BNB_TEST_URL, PRIVATE_KEY } = process.env;
console.log('BNB_TEST_URL: ', BNB_TEST_URL);

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    bsctest: {
      url: BNB_TEST_URL,
      accounts: [PRIVATE_KEY]
    }
  },
  solidity: "0.8.17",
  etherscan:{
    apiKey: "EF1TNKYIHGSCFY8GJVG41WUJ4XZ7FG89K8"
  }
};

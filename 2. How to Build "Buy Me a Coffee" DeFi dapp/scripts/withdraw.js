// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const {abi} = require("../artifacts/contracts/BuyMeACoffee.sol/BuyMeACoffee.json");
const { BNB_TEST_URL, PRIVATE_KEY } = process.env;
async function getBalance(provider, address) {
  const balanceBigInt = await provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}
async function main() {
  // Get the contract that has been deployed to BSC test.
  const contractAddress="0xc0CF2b848F5f7BB8adFdD9137DCCA82D7A0Bd3c6";
  const contractABI = abi;

  // Get the node connection and wallet connection.
  const provider = new hre.ethers.providers.JsonRpcProvider(BNB_TEST_URL);

  // Ensure that signer is the SAME address as the original contract deployer,
  // or else this script will fail with an error.
  const signer = new hre.ethers.Wallet(PRIVATE_KEY, provider);
  
  // Instantiate connected contract.
  const buyMeACoffee = new hre.ethers.Contract(contractAddress, contractABI, signer);
    
  console.log("BuyMeACoffee deployed to:", buyMeACoffee.address);
  // Check starting balances.
  console.log("current balance of owner: ", await getBalance(provider, signer.address), "tBNB");
  const contractBalance = await getBalance(provider, buyMeACoffee.address);
  console.log("current balance of contract: ", contractBalance, "tBNB");

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

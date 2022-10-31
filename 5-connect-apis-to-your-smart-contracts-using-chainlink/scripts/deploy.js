// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

  const BullBear = await hre.ethers.getContractFactory("BullBear");
  const bullBear = await BullBear.deploy(60,'0x5741306c21795FdCBb9b265Ea0255F499DFe515C');

  await bullBear.deployed();

  console.log(
    `bullBear deployed to ${bullBear.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

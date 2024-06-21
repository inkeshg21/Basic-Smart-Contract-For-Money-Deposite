import { parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";

// Deploy to Goerli
// npx hardhat --network goerli run scripts/echoDeploy.ts
// npx hardhat verify --network goerli 0x36bDEB207f04F23A768920Fe2890c95afB45F9D8

async function main() {
  const EchoContract = await ethers.getContractFactory("Echo");
  const echo = await EchoContract.deploy({
    gasLimit: 1000000,
    gasPrice: parseEther("0.000000009"),
  });

  console.log("Deploy transaction: " + echo.deployTransaction.hash);
  await echo.deployTransaction.wait(1);

  console.log("Echo contract: " + echo.address);
  console.log("Owner: " + (await echo.owner()));

  // Let's broadcast some messages
  const tx = await echo.broadcast("Hello World", {
    gasLimit: 1000000,
    gasPrice: parseEther("0.000000009"),
  });

  console.log("***** Transaction details *****");
  console.log(tx);

  const response = await tx.wait(1);
  console.log("***** Transaction Receipt *****");
  console.log(response);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

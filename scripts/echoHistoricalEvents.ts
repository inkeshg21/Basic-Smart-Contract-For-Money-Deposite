import { ethers } from "hardhat";
import { echoAddress } from "./config";

// Run for Goerli network
// npx hardhat --network goerli run scripts/echoHistoricalEvents.ts
async function main() {
  const provider = ethers.provider;
  const currentBlock = await provider.getBlockNumber();
  const EchoContract = await ethers.getContractFactory("Echo");
  const echo = EchoContract.attach(echoAddress);

  /*
   * Computes the filter and performs getLogs
   */
  const events = await echo.queryFilter("Message", 0, currentBlock);

  console.log("*** Historical events ***");
  for (let i = 0; i < events.length; i++) {
    console.log(i + "," + events[i].event + "," + events[i].args!["msg"]);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

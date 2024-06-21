import { ethers } from "hardhat";
import { echoAddress } from "./config";

// Run for Goerli network
// npx hardhat --network goerli run scripts/echoWatchEvent.ts
async function main() {
  //   const provider = ethers.provider;
  const EchoContract = await ethers.getContractFactory("Echo");
  const echo = EchoContract.attach(echoAddress);

  // Filter used to search for new events
  const filter = echo.filters.Message(null);
  console.log(filter);

  console.log("*** Watching for events ***");
  echo.on(filter, (event, log) => {
    console.log("----> EVENT FOUND");
    console.log("Event: " + event + "\n");
    console.log("Log: " + JSON.stringify(log) + "\n");
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

import { parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";
import { echoAddress } from "./config";

// Run for Goerli network
// npx hardhat --network goerli run scripts/echoSendBroadcast.ts
async function main() {
  const EchoContract = await ethers.getContractFactory("Echo");
  const echo = EchoContract.attach(echoAddress);

  const tx = await echo.broadcast(
    "Message sent at " + new Date().toLocaleString(),
    {
      gasLimit: 1000000,
      gasPrice: parseEther("0.000000009"),
    }
  );

  console.log("Transaction hash: " + tx.hash);
  await tx.wait(1);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

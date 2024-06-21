import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Echo contract", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContracts() {
    // Contracts are deployed using the first signer/account by default
    const [owner, account1, account2, account3] = await ethers.getSigners();

    const echoContractFactoryInstance = await ethers.getContractFactory("Echo");
    const echo = await echoContractFactoryInstance.deploy();

    const callContractFactoryInstance = await ethers.getContractFactory(
      "CallContract"
    );
    const callContract = await callContractFactoryInstance.deploy();

    return { echo, callContract, owner, account1, account2, account3 };
  }

  describe("Deployment", function () {
    it("Check owner is installed", async function () {
      const { echo, owner, account1 } = await loadFixture(deployContracts);

      expect(await echo.owner()).to.equal(owner.address);
      expect(await echo.owner()).not.to.equal(account1.address);
    });
  });

  describe("Emit message", function () {
    it("Broadcast a message via interface", async function () {
      const { echo, account1 } = await loadFixture(deployContracts);

      // Message to broadcast
      let message = "hello";

      // Echo message via the smart contract
      await expect(echo.connect(account1).broadcast(message))
        .to.emit(echo, "Message")
        .withArgs(message);
    });

    it("Broadcast a message via CallContract (interface)", async function () {
      const { echo, callContract, account1 } = await loadFixture(
        deployContracts
      );

      // Message to broadcast
      let message = "hello";

      // Echo message via the smart contract
      await expect(
        callContract
          .connect(account1)
          .broadcastViaInterface(echo.address, message)
      )
        .to.emit(echo, "Message")
        .withArgs(message);
    });

    it("Broadcast a message via CallContract (.call)", async function () {
      const { echo, callContract, account1 } = await loadFixture(
        deployContracts
      );

      // Message to broadcast
      let message = "hello";

      const encodedFunctionData = echo.interface.encodeFunctionData(
        "broadcast",
        [message]
      );

      // Echo message via the smart contract
      await expect(
        callContract
          .connect(account1)
          .callAnyFunction(echo.address, encodedFunctionData)
      )
        .to.emit(echo, "Message")
        .withArgs(message);
    });
  });
});

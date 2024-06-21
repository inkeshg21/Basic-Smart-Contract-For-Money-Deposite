import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";

describe("Handle payments contract", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContracts() {
    // Contracts are deployed using the first signer/account by default
    const [owner, account1, account2, account3] = await ethers.getSigners();

    const contractFactoryInstance = await ethers.getContractFactory(
      "HandlePayments"
    );
    const deployedContract = await contractFactoryInstance.deploy();

    return { deployedContract, owner, account1, account2, account3 };
  }

  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContractsWithDeposits() {
    // Contracts are deployed using the first signer/account by default
    const [owner, account1, account2, account3] = await ethers.getSigners();

    const provider = ethers.provider;
    const contractFactoryInstance = await ethers.getContractFactory(
      "HandlePayments"
    );
    const deployedContract = await contractFactoryInstance.deploy();

    const depositTx1 = await account1.sendTransaction({
      to: deployedContract.address,
      value: parseEther("1"),
    });
    await depositTx1.wait(1);

    const depositTx2 = await account2.sendTransaction({
      to: deployedContract.address,
      value: parseEther("10"),
    });
    await depositTx2.wait(1);

    const depositTx3 = await account3.sendTransaction({
      to: deployedContract.address,
      value: parseEther("100"),
    });
    await depositTx3.wait(1);

    // Check that all deposits are registered before continuing.
    const balance = await provider.getBalance(deployedContract.address);
    expect(balance).to.equal(parseEther("111"));

    return { deployedContract, owner, account1, account2, account3, provider };
  }

  describe("Deployment", function () {
    it("Check balances are empty", async function () {
      const { deployedContract, owner, account1 } = await loadFixture(
        deployContracts
      );

      expect(await deployedContract.balances(owner.address)).to.equal("0");
      expect(await deployedContract.balances(account1.address)).to.equal("0");
    });
  });

  describe("Handle money", function () {
    it("Deposit funds", async function () {
      const { deployedContract, account1 } = await loadFixture(deployContracts);

      // "await expect" -> It returns a transaction and we are awaiting for its confirmation in the blockchain
      await expect(
        account1.sendTransaction({
          to: deployedContract.address,
          value: parseEther("1"),
        })
      )
        .to.emit(deployedContract, "Deposit")
        .withArgs(account1.address, parseEther("1"));

      // "expect(await...) -> We are calling the contract and reading data about it.
      expect(await deployedContract.balances(account1.address)).to.equal(
        parseEther("1")
      );
    });

    it("Fail to withdraw funds", async function () {
      const { deployedContract, account1 } = await loadFixture(
        deployContractsWithDeposits
      );

      await expect(
        deployedContract.connect(account1).withdraw(parseEther("200"))
      ).to.be.rejectedWith("User must have sufficient balance to withdraw.");
    });

    it("Successfully withdraw funds", async function () {
      const { deployedContract, account1, provider } = await loadFixture(
        deployContractsWithDeposits
      );

      // We perform the following:
      // -- Check balance mapping records 1 ETH for account1
      // -- Record user's balance before withdrawal
      // -- Record the contract's balance before withdrawal
      const preBalanceInContract = await deployedContract.balances(
        account1.address
      );
      expect(preBalanceInContract).to.equal(parseEther("1"));
      const preUserBalance = await provider.getBalance(account1.address);
      const preContractBalance = await provider.getBalance(
        deployedContract.address
      );

      // User perform withdrawal from the contract
      await expect(deployedContract.connect(account1).withdraw(parseEther("1")))
        .to.emit(deployedContract, "Withdraw")
        .withArgs(account1.address, parseEther("1"));

      // We check the following:
      // -- Balances mapping was updated
      // -- Contract balance was decremented
      // -- Users balance was incremented
      const postBalanceInContract = await deployedContract.balances(
        account1.address
      );
      expect(postBalanceInContract).to.equal("0");

      // Compare the pre/post balances
      const postUserBalance = await provider.getBalance(account1.address);
      const postContractBalance = await provider.getBalance(
        deployedContract.address
      );

      // Tricky: You need to compute the gas cost to compare it
      // We will just check that the user's post balance is greater than before the withdrawal.
      // Even with gas costs, it implies the user did receive some funds.
      expect(postUserBalance).to.greaterThan(preUserBalance);
      expect(preContractBalance.sub(parseEther("1"))).to.equal(
        postContractBalance
      );
    });
  });
});

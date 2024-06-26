# Basic-Smart-Contract-for-Money-deposite
This is the initial project for learning about smart contracts. The project will help users to deposit, withdraw, and check their account balances along signature and interacting with another smart contract.

Please make sure to update the `secrets.config.ts` file with the following information:

- **Private key** - A private key linked to your Goerli funds.

- **Provider ID** Your Infura ID for connecting to the Goerli network.

- **Etherscan** An Etherscan API key for verifying deployed code.



After configuration, you can proceed to set up the project.

```bash
    npm i
    npm run build
    npm run test
```


You can check the `package.json` file to review how the 'run' commands are defined for compiling/testing using hardhat.

# Smart contracts
There are three smart contracts:

- `Echo.sol` - Broadcasts a message through an event.
- `HandlePayments.sol` - Demonstrates handling of ETH deposits and withdrawals.
- `CallContract.sol` - Interacts with another smart contract using interfaces or .call()

# Scripts
Here are four scripts that we have put together:

- `echoDeploy.ts` - This script deploys the Echo smart contract to a network (Goerli).
- `echoHistoricalEvents.ts` - Use this script to fetch historical events for the Echo smart contract (eth_getLogs).
- `echoSendBroadcast.ts` - This script sends a transaction to the network (Goerli) that invokes the broadcast function.
- `echoWatchEvent.ts` - Use this script to log events in real-time for the Echo smart contract.

Remember the following:

To deploy your own Echo smart contract, use `echoDeploy.ts`. Before other scripts can use the new address, you'll need to update `config.ts`. Alternatively, you can use an already deployed Echo smart contract with the default address provided, which works on Goerli. Challenge: Modify the Echo.sol code slightly, deploy a new instance of it on Goerli, and attempt to verify its code on Etherscan.

**Watch events.** To monitor new events emitted by Echo.sol, activate `echoWatchEvent.ts` to log them. You can then test it by sending a transaction to the Echo smart contract using `echoSendBroadcast.ts`.

# Unit tests
In the unit tests, we will cover the following:

1. Checking the owner of a smart contract.
2. Fetching a value stored in a smart contract.
3. Checking if an event has specific arguments.
4. Encoding function signature and interacting with another smart contract.
5. Depositing and withdrawing funds.
You can checkout package.json to review how the 'run' commands are defined for compilg/testing using hardhat.

# Smart contracts
There are three smart contracts:

Echo.sol - Broadcasts a message via an event.

HandlePayments.sol - An example of handling ETH deposits and withdrawals.

CallContract.sol - Interacting with another smart contract using interfaces or .call()

# Scripts
We have put together four scripts:

echoDeploy.ts - Deploy the Echo smart contract to a network (Goerli).

echoHistoricalEvents.ts - Fetch historical events for the Echo smart contract (eth_getLogs).

echoSendBroadcast.ts - Send a transaction to the network (Goerli) that invokes the broadcast function.

echoWatchEvent.ts - Logs events in real-time for the Echo smart contract.

Deploy your own Echo. You can use echoDeploy.ts to deploy a new Echo smart contract. You will need to update config.ts before the other scripts will adopt the new address. Another option is to use an already deployed Echo smart contract and we have included a default address that works on Goerli. Challenge: Change the Echo.sol code slighty, deploy a new instance of it on Goerli, and then try to verify its code on Etherscan.

Watch events. You can turn on echoWatchEvent.ts to log new events that are emitted by Echo.sol and see it working by broadcasting a transaction to the Echo smart contract using echoSendBroadcast.ts

# Unit tests
We cover the following in the unit tests:

Checking the owner of a smart contract.

Fetching a value stored in a smart contract.

Checking if an event (with specific arguments).

Encoding function signature and interacting with another smart contract.

Depositing and withdrawing funds.



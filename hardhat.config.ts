import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import {
  ETHERSCAN_API_KEY,
  INFURA_ID,
  TEST_PRIVATE_KEY,
} from "./secrets.config";

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  networks: {
    goerli: {
      url: `https://goerli.infura.io/v3/` + INFURA_ID,
      accounts: [TEST_PRIVATE_KEY],
    },
  },
};

export default config;

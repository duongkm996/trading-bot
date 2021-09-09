import Web3 from "web3";
require("dotenv").config();

const HDWalletProvider = require("@truffle/hdwallet-provider");

export const web3socket = new Web3(process.env.REACT_APP_RPC_URL_WSS_BSC_2);

export const web3 = new Web3(
  new HDWalletProvider(
    process.env.REACT_APP_PRIVATE_KEY,
    process.env.REACT_APP_BSC_NODE,
  )
);


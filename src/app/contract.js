import BUSD from "./abis/BUSD.json";
import DNXC from "./abis/dnxc.json";
import PANCAKE_FACTORY from "./abis/pancakeFactory.json";
import PANCAKE_PAIR from "./abis/pancakePair.json";
import PANCAKE_ROUTER from "./abis/pancakeRouter.json";
import SUSHISWAP_FACTORY from "./abis/sushiswapFactory.json";
import SUSHISWAP_ROUTER from "./abis/sushiswapRouter.json";
import UNISWAP_FACTORY from "./abis/uniswapFactory.json";
import UNISWAP_ROUTER from "./abis/uniswapRouter.json";
import WBNB from "./abis/WBNB.json";
import {
  DNXC_ADDRESS,
  PANCAKE_SWAP_FACTORY_ADDRESS,
  PANCAKE_SWAP_ROUTER_ADDRESS,
} from "./address";
import { web3, web3socket } from "./web3";

// PANCAKE SWAP FACTORY CONTRACT
export const PANCAKE_FACTORY_CONTRACT = new web3.eth.Contract(
  PANCAKE_FACTORY.ABI,
  PANCAKE_SWAP_FACTORY_ADDRESS
);

export const PANCAKE_FACTORY_CONTRACT_SOCKET = new web3socket.eth.Contract(
  PANCAKE_FACTORY.ABI,
  PANCAKE_SWAP_FACTORY_ADDRESS
);

// PANCAKE SWAP ROUTER CONTRACT
export const PANCAKE_ROUTER_CONTRACT = new web3.eth.Contract(
  PANCAKE_ROUTER.ABI,
  PANCAKE_SWAP_ROUTER_ADDRESS
);

// DNXC CONTRACT
export const DNXC_CONTRACT = new web3.eth.Contract(DNXC.ABI, DNXC_ADDRESS);

// PANCAKE PAIR CONTRACT
export const PANCAKE_PAIR_CONTRACT = (address_pair) => {
  return new web3.eth.Contract(PANCAKE_PAIR.ABI, address_pair);
};

// UNISWAP FACTORY CONTRACT - UNISWAP ROUTER
export const UNISWAP_FACTORY_CONTRACT = new web3.eth.Contract(
  UNISWAP_FACTORY.ABI,
  UNISWAP_FACTORY.ADDRESS
);

export const UNISWAP_ROUTER_CONTRACT = new web3.eth.Contract(
  UNISWAP_ROUTER.ABI,
  UNISWAP_ROUTER.ADDRESS
);

// SUSHISWAP FACTORY CONTRACT - SUSHISWAP ROUTER
export const SUSHISWAP_FACTORY_CONTRACT = new web3.eth.Contract(
  SUSHISWAP_FACTORY.ABI,
  SUSHISWAP_FACTORY.ADDRESS
);

export const SUSHISWAP_ROUTER_CONTRACT = new web3.eth.Contract(
  SUSHISWAP_ROUTER.ABI,
  SUSHISWAP_ROUTER.ADDRESS
);

export const WBNB_CONTRACT = new web3.eth.Contract(WBNB.ABI, WBNB.ADDRESS);

export const BUSD_CONTRACT = new web3.eth.Contract(BUSD.ABI, BUSD.ADDRESS);

export const COMMON_CONTRACT = (address) => {
  return new web3.eth.Contract(WBNB.ABI, address);
};

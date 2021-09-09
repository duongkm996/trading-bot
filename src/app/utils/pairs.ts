import { BUSD_ADDRESS, WBNB_ADDRESS } from "../address";
import {
  PANCAKE_FACTORY_CONTRACT,
  PANCAKE_PAIR_CONTRACT,
  WBNB_CONTRACT,
  COMMON_CONTRACT,
  PANCAKE_ROUTER_CONTRACT,
  BUSD_CONTRACT,
} from "../contract";
import { fromWei, toWei } from "./wei";

export const checkPair = async (token0: string, token1: string) => {
  const pair_address = await PANCAKE_FACTORY_CONTRACT.methods
    .getPair(token0, token1)
    .call();
  console.log(pair_address);
  const balanceBNB = await WBNB_CONTRACT.methods.balanceOf(pair_address).call();
  console.log(fromWei(balanceBNB));
  const pairContract = PANCAKE_PAIR_CONTRACT(pair_address);
  const uReserves = await pairContract.methods.getReserves().call();
  const price = uReserves["1"] / uReserves["0"];
  console.log({ price });
  return price;
};

export const getPair = async (
  factoryContract: any,
  token0: string,
  token1: string
) => {
  const addressPair = await factoryContract.methods
    .getPair(token0, token1)
    .call();
  return addressPair;
};

export const checkInfoPairBNB_TOKEN = async (
  tokenAddress: string,
  pairAddress: string
) => {
  const getBalanceBNBofPair = await WBNB_CONTRACT.methods
    .balanceOf(pairAddress)
    .call();
  const balanceBNBofPair = fromWei(getBalanceBNBofPair);

  const tokenContract = COMMON_CONTRACT(tokenAddress);
  const nameToken = await tokenContract.methods.name().call();
  const symbol = await tokenContract.methods.symbol().call();
  let totalSupplyToken = await tokenContract.methods.totalSupply().call();
  totalSupplyToken = fromWei(totalSupplyToken);

  console.table([
    {
      Token: nameToken,
      Symbol: symbol,
      Pair: pairAddress,
      "Pool Amount BNB": `${balanceBNBofPair}`,
    },
  ]);
};

export const checkInfoPairBUSD_TOKEN = async (
  tokenAddress: string,
  pairAddress: string
) => {
  const getBalanceBUSDofPair = await BUSD_CONTRACT.methods
    .balanceOf(pairAddress)
    .call();
  const balanceBUSDofPair = fromWei(getBalanceBUSDofPair);

  const tokenContract = COMMON_CONTRACT(tokenAddress);

  const nameToken = await tokenContract.methods.name().call();
  const symbol = await tokenContract.methods.symbol().call();
  let totalSupplyToken = await tokenContract.methods.totalSupply().call();

  console.table([
    {
      Token: nameToken,
      Symbol: symbol,
      Pair: pairAddress,
      "Pool Amount BUSD": `${balanceBUSDofPair}`,
    },
  ]);
};

export const checkPriceBNB = async () => {
  const pair = [WBNB_ADDRESS, BUSD_ADDRESS];

  const amoutOutsResult: string[] = await PANCAKE_ROUTER_CONTRACT.methods
    .getAmountsOut(toWei("1"), pair)
    .call();

  return fromWei(amoutOutsResult[1]);
};

export const getBalanceBNBofPair = async (pairAddress: string) => {
  const getBalanceBNB = await WBNB_CONTRACT.methods
    .balanceOf(pairAddress)
    .call();
  const balanceBNB = fromWei(getBalanceBNB);
  console.log({ balanceBNB });
  return balanceBNB;
};

export const getBalanceBUSDofPair = async (pairAddress: string) => {
  const getBalanceBUSD = await BUSD_CONTRACT.methods
    .balanceOf(pairAddress)
    .call();
  const balanceBUSD = fromWei(getBalanceBUSD);
  console.log({ balanceBUSD });
  return balanceBUSD;
};

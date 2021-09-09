import { BUSD_CONTRACT } from "../contract";
import { web3 } from "../web3";

export const fromWei = (amount: string) => {
  return web3.utils.fromWei(amount, "ether");
};

export const toWei = (amount: string) => {
  return web3.utils.toWei(amount, "ether");
};

export const checkBalances = async () => {
  // @ts-ignore
  const getBalanceBNB = await web3.eth.getBalance(process.env.REACT_APP_ACCOUNT);
  const balanceBNB = fromWei(getBalanceBNB);

  // @ts-ignore
  const getBalanceBUSD = await BUSD_CONTRACT.methods
    .balanceOf(process.env.REACT_APP_ACCOUNT)
    .call();
  const balanceBUSD = fromWei(getBalanceBUSD);
  
  return {balanceBNB, balanceBUSD}
};

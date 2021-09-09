import { SwapParams } from "../../types/types";
import { web3 } from "../web3";
import { fromWei, toWei } from "./wei";

export const sellToken = async (params: SwapParams) => {
  const { routerContract, pair, amountIn, perSlippage, gasPrice, gasLimit } =
    params;

  const tokenAmountIn = toWei(amountIn.toString());

  const amoutOutsResult: string[] = await routerContract.methods
    .getAmountsOut(tokenAmountIn, pair)
    .call();

  const slippage = perSlippage / 100;

  let amountOutMin =
    parseFloat(fromWei(amoutOutsResult[1])) -
    parseFloat(fromWei(amoutOutsResult[1])) * slippage;

  const moment = require("moment"); // import moment.js library
  const now = moment().unix(); // fetch current unix timestamp
  const DEADLINE = now + 60; // add 60 seconds

  const SETTINGS = {
    gasLimit,
    gasPrice: web3.utils.toWei(gasPrice.toString(), "Gwei"),
    from: process.env.REACT_APP_ACCOUNT, // Use your account here
  };

  console.log(amountOutMin);

  try {
    if (amountOutMin > 0) {
      console.log("Pending Swap ...");
      const result = await routerContract.methods
        .swapExactTokensForTokens(
          tokenAmountIn,
          toWei(amountOutMin.toFixed(18).toString()),
          pair,
          process.env.REACT_APP_ACCOUNT,
          DEADLINE
        )
        .send(SETTINGS);
      console.log(result);
    } else {
      console.log("NO TRADE!");
    }
  } catch (error: any) {
    console.log(error.message);
  }
};

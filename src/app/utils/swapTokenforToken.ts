import { SwapParams } from "../../types/types";
import { web3 } from "../web3";
import { fromWei, toWei } from "./wei";

interface TargetParams {
  amountIn: number;
  amountOutMin: number;
  price: number;
  slippage: number;
}

const getAmoutOutMinTokenTarget = (params: TargetParams) => {
  const { amountIn, amountOutMin, price, slippage } = params;

  const amountOutTokenFromPrice = amountIn / price;
  const amoutOutMinTokenTarget =
    amountOutTokenFromPrice - amountOutTokenFromPrice * slippage;

  console.table({
    "Amount In": amountIn,
    "Current Amount Out Min": amountOutMin,
    "Target Amount Out Min": amoutOutMinTokenTarget,
  });

  return amoutOutMinTokenTarget;
};

export const swapExactTokensForTokens = async (params: SwapParams) => {
  const {
    routerContract,
    pair,
    amountIn,
    perSlippage,
    gasPrice,
    gasLimit,
    price,
  } = params;

  const tokenAmountIn = toWei(amountIn.toString());
  try {
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

    let amoutOutMinTokenTarget = 0;
    if (price > 0) {
      amoutOutMinTokenTarget = getAmoutOutMinTokenTarget({
        amountIn,
        amountOutMin,
        price,
        slippage,
      });
    }

    const SETTINGS = {
      gasLimit,
      gasPrice: web3.utils.toWei(gasPrice.toString(), "Gwei"),
      from: process.env.REACT_APP_ACCOUNT, // Use your account here
    };

    if (amountOutMin > amoutOutMinTokenTarget) {
      console.log("Pending Swap...", amountOutMin);
      const result = await routerContract.methods
        .swapExactTokensForTokens(
          tokenAmountIn,
          toWei(amountOutMin.toFixed(18).toString()),
          pair,
          process.env.REACT_APP_ACCOUNT,
          DEADLINE
        )
        .send(SETTINGS);
      return { data: result, status: 200 };
    } else {
      return { status: 400, message: "Dont Trade" };
    }
  } catch (error: any) {
    return { status: 400, message: error.message };
  }
};

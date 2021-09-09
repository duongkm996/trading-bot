import { SwapParams } from "../../types/types";
import { web3 } from "../web3";
import { checkPriceBNB } from "./pairs";
import { fromWei, toWei } from "./wei";

interface TargetParams {
  amountIn: number;
  amountOutMin: number;
  price: number;
  slippage: number;
}

const getAmoutOutMinTokenTarget = async (params: TargetParams) => {
  const { amountIn, amountOutMin, price, slippage } = params;
  const priceBNB = await checkPriceBNB();
  const amountOutTokenFromPrice = (parseFloat(priceBNB) * amountIn) / price;
  const amoutOutMinTokenTarget =
    amountOutTokenFromPrice - amountOutTokenFromPrice * slippage;

  console.table({
    "Amount In": amountIn,
    "Current Amount Out Min": amountOutMin,
    "Target Amount Out Min": amoutOutMinTokenTarget,
    "BNB Price": priceBNB,
  });
  return amoutOutMinTokenTarget;
};

export const swapExactETHForTokens = async (params: SwapParams) => {
  const {
    routerContract,
    pair,
    amountIn,
    perSlippage,
    gasPrice,
    gasLimit,
    price,
  } = params;

  const ethAmount = toWei(amountIn.toString());
  try {
    const amoutOutsResult: string[] = await routerContract.methods
      .getAmountsOut(ethAmount, pair)
      .call();

    const slippage = perSlippage / 100;

    const amountOutMin =
      parseFloat(fromWei(amoutOutsResult[1])) -
      parseFloat(fromWei(amoutOutsResult[1])) * slippage;

    const moment = require("moment");
    const now = moment().unix(); // fetch current unix timestamp
    const DEADLINE = now + 60; // add 60 seconds

    let amoutOutMinTokenTarget = 0;
    if (price > 0) {
      amoutOutMinTokenTarget = await getAmoutOutMinTokenTarget({
        amountIn,
        amountOutMin,
        price,
        slippage,
      });
    }

    const SETTINGS = {
      gasLimit,
      gasPrice: web3.utils.toWei(gasPrice.toString(), "Gwei"),
      from: process.env.REACT_APP_ACCOUNT,
      value: ethAmount, // Amount of Ether to Swap
    };

    if (amountOutMin > amoutOutMinTokenTarget) {
      console.log("Pending Swap...", amountOutMin);
      const result = await routerContract.methods
        .swapExactETHForTokens(
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

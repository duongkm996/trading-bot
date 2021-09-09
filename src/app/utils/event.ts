import { FormParams } from "../../types/types";
import { BUSD_ADDRESS, WBNB_ADDRESS } from "../address";
import {
  PANCAKE_FACTORY_CONTRACT_SOCKET,
  PANCAKE_ROUTER_CONTRACT,
} from "../contract";
import {
  checkInfoPairBNB_TOKEN,
  checkInfoPairBUSD_TOKEN,
  getBalanceBNBofPair,
  getBalanceBUSDofPair,
} from "./pairs";
import { swapExactETHForTokens } from "./swapEthforToken";
import { swapExactTokensForTokens } from "./swapTokenforToken";

export const emitPairCreated = async () => {
  PANCAKE_FACTORY_CONTRACT_SOCKET.events
    .PairCreated({}, async (error: any, event: any) => {
      if (error) {
        console.log(error);
      }
      if (event) {
        const { token0, token1, pair } = event.returnValues;
        if (token0 === WBNB_ADDRESS) {
          checkInfoPairBNB_TOKEN(token1, pair);
        }
        if (token1 === WBNB_ADDRESS) {
          checkInfoPairBNB_TOKEN(token0, pair);
        }
        if (token0 === BUSD_ADDRESS) {
          checkInfoPairBUSD_TOKEN(token1, pair);
        }
        if (token1 === BUSD_ADDRESS) {
          checkInfoPairBUSD_TOKEN(token0, pair);
        }
      }
    })
    .on("connected", function (subscriptionId: any) {
      console.log({ subscriptionId });
    });
};

interface EventPair {
  returnValues: PairParams;
}

interface PairParams {
  token0: string;
  token1: string;
  pair: string;
}

const showLog = (params: PairParams) => {
  const { token0, token1, pair } = params;
  console.table({
    token0:
      token0.toLowerCase() === WBNB_ADDRESS.toLowerCase()
        ? "WBNB"
        : token0.toLowerCase() === BUSD_ADDRESS
        ? "BUSD"
        : token0,
    token1:
      token1.toLowerCase() === WBNB_ADDRESS.toLowerCase()
        ? "WBNB"
        : token1.toLowerCase() === BUSD_ADDRESS
        ? "BUSD"
        : token1,
    pair,
  });
};

const autoSwap = async (swapPrams: FormParams, pairParams: PairParams) => {
  const routerContract = PANCAKE_ROUTER_CONTRACT;
  const { amountIn, perSlippage, gasPrice, gasLimit, swapBy } = swapPrams;
  const { token0, token1, pair } = pairParams;
  let pairSwap: string[] = [];
  switch (swapBy) {
    case "BNB":
      const poolAmountBNB = await getBalanceBNBofPair(pair);

      if (token0.toLowerCase() === WBNB_ADDRESS.toLowerCase()) {
        pairSwap = [WBNB_ADDRESS, token1];
      }
      if (token1.toLowerCase() === WBNB_ADDRESS.toLowerCase()) {
        pairSwap = [WBNB_ADDRESS, token0];
      }
      if (parseFloat(poolAmountBNB) >= 700) {
        swapExactETHForTokens({
          routerContract,
          pair: pairSwap,
          amountIn,
          perSlippage,
          gasPrice,
          gasLimit,
          price: 0,
        });
      }
      break;
    case "BUSD":
      const poolAmountBUSD = await getBalanceBUSDofPair(pair);

      if (token0.toLowerCase() === BUSD_ADDRESS.toLowerCase()) {
        pairSwap = [BUSD_ADDRESS, token1];
      }
      if (token1.toLowerCase() === BUSD_ADDRESS.toLowerCase()) {
        pairSwap = [BUSD_ADDRESS, token0];
      }
      if (parseFloat(poolAmountBUSD) > 350000) {
        swapExactTokensForTokens({
          routerContract,
          pair: pairSwap,
          amountIn,
          perSlippage,
          gasPrice,
          gasLimit,
          price: 0,
        });
      }
      break;
    default:
      break;
  }
};

export const snipeBot = async (params: FormParams) => {
  const routerContract = PANCAKE_ROUTER_CONTRACT;
  const { amountIn, perSlippage, gasPrice, gasLimit, address, swapBy } = params;

  PANCAKE_FACTORY_CONTRACT_SOCKET.events
    .PairCreated({}, async (error: any, event: EventPair) => {
      if (error) {
        console.log(error);
      }
      if (event) {
        const { token0, token1, pair } = event.returnValues;
        showLog({ token0, token1, pair });
        if (address) {
          if (
            token0.toLowerCase() === address.toLowerCase() ||
            token1.toLowerCase() === address.toLowerCase()
          ) {
            switch (swapBy) {
              case "BNB":
                swapExactETHForTokens({
                  routerContract,
                  pair: [WBNB_ADDRESS, address],
                  amountIn,
                  perSlippage,
                  gasPrice,
                  gasLimit,
                  price: 0,
                });
                break;
              case "BUSD":
                swapExactTokensForTokens({
                  routerContract,
                  pair: [BUSD_ADDRESS, address],
                  amountIn,
                  perSlippage,
                  gasPrice,
                  gasLimit,
                  price: 0,
                });
                break;
              default:
                break;
            }
          }
        } else {
          autoSwap(params, { token0, token1, pair });
        }
      }
    })
    .on("connected", function (subscriptionId: any) {
      console.log({ subscriptionId });
    });
};

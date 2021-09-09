export interface FormParams {
  address: string;
  amountIn: number;
  perSlippage: number;
  gasPrice: number;
  gasLimit: number;
  swapBy: "BNB" | "BUSD";
  price: number;
  privateKey: string;
}

export interface Pair {
  token: string;
  pool_amount: string;
}

export interface Res {
  status: number;
  message: string;
  data: any;
}

export interface SwapParams {
  routerContract: any;
  pair: string[];
  amountIn: number;
  perSlippage: number;
  gasPrice: number;
  gasLimit: number;
  price: number;
}

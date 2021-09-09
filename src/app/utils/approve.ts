import { PANCAKE_SWAP_ROUTER_ADDRESS } from "../address";
import { COMMON_CONTRACT } from "../contract";
import { web3 } from "../web3";
import { fromWei } from "./wei";

export const approve = async (address: string, amount: number) => {
  const contract = COMMON_CONTRACT(address);
  const SETTINGS = {
    gasPrice: web3.utils.toWei("6", "Gwei"),
    from: process.env.REACT_APP_ACCOUNT,
  };
  try {
    console.log("Pending Approve ...");
    const result = await contract.methods
      .approve(
        PANCAKE_SWAP_ROUTER_ADDRESS,
        web3.utils.toWei(amount.toString(), "ether")
      )
      .send(SETTINGS);
    return { data: result, status: 200, message: "Success" };
  } catch (error: any) {
    return { status: 400, message: error.message };
  }
};

export const checkAllowance = async (address: string) => {
  const contract = COMMON_CONTRACT(address);
  try {
    const result = await contract.methods
      .allowance(process.env.REACT_APP_ACCOUNT, PANCAKE_SWAP_ROUTER_ADDRESS)
      .call();
    console.log(fromWei(result));
  } catch (error) {
    console.log(error);
  }
};

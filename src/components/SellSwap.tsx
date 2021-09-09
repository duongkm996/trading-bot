import { Card, message } from 'antd';
import React, { useEffect } from 'react';
import { BUSD_ADDRESS, WBNB_ADDRESS } from '../app/address';
import { PANCAKE_ROUTER_CONTRACT } from '../app/contract';
import { approve } from '../app/utils/approve';
import { sellToken } from '../app/utils/sellToken';
import useApproval from '../hooks/useApproval';
import useSellToken from '../hooks/useSellToken';
import { FormParams } from '../types/types';
import FormSwap from './FormSwap';

interface Props {

}

function SellSwap(props: Props) {
    const [onSwapTokensForTokens, resSwap, loading] = useSellToken();
    const [onApprove, resApprove, loadingApprove] = useApproval();

    useEffect(() => {
        if (resApprove) {
            switch (resApprove.status) {
                case 200:
                    message.success({
                        content: resApprove.message,
                        className: 'mt-5',
                    });
                    break;
                case 400:
                    message.error({
                        content: resApprove.message,
                        className: 'mt-5',
                    });
                    break;
                default:
                    break;
            }
        }
    }, [resApprove])

    useEffect(() => {
        if (resSwap) {
            switch (resSwap.status) {
                case 200:
                    message.success({
                        content: resSwap.message,
                        className: 'mt-5',
                    });
                    break;
                case 400:
                    message.error({
                        content: resSwap.message,
                        className: 'mt-5',
                    });
                    break;
                default:
                    break;
            }
        }
    }, [resSwap])

    const handleSwap = (params: FormParams) => {
        const routerContract = PANCAKE_ROUTER_CONTRACT;
        const { amountIn, perSlippage, gasPrice, gasLimit, swapBy, price } = params;

        if (swapBy === "BNB") {
            const pair = [params.address, WBNB_ADDRESS];
            onSwapTokensForTokens({
                routerContract, pair, amountIn, perSlippage, gasPrice, gasLimit, price
            });
        }
        if (swapBy === "BUSD") {
            const pair = [params.address, BUSD_ADDRESS];
            onSwapTokensForTokens({
                routerContract, pair, amountIn, perSlippage, gasPrice, gasLimit, price
            });
        }
    }

    const handleApproval = async (address: string, amountIn: number) => {
        onApprove(address, amountIn);
    }

    return (
        <div id="content" className="mt-4">
            <Card title="Sell Token">
                <FormSwap loadingApprove={loadingApprove} type={"SELL"} loading={loading} handleSwap={handleSwap} handleApproval={handleApproval} />
            </Card>
        </div>
    )
}

export default SellSwap

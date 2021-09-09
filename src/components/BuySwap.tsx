import { Card, message } from 'antd';
import React, { useEffect } from 'react';
import { BUSD_ADDRESS, WBNB_ADDRESS } from '../app/address';
import { PANCAKE_ROUTER_CONTRACT } from '../app/contract';
import { snipeBot } from '../app/utils/event';
import useSwapTokensForTokens from '../hooks/useSwapTokensForTokens';
import { FormParams } from '../types/types';
import FormSwap from './FormSwap';

interface Props {
    balanceBNB: string;
    balanceBUSD: string;
}

function BuySwap(props: Props) {
    const [onSwapTokensForTokens, resSwap, loading] = useSwapTokensForTokens();

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
            const pair = [WBNB_ADDRESS, params.address];
            onSwapTokensForTokens({
                routerContract, pair, amountIn, perSlippage, gasPrice, gasLimit, price
            }, swapBy);
        }
        if (swapBy === "BUSD") {
            const pair = [BUSD_ADDRESS, params.address];
            onSwapTokensForTokens({
                routerContract, pair, amountIn, perSlippage, gasPrice, gasLimit, price
            }, swapBy);
        }
    }

    const handleSnipe = (params: FormParams) => {
        console.log(params);
        snipeBot(params);
    }

    return (
        <div id="content" className="mt-4">
            <Card title="Buy Token" extra={<b>Balance: {parseFloat(props.balanceBNB).toFixed(4)} BNB - {parseFloat(props.balanceBUSD).toFixed(4)} BUSD</b>}>
                <FormSwap type={"BUY"} loading={loading} handleSwap={handleSwap} />
            </Card>
        </div>
    )
}

export default BuySwap

import React, { useState } from 'react'
import { swapExactETHForTokens } from '../app/utils/swapEthforToken';
import { swapExactTokensForTokens } from '../app/utils/swapTokenforToken'
import { SwapParams } from '../types/types';

function useSwapTokensForTokens(): [(params: SwapParams, type: "BUSD" | "BNB") => void, any, boolean] {
    const [resSwap, setResSwap] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    const onSwap = async (params: SwapParams, type: "BUSD" | "BNB") => {
        try {
            setLoading(true);
            switch (type) {
                case "BUSD":
                    const result1 = await swapExactTokensForTokens(params);
                    if (result1) {
                        setResSwap(result1);
                    }
                    break;
                case "BNB":
                    const result2 = await swapExactETHForTokens(params);
                    if (result2) {
                        setResSwap(result2);
                    }
                    break;
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    return [onSwap, resSwap, loading]
}

export default useSwapTokensForTokens

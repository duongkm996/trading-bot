import React, { useState } from 'react'
import { swapExactTokensForTokens } from '../app/utils/swapTokenforToken';
import { SwapParams } from '../types/types';

function useSellToken(): [(params: SwapParams) => void, any, boolean] {
    const [resSwap, setResSwap] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    const onSwap = async (params: SwapParams) => {
        try {
            setLoading(true);
            const result = await swapExactTokensForTokens(params);
            if (result) {
                setResSwap(result);
            }

        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    return [onSwap, resSwap, loading]
}

export default useSellToken

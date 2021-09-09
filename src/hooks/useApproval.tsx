import React, { useState } from 'react'
import { approve } from '../app/utils/approve'

function useApproval(): [(address: string, amount: number) => void, any, boolean] {
    const [resApprove, setResApprove] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    const onApprove = async (address: string, amount: number) => {
        try {
            setLoading(true);
            const result = await approve(address, amount);
            if (result) {
                setResApprove(result);
            }

        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    return [onApprove, resApprove, loading]
}

export default useApproval

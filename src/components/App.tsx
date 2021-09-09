import React, { useEffect, useState } from 'react';
import { checkBalances } from '../app/utils/wei';
import BuySwap from './BuySwap';
import NavBar from './NavBar';
import SellSwap from './SellSwap';

function App() {
    const [balanceBUSD, setBalanceBUSD] = useState<string>("");
    const [balanceBNB, setBalanceBNB] = useState<string>("");

    useEffect(() => {
        const getBalance = async () => {
            const balance = await checkBalances();
            setBalanceBUSD(balance.balanceBUSD);
            setBalanceBNB(balance.balanceBNB);
        }
        getBalance();
    }, [])

    return (
        <div>
            <NavBar account={"0x0"} />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-6">
                        <BuySwap balanceBNB={balanceBNB} balanceBUSD={balanceBUSD} />
                    </div>
                    <div className="col-6">
                        <SellSwap />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App

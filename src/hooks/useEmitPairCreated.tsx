import React, { useState } from 'react'
import { PANCAKE_FACTORY_CONTRACT_SOCKET } from '../app/contract';
import { Pair } from '../types/types';

function useEmitPairCreated() {
  const [res, resRes] = useState<Pair[]>();

  const onEmitPairCreated = async () => {
    try {

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>

    </div>
  )
}

export default useEmitPairCreated

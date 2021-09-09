import React, { useState, useEffect } from 'react'
import { Card, Table, Tag, Space } from 'antd';
import { Pair } from '../types/types';
import { emitPairCreated } from '../app/utils/event';
import { PANCAKE_FACTORY_CONTRACT_SOCKET } from '../app/contract';

const columns = [
    {
        title: 'token0',
        dataIndex: 'token0',
        key: 'token0',
        render: (text: any) => <a>{text}</a>,
    },
    {
        title: 'token1',
        dataIndex: 'token1',
        key: 'token1',
    },
    {
        title: 'pair',
        dataIndex: 'pair',
        key: 'pair',
    }
];


interface Props {
    title: string;
}

function NewsPair(props: Props) {
    const [data, setData] = useState<any[]>();

    useEffect(() => {
        PANCAKE_FACTORY_CONTRACT_SOCKET.events
            .PairCreated({}, async (error: any, event: any) => {
                if (error) {
                    console.log(error);
                }
                if (event) {
                    const { token0, token1, pair } = event.returnValues;
                    console.log({ token0, token1, pair });
                    console.log({ data });
                    setData([...data, { token0, token1, pair }]);

                }
            })
            .on("connected", function (subscriptionId: any) {
                console.log({ subscriptionId });
            });
    }, [])

    return (
        <div className="mt-4">
            <Card title={props.title}>
                <Table columns={columns} dataSource={data} />
            </Card>
        </div>
    )
}

export default NewsPair

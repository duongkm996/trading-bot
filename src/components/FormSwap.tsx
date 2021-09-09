import React from 'react'
import { Form, Input, Button, InputNumber } from 'antd';
import { FormParams } from '../types/types';
import { Radio } from 'antd';

interface Props {
    handleSwap: (params: FormParams) => void;
    loading: boolean | undefined;
    type: "SELL" | "BUY";
    handleApproval?: (address: string, amountIn: number) => void;
    loadingApprove?: boolean | undefined;
}

function FormSwap(props: Props) {
    const [form] = Form.useForm();

    const onFinish = (values: FormParams) => {
        props.handleSwap(values);
    };

    const onApproval = () => {
        const address = form.getFieldValue("address");
        const amountIn = form.getFieldValue("amountIn");
        if (props.handleApproval) {
            props.handleApproval(address, amountIn);
        }
    }

    const getLabelForm = () => {
        if (props.type === "SELL") {
            return "SWAP TO"
        }
        if (props.type === "BUY") {
            return "SWAP BY";
        }
        return ""
    }

    return (
        <div>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                name="basic"
            >
                <Form.Item label={getLabelForm()} name="swapBy">
                    <Radio.Group>
                        <Radio.Button value="BNB">BNB</Radio.Button>
                        <Radio.Button value="BUSD">BUSD</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Address Token" name="address" rules={[{ required: true, message: 'Please input' }]}>
                    <Input placeholder="Address Token" />
                </Form.Item>
                {
                    props.type === "BUY" ? <Form.Item label="Price" name="price" initialValue={0} rules={[{ required: true, message: 'Please input' }]}>
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item> : ""
                }
                <Form.Item label="Amount In" name="amountIn" initialValue={1} rules={[{ required: true, message: 'Please input' }]}>
                    <InputNumber style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item label="Slippage (%)" name="perSlippage" initialValue={0.5} rules={[{ required: true, message: 'Please input' }]}>
                    <InputNumber style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item label="Gas Price" name="gasPrice" initialValue={6} rules={[{ required: true, message: 'Please input' }]}>
                    <InputNumber style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item label="Gas Limit" name="gasLimit" initialValue={200000} rules={[{ required: true, message: 'Please input' }]}>
                    <InputNumber
                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
                        style={{ width: "100%" }}
                    />
                </Form.Item>
                <Form.Item>
                    <div>
                        {
                            props.type === "SELL" ? <Button loading={props.loadingApprove} style={{ width: "100%" }} type="primary" danger onClick={onApproval}>Approval</Button> : ""
                        }
                    </div>
                    <br />
                    <div>
                        <Button loading={props.loading} style={{ width: "100%" }} type="primary" htmlType="submit">SWAP</Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    )
}

export default FormSwap

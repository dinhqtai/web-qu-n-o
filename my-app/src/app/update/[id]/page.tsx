'use client'
import * as React from 'react';
import { Button, Checkbox, Form, Input, InputNumber, Select } from 'antd';
import { useState, useEffect } from 'react';
import { IOrigin, IProduct } from '@/app/page';
import { getProduct, updateProducts } from '@/app/api/project';
const { TextArea } = Input;
export default function UpdateProduct({ params }: { params: { id: number } }) {
    const [product, setProduct] = useState<IProduct>()
    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await getProduct(params.id)
            setProduct(data)
        }
        fetchProduct()
    }, [])
    const onFinish = async (values: IProduct) => {
        await updateProducts(values, params.id)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (<div>
        {product ? (
            <Form
                name="add"
                initialValues={product}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item<IProduct>
                    label="Tên sản phẩm"
                    name="name"
                    rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm !' },]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<IProduct>
                    label="Giá"
                    name="price"
                    rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm !' },]}
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item<IProduct>
                    label="Mô tả"
                    name="description"
                    rules={[
                        { required: true, message: 'Vui lòng nhập mô tả !' },
                        { min: 5, message: "Mô tả ít nhất 5 kí tự" }
                    ]}
                >
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item<IProduct>
                    label="Xuất xứ"
                    name="origin"
                    rules={[{ required: true, message: 'Vui lòng nhập xuất xứ !' }]}
                >
                    <Select
                        defaultValue={"Xuất xứ"}
                        style={{ width: 200 }}
                        options={Object.keys(IOrigin).map(key => ({ value: IOrigin[key], label: IOrigin[key] }))}>
                    </Select>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        ) : (
            <div>Sản phẩm không tồn tại</div>
        )}
    </div>
    );

}
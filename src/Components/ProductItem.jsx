import React from 'react';
import { Row, Col, Card, Input, Select, Button, Typography, Space, Form, Badge, Popconfirm } from 'antd';
import { DeleteOutlined, PlusOutlined, CloseOutlined } from '@ant-design/icons';

const ProductItem = ({ item, onRemove, onRemoveSku }) => {
    const { Title, Text } = Typography;
    const { Option } = Select;
    
    return (
        <Card bodyStyle={{ padding: 14, position: 'relative' }} style={{ marginBottom: 12, borderRadius: 6 }}>
             <Popconfirm
                title="Are you sure to delete this product?"
                onConfirm={() => onRemove(item.id)}
                okText="Yes"
                cancelText="No"
                placement="topRight"
            >
                <Button
                    danger
                    shape="circle"
                    icon={<DeleteOutlined />}
                    style={{ position: 'absolute', right: 14, top: 14 }}
                />
            </Popconfirm>

            <Row gutter={[12, 6]} align="left">
                <Col xs={24} sm={12} md={8}>
                    <div className='flex  flex-col items-start justify-center'>
                        <Text strong>Name </Text>
                        <Text> {item.name}</Text>
                        <div style={{ marginTop: 6 }}>
                            <Text>Size </Text>
                            <Text>{item.size}</Text>
                        </div>
                        <div>
                            <Text>Color </Text>
                            <Text>{item.color || 'Not found'}</Text>
                        </div>
                        <div>
                            <Text>Available Stock </Text>
                            <Text>{item.stock} Units</Text>
                        </div>
                        <div>
                            <Text>SKU </Text>
                            {item.skus && item.skus.map((sku, index) => (
                                <span key={index} style={{ marginRight: 8 }}>
                                    <Text code>{sku}</Text>
                                    <Popconfirm
                                        title="Are you sure to remove this SKU?"
                                        onConfirm={() => onRemoveSku(item.id, sku)}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <CloseOutlined style={{ marginLeft: 4, color: 'red', cursor: 'pointer' }} />
                                    </Popconfirm>
                                </span>
                            ))}
                        </div>
                    </div>
                </Col>

                <Col className='!flex !justify-center !items-center' xs={24} sm={12} md={10}>
                    <div className='!flex !justify-center !items-center' style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div className='relative '>
                        
                     
                        <Input 
                            prefix={<Text>Tk.</Text>} 
                            value={item.discountPrice} 
                            style={{ width: 180 }} 
                            readOnly
                        />
                            <div className='absolute top-[50%] z-10 right-[20px] translate-y-[-50%] '><del>{item.sellPrice}</del></div>
                         </div>
                        <div>

                        
                        </div>
                        <div className=''>
                            <Text strong>Subtotal</Text>
                            <div>{(item.price * item.qty).toFixed(2)}</div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Card>
    );
};

export default ProductItem;
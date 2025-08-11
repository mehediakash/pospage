
import React from 'react'
import { Row, Col, Card, Input, Select, Button, Typography, Space, Form, Badge } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';


const ProductItem = ({ item, onRemove, onQtyChange }) => {
    const { Title, Text } = Typography;
    const { Option } = Select;
  return (
    <Card bodyStyle={{ padding: 14, position: 'relative' }} style={{ marginBottom: 12, borderRadius: 6 }}>
      <Button
        danger
        shape="circle"
        icon={<DeleteOutlined />}
        style={{ position: 'absolute', right: 14, top: 14 }}
        onClick={() => onRemove(item.id)}
      />

      <Row gutter={[12, 6]} align="middle">
        <Col xs={24} sm={12} md={8}>
          <div>
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
              <Text code>{item.sku}</Text>
            </div>
          </div>
        </Col>

        <Col xs={24} sm={12} md={10}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Input prefix={<Text>Tk.</Text>} value={item.price} style={{ width: 180 }} />
            <div>
              <Text strong>Subtotal</Text>
              <div>{(item.price * item.qty).toFixed(2)}</div>
            </div>
          </div>
        </Col>

        <Col xs={24} md={6} style={{ textAlign: 'right' }}>
          <Text>Qty</Text>
          <Input type="number" min={1} value={item.qty} onChange={(e) => onQtyChange(item.id, Number(e.target.value))} style={{ width: 100, marginLeft: 8 }} />
        </Col>
      </Row>
    </Card>
  );
};

export default ProductItem

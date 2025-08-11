import React from 'react';
import { Card, Row, Col, Input, Typography, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const { Text } = Typography;

export default function ProductItem({ item, onRemove, onQtyChange }) {
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
          <Text strong>Name </Text><Text> {item.name}</Text>
          <div><Text>Size </Text>{item.size}</div>
          <div><Text>Color </Text>{item.color || 'Not found'}</div>
          <div><Text>Available Stock </Text>{item.stock} Units</div>
          <div><Text>SKU </Text><Text code>{item.sku}</Text></div>
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
}

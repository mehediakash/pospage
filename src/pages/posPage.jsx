import React, { useMemo, useState } from 'react'
import { Row, Col, Card, Input, Select, Button, Typography, Space, Form, Badge } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import Title from 'antd/es/skeleton/Title';
import LabeledInput from '../Components/LabeledInput';
import ProductItem from '../Components/ProductItem';

const POSPage = () => {
    const { Title, Text } = Typography;
const { Option } = Select;
      const [invoice] = useState('17548141805247ADEF5');
  const [productQuery, setProductQuery] = useState('');
  const [customerQuery, setCustomerQuery] = useState('');
  const [discountType, setDiscountType] = useState('fixed');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [vatAmount, setVatAmount] = useState(0);

  const [products, setProducts] = useState([
    { id: 1, name: 'Charger', size: 'S', color: '', stock: 10, sku: '00031 00032', price: 2000, qty: 2 },
    { id: 2, name: 'Charger', size: 'M', color: '', stock: 17, sku: '00021 00022', price: 2000, qty: 2 },
  ]);

  const removeItem = (id) => setProducts((p) => p.filter((x) => x.id !== id));
  const changeQty = (id, qty) => setProducts((p) => p.map(x => x.id === id ? {...x, qty: Math.max(1, qty)} : x));

  const totals = useMemo(() => {
    const mrp = products.reduce((s, p) => s + p.price * p.qty, 0);
    const vat = Number(vatAmount) || 0;
    const disc = Number(discountAmount) || 0;
    const total = mrp + vat - disc;
    const itemsCount = products.length;
    const totalQty = products.reduce((s,p)=> s + p.qty, 0);
    return { mrp, vat, disc, total, itemsCount, totalQty };
  }, [products, vatAmount, discountAmount]);
  return (
    <div>
      <div style={{ padding: 18 }}>
      <Title level={4}>Product & Customer Navigation</Title>

      <Row gutter={16}>
        <Col xs={24} lg={16}>
          <Card style={{ borderRadius: 8 }}>
            <Row gutter={[12, 12]}>
              <Col xs={24} md={8}>
                <LabeledInput label="Invoice Number">
                  <Input value={invoice} readOnly />
                </LabeledInput>
              </Col>

              <Col xs={24} md={8}>
                <LabeledInput label="Search By Product Name/Barcode">
                  <Input placeholder="Name/Barcode" value={productQuery} onChange={(e)=>setProductQuery(e.target.value)} />
                </LabeledInput>
              </Col>

              <Col xs={24} md={8}>
                <LabeledInput label="Search Customer Name/Phone">
                  <Input placeholder="Name / Phone" value={customerQuery} onChange={(e)=>setCustomerQuery(e.target.value)} />
                </LabeledInput>
              </Col>

              <Col xs={24} md={6}>
                <LabeledInput label="Select Discount Type">
                  <Select value={discountType} onChange={setDiscountType} style={{ width: '100%' }}>
                    <Option value="fixed">Fixed</Option>
                    <Option value="percent">Percent</Option>
                  </Select>
                </LabeledInput>
              </Col>

              <Col xs={24} md={6}>
                <LabeledInput label="Enter The Discount Amount">
                  <Input placeholder="Enter the discount amount" value={discountAmount} onChange={(e)=>setDiscountAmount(e.target.value)} />
                </LabeledInput>
              </Col>

              <Col xs={24} md={6}>
                <LabeledInput label="Enter The VAT Amount">
                  <Input placeholder="Enter the VAT amount" value={vatAmount} onChange={(e)=>setVatAmount(e.target.value)} />
                </LabeledInput>
              </Col>

            </Row>

            <div style={{ marginTop: 18 }}>
              <Title level={5}>Products Information</Title>

              {products.map(item => (
                <ProductItem key={item.id} item={item} onRemove={removeItem} onQtyChange={changeQty} />
              ))}
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card style={{ borderRadius: 8 }}>
            <Title level={5}>Customer's Information</Title>
            <Row gutter={[8,8]}>
              <Col span={12}><LabeledInput label="Phone"><Input readOnly placeholder="Not found" /></LabeledInput></Col>
              <Col span={12}><LabeledInput label="Membership ID"><Input readOnly placeholder="Not found" /></LabeledInput></Col>
              <Col span={12}><LabeledInput label="Point"><Input readOnly placeholder="0" /></LabeledInput></Col>
              <Col span={12}><LabeledInput label="Point Amount"><Input readOnly placeholder="0.00" /></LabeledInput></Col>
            </Row>

            <div style={{ marginTop: 18 }}>
              <Title level={5}>Summary</Title>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <Text>Maximum Retail Price (MRP)</Text>
                <Text strong>{totals.mrp.toFixed(2)}</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <Text>(+) Vat/Tax</Text>
                <Text>{totals.vat.toFixed(2)}</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <Text>(-) Discount</Text>
                <Text>{totals.disc.toFixed(2)}</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <Text>Number Of Items</Text>
                <Text>{totals.itemsCount}</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <Text>Total Items Quantity</Text>
                <Text>{totals.totalQty}</Text>
              </div>

              <div style={{ padding: 12, border: '1px solid #eee', borderRadius: 6, marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text strong>Total Payable Amount</Text>
                  <Text strong>{totals.total.toFixed(2)}</Text>
                </div>

                <Row gutter={8} style={{ marginTop: 12 }}>
                  <Col span={4}>
                    <Button icon={<PlusOutlined />} />
                  </Col>
                  <Col span={14}>
                    <Select placeholder="Choose the method" style={{ width: '100%' }}>
                      <Option value="cash">Cash</Option>
                      <Option value="card">Card</Option>
                      <Option value="bkash">Bkash</Option>
                    </Select>
                  </Col>
                  <Col span={6}>
                    <Input placeholder="Enter Payment amount" />
                  </Col>
                </Row>
              </div>

              <div>
                <Title level={5}>Addition Information</Title>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <Text>Payable Amount</Text>
                  <Text>{totals.total.toFixed(2)}</Text>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <Text>Total Received Amount</Text>
                  <Text>0.00</Text>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <Text>Change</Text>
                  <Text>0.00</Text>
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <Button danger style={{ flex: 1 }}>Cancel & Clear</Button>
                  <Button type="primary" style={{ flex: 1 }}>Add POS</Button>
                </div>
              </div>

            </div>

          </Card>
        </Col>
      </Row>



    </div>
    </div>
  )
}

export default POSPage

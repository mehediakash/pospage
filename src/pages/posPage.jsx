import React, { useMemo, useState } from 'react';
import { Row, Col, Card, Input, Select, Button, Typography, Space, Form, Badge, message, Popconfirm } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import Title from 'antd/es/skeleton/Title';
import LabeledInput from '../Components/LabeledInput';
import ProductItem from '../Components/ProductItem';
import { getProductByBarcode } from '../services/productService';

const POSPage = () => {
  const { Title, Text } = Typography;
  const { Option } = Select;
  const [invoice] = useState('1111111111111');
  const [productQuery, setProductQuery] = useState('');
  const [customerQuery, setCustomerQuery] = useState('');
  const [discountType, setDiscountType] = useState('fixed');
  const [searchLoading, setSearchLoading] = useState(false);

  const [discountAmount, setDiscountAmount] = useState(0);
  const [vatAmount, setVatAmount] = useState(0);
  const [token] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDEsIm5hbWUiOiJBbmFtdWwiLCJlbWFpbCI6Im1hbmFnZXJAZ21haWwuY29tIiwiYWRkcmVzcyI6IkN1cnJlbnQgQWRkcmVzcyIsInBob25lIjoiMDE3MjY1OTE2NjgiLCJyb2xlIjoiTUFOQUdFUiIsImF2YXRhciI6Imh0dHBzOi8vcmVzLmNsb3VkaW5hcnkuY29tL2Ryb3lqaXF3Zi9pbWFnZS91cGxvYWQvdjE2OTY4MDE4MjcvZG93bmxvYWRfZDZzOGJpLmpwZyIsImJyYW5jaCI6MjYsImJyYW5jaEluZm8iOnsiaWQiOjI2LCJicmFuY2hOYW1lIjoiTW90aWppbF9SQiIsImJyYW5jaExvY2F0aW9uIjoiTW90aWppbCIsImR1ZSI6MCwiYWRkcmVzcyI6Ik5hcmF5YW5nYW5qIiwicGhvbmUiOiIwMTcyNjU5MTY2NiIsImhvdGxpbmUiOiIwMTIzNDIxMzQxMiIsImVtYWlsIjoibWFuYWdlckBnbWFpbC5jb20iLCJvcGVuSG91cnMiOm51bGwsImNsb3NpbmdIb3VycyI6bnVsbCwic3RvY2tBZGp1c3RtZW50Ijp0cnVlLCJ0eXBlIjoiQnJhbmNoIn0sImlhdCI6MTc1NDgxNDE3NSwiZXhwIjoxNzU2MTEwMTc1fQ.gwXMSWq7W6ZLdaCodBduNCWOLC_yaXi17E7wQDGhkDo'); 

  const [products, setProducts] = useState([]);

const [payments, setPayments] = useState([{ method: 'cash', amount: 0 }
]);
const [paymentMethods, setPaymentMethods] = useState([
  { method: 'cash', amount: '' }
]);
const [changeAmount, setChangeAmount] = useState(0);




const handleSearchProduct = async (barcode) => {
  if (!barcode.trim()) return;
  
  setSearchLoading(true);
  try {
    const response = await getProductByBarcode(barcode, token);
    if (response.data.success && response.data.data.length > 0) {
      const productData = response.data.data[0];
      addProductToCart(productData);

    } else {
      message.warning('No product found with this barcode');
    }
  } catch (error) {
    message.error('Failed to fetch product');
    console.error('Error fetching product:', error);
  } finally {
    setSearchLoading(false);
  }
};




const handleKeyPress = (e) => {
  if (e.key === 'Enter') {
    handleSearchProduct(productQuery);
  }
};


const handleAddPaymentMethod = () => {
  setPaymentMethods([...paymentMethods, { method: 'cash', amount: '' }]);
};

const handlePaymentMethodChange = (index, value) => {
  const updatedPayments = [...paymentMethods];
  updatedPayments[index].method = value;
  setPaymentMethods(updatedPayments);
};

const handlePaymentAmountChange = (index, value) => {
  const updatedPayments = [...paymentMethods];
  updatedPayments[index].amount = value;
  setPaymentMethods(updatedPayments);
  

  const totalReceived = paymentMethods.reduce((sum, payment) => {
    return sum + (parseFloat(payment.amount) || 0);
  }, 0);
  

  setChangeAmount(totalReceived - totals.total);
};
  const addProductToCart = (productData) => {
    const newProduct = {
      id: productData.id,
      name: productData.productName,
      size: productData.size,
      color: productData.color || 'N/A',
      stock: productData.stock,
      sku: productData.sku.slice(-5), 
      price: productData.discountPrice,
      sellPrice: productData.sellPrice,
      qty: 1,
      discountPrice: productData.discountPrice,
      originalPrice: productData.price,
      skus: [productData.sku.slice(-5)], 
    };

    setProducts(prevProducts => {
  
      const existingProductIndex = prevProducts.findIndex(
        p => p.price === newProduct.price && p.size === newProduct.size
      );

      if (existingProductIndex >= 0) {

        return prevProducts.map((product, index) => {
          if (index === existingProductIndex) {
            return {
              ...product,
              qty: product.qty + 1,
              skus: [...product.skus, newProduct.sku],
            };
          }
          return product;
        });
      } else {

        return [...prevProducts, newProduct];
      }
    });


  };



  const removeItem = (id) => {
    setProducts((p) => p.filter((x) => x.id !== id));
  };

  const changeQty = (id, qty) => {
    setProducts((p) => p.map(x => x.id === id ? {...x, qty: Math.max(1, qty)} : x));
  };

const removeSku = (productId, skuToRemove) => {
  setProducts(prevProducts => {
    return prevProducts.map(product => {
      if (product.id === productId) {

        const updatedSkus = product.skus.filter(sku => sku !== skuToRemove);
        

        if (updatedSkus.length === 0) {
          return null;
        }
        
   
        const updatedQty = updatedSkus.length;
        
        return {
          ...product,
          skus: updatedSkus,
          qty: updatedQty,
        };
      }
      return product;
    }).filter(Boolean); 
  });
};
  const calculateDiscount = (mrp) => {
    if (discountType === 'percent') {
      return mrp * (discountAmount / 100);
    }
    return Number(discountAmount) || 0;
  };

  const calculateVat = (mrp) => {
    return mrp * (vatAmount / 100);
  };

const totals = useMemo(() => {
  const mrp = products.reduce((s, p) => s + p.price * p.qty, 0);
  const disc = calculateDiscount(mrp);
  const vat = calculateVat(mrp - disc);
  const total = mrp - disc + vat;
  const itemsCount = products.length;
  const totalQty = products.reduce((s, p) => s + p.qty, 0);
  

  const paidAmount = payments.reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
  const change = paidAmount - total;
  
  return { 
    mrp, 
    vat, 
    disc, 
    total, 
    itemsCount, 
    totalQty,
    paidAmount,
    change
  };
}, [products, discountType, discountAmount, vatAmount, payments]);

  const handleClearCart = () => {
    setProducts([]);
    setDiscountAmount(0);
    setVatAmount(0);
    setDiscountType('fixed');
  };

const handleAddPOS = () => {
  const posData = {
    invoiceNumber: invoice,
    products: products.map(product => ({
      id: product.id,
      name: product.name,
      size: product.size,
      color: product.color,
      skus: product.skus,
      price: product.price,
      quantity: product.qty,
      subtotal: product.price * product.qty
    })),
    customerQuery,
    discount: {
      type: discountType,
      amount: discountAmount
    },
    vat: vatAmount,
    paymentMethods,
    totals: {
      subtotal: totals.mrp,
      discount: totals.disc,
      vat: totals.vat,
      total: totals.total
    },
    timestamp: new Date().toISOString()
  };

  console.log('POS Data:', posData);


};
  return (
    <div >
      <Title className='!mb-10' level={4}>Product & Customer Navigation</Title>

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
                  <Input.Search
      placeholder="Name/Barcode"
      value={productQuery}
      onChange={(e) => setProductQuery(e.target.value)}
      onPressEnter={handleKeyPress}
      loading={searchLoading}

      enterButton
    />
                </LabeledInput>
              </Col>

              <Col xs={24} md={8}>
                <LabeledInput label="Search Customer Name/Phone">
                  <Input 
                    placeholder="Name / Phone" 
                    value={customerQuery} 
                    onChange={(e) => setCustomerQuery(e.target.value)} 
                  />
                </LabeledInput>
              </Col>

              <Col xs={24} md={6}>
                <LabeledInput label="Select Discount Type">
                  <Select 
                    value={discountType} 
                    onChange={setDiscountType} 
                    style={{ width: '100%' }}
                  >
                    <Option value="fixed">Fixed</Option>
                    <Option value="percent">Percent</Option>
                  </Select>
                </LabeledInput>
              </Col>

              <Col xs={24} md={6}>
                <LabeledInput label="Enter  Discount Amount">
                  <Input 
                    type="number"
                    placeholder="Enter amount" 
                    value={discountAmount} 
                    onChange={(e) => setDiscountAmount(e.target.value)} 
                    addonAfter={discountType === 'percent' ? '%' : '৳'}
                  />
                </LabeledInput>
              </Col>

              <Col xs={24} md={6}>
                <LabeledInput label="Enter  VAT Amount">
                  <Input 
                    type="number"
                    placeholder="Enter VAT %" 
                    value={vatAmount} 
                    onChange={(e) => setVatAmount(e.target.value)} 
                    addonAfter="%"
                  />
                </LabeledInput>
              </Col>
            </Row>

            <div style={{ marginTop: 18 }}>
              <Title level={5}>Products Information</Title>

              {products.map(item => (
                <ProductItem 
                  key={item.id} 
                  item={item} 
                  onRemove={removeItem} 
                  onQtyChange={changeQty}
                  onRemoveSku={removeSku}
                />
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
                <Text>(-) Discount</Text>
                <Text>{totals.disc.toFixed(2)}</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <Text>(+) Vat/Tax</Text>
                <Text>{totals.vat.toFixed(2)}</Text>
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

  {paymentMethods.map((payment, index) => (
    <Row gutter={8} style={{ marginTop: 12 }} key={index}>
      <Col span={4}>
        {index === 0 && (
          <Button icon={<PlusOutlined />} onClick={handleAddPaymentMethod} />
        )}
      </Col>
      <Col span={14}>
        <Select 
          value={payment.method}
          onChange={(value) => handlePaymentMethodChange(index, value)}
          style={{ width: '100%' }}
        >
          <Option value="cash">Cash</Option>
          <Option value="card">Card</Option>
          <Option value="bkash">Bkash</Option>
        </Select>
      </Col>
      <Col span={6}>
        <Input 
          placeholder="Amount" 
          value={payment.amount}
          onChange={(e) => handlePaymentAmountChange(index, e.target.value)}
        />
      </Col>
    </Row>
  ))}


  <div style={{ marginTop: 12 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
      <Text>Total Received</Text>
      <Text>
        {paymentMethods.reduce((sum, payment) => sum + (parseFloat(payment.amount) || 0), 0).toFixed(2)}
      </Text>
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Text>Change</Text>
      <Text>
        {changeAmount > 0 ? changeAmount.toFixed(2) : '0.00'}
      </Text>
    </div>
  </div>
</div>
              <div>
                <Title level={5}>Addition Information</Title>
  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
    <Text>Payable Amount</Text>
    <Text>{totals.total.toFixed(2)}</Text>
  </div>
  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
    <Text>Total Received Amount</Text>
    <Text>
    {paymentMethods
    .reduce((sum, payment) => sum + (parseFloat(payment.amount) || 0), 0)
    .toFixed(2)}
    </Text>
  </div>
  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
    <Text>Change</Text>
    <Text>
      {changeAmount > 0 ? changeAmount.toFixed(2) : '0.00'}
    </Text>
  </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <Popconfirm
                    title="Are you sure you want to clear the cart?"
                    onConfirm={handleClearCart}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button danger style={{ flex: 1 }}>Cancel & Clear</Button>
                  </Popconfirm>
                  <Button 
  type="primary" 
  style={{ flex: 1 }}
  onClick={handleAddPOS}
  disabled={products.length === 0}
>
  Add POS
</Button>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default POSPage;
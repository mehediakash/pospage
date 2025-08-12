
import React from 'react';
import { Button, Popconfirm } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

const ProductInfoCard = ({ product, onRemoveProduct, onRemoveSku }) => {
  const {
    productName,
    size,
    color,
    stock,
    skus,
    discountPrice,
    sellPrice,
    quantity,
  } = product;

  const subtotal = discountPrice * quantity;

  return (
    <div className="product-info-card">
      <div className="product-details">
        <p><strong>Name:</strong> {productName}</p>
        <p><strong>Size:</strong> {size}</p>
        <p><strong>Color:</strong> {color || 'N/A'}</p>
        <p><strong>Available Stock:</strong> {stock}</p>
        <div className="sku-container">
          <strong>SKU:</strong>
          {skus.map((sku, index) => (
            <span key={index} className="sku-tag">
              {sku.slice(-5)}
              <Popconfirm
                title="Are you sure you want to remove this SKU?"
                onConfirm={() => onRemoveSku(product.id, sku)}
                okText="Yes"
                cancelText="No"
              >
                <CloseOutlined className="remove-sku-icon" />
              </Popconfirm>
            </span>
          ))}
        </div>
      </div>
      <div className="product-pricing">
        <p><strong>Price:</strong> {discountPrice}</p>
        <p><strong>Sell Price:</strong> <del>{sellPrice}</del></p>
        <p><strong>Quantity:</strong> {quantity}</p>
        <p><strong>Subtotal:</strong> {subtotal.toFixed(2)}</p>
      </div>
      <Popconfirm
        title="Are you sure you want to remove this product?"
        onConfirm={() => onRemoveProduct(product.id)}
        okText="Yes"
        cancelText="No"
      >
        <Button type="primary" danger icon={<CloseOutlined />} />
      </Popconfirm>
    </div>
  );
};

export default ProductInfoCard;

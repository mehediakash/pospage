import React from 'react';
import { Card } from 'antd';

export default function SmallCard({ title, children, style }) {
  return (
    <Card size="small" title={title} style={{ borderRadius: 6, ...style }}>
      {children}
    </Card>
  );
}

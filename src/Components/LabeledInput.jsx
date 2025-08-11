import { Select, Typography } from 'antd';
import React from 'react'

const LabeledInput = ({ label, children, style }) => {
    const { Title, Text } = Typography
    const { Option } = Select;
      return (
    <div style={{ marginBottom: 12, ...style }}>
    <Text strong style={{ display: 'block', marginBottom: 6 }}>{label}</Text>
    {children}
  </div>
  )

}




export default LabeledInput
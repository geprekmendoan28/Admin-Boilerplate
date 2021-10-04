import { Spin } from 'antd';
import React from 'react';

function LoadingAdd() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 500,
        width: '100%',
      }}
    >
      <Spin />
    </div>
  );
}

export default LoadingAdd;

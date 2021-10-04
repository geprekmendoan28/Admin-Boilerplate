import React from 'react';
import { Spin } from 'antd';
function Loading() {
  return (
    <div className="loaders">
      <Spin size="large" />
    </div>
  );
}
export default Loading;

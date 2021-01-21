import React from 'react';
import { Spin } from 'antd';
import './index.less';

const Loading: React.FC = function Loading() {
  return (
    <div className="spin_wrapper">
      <Spin/>
    </div>
  )
}

export default Loading;
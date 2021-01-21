import React from 'react';
import {
  Result,
  Button
} from 'antd';

const Illegal: React.FC = function Illegal(props: any) {
  return (
    <div>
      <Result
        status="403"
        title="403"
        subTitle="权限不够，无法查看该内容!"
        extra={<Button type="primary" onClick={() => { props.history.push('/home')}}>返回主页</Button>}
      />
    </div>
  )
}

export default Illegal;
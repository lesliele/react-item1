import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import {
  IStore
} from '@/store/reducers/index'
import {
  useSelector
} from 'react-redux';
import {
  Link
} from 'react-router-dom';

const Crumb: React.FC = function Crumb() {
  let getData = (state: IStore) => state.route.breadData;
  let currentData = useSelector(getData);
  return (
    <div>
      <Breadcrumb style={{ margin: '16px 0' }}>
        {
          currentData.map(item => {
            return <Breadcrumb.Item key={item.key}>{item.title}</Breadcrumb.Item>
          })
        }
      </Breadcrumb>
    </div>
  )
}

export default Crumb;
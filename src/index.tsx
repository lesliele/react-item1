import React from 'react';
import ReactDOM from 'react-dom';
import store from './store/index';
import {
  Provider
} from 'react-redux';
import { ConfigProvider } from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/lib/locale/zh_CN';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
import './index.css';
import App from './router/route';

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <App/>
    </Provider>
  </ConfigProvider>,
  document.getElementById('root')
);

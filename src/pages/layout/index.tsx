import React, { useEffect } from 'react';
import MainHeader from './header';
import Crumb from './crumb';
import LeftSide from './leftSide';
import SubRoute from '@/router/subRoute';

import { Layout, Menu } from 'antd';
import action from '@/store/actions/index'
import {
  connect
} from 'react-redux';
import RouteConf from '@/router/mergeRoute';
import {
  findMenuPath
} from '@/router/getRoute'

const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;

const MainLayout: React.FC = function MainLayout(props: any) {
  let {
    history,
    location
  } = props;
  useEffect(() => {
    // 首次进入 获取menu，自动跳转回上次的路由
    // let lastMenu = localStorage.getItem('menu');
    // if (lastMenu) props.history.push(lastMenu);
  }, []);
  useEffect(() => {
    // 设置当前的路由
    // localStorage.setItem('menu', location.pathname);
    props.handleRoute(location.pathname)
  })
  return (
    <div>
      <Layout>
        <MainHeader history={history}/>
        <Content style={{ padding: '0 50px' }}>
          <Crumb/>
          <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
            <LeftSide/>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <SubRoute/>
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </div>
  )
}

export default connect(null, action.route)(MainLayout);
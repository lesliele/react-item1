import React from 'react';
import { Layout, Menu, Dropdown  } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import {
  connect
} from 'react-redux';
import {
  IStore
} from '@/store/reducers/index';
import action from '@/store/actions/index';
const { Header } = Layout;
interface IProps {
  history: any,
  [key: string]: any
}
const MainHeader: React.FC<IProps> = function MainHeader(props: IProps) {
  const {
    user,
    logout,
    history
  } = props;
  const menu = (
    <Menu>
      <Menu.Item onClick={() => {
        history.push('/user-edit');
      }}>
        <span>账号设置</span>
      </Menu.Item>
      <Menu.Item onClick={() => {
        logout(() => {
          history.push('/login');
        });
      }}>
        <span style={{ cursor: 'pointer' }}>退出登录</span>
      </Menu.Item>
    </Menu>
  );
  return (
    <div>
      <Header className="header" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <span style={{color: '#fff', fontSize: 18}}>学院系统</span>
        <Dropdown overlay={menu} trigger={['click']}>
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            {user.username} <DownOutlined />
          </a>
        </Dropdown>
      </Header>
    </div>
  )
}

export default connect((state: IStore) => {
  return {
    user: state.user
  }
}, action.user)(MainHeader);
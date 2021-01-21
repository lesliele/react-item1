import React, { useMemo, useState, useEffect } from 'react';
import { Layout, Breadcrumb, Menu } from 'antd';
import { routes, menuItem } from '@/router/routeConf';
import {
  Link
} from 'react-router-dom';
import {
  useSelector,
  connect
} from 'react-redux';
import action from '@/store/actions/index';
import {
  IStore
} from '@/store/reducers/index'


const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
interface Ikey {
  key: string
}
const LeftSide: React.FC = function LeftSide(props: any) {
  let getData = (state: IStore) => state.route.routeData;
  let currentData = useSelector(getData);
  const [openKey, setOpenKey] = useState<any[]>([]);
  const [selectKey, setSelectKey] = useState<any[]>([]);

  useEffect(() => {
    setTimeout(() => {
      if (currentData.length === 1) {
        setSelectKey(currentData);
      } else {
        setOpenKey([currentData[0]]);
        setSelectKey([currentData[1]]);
      }
    }, 100);
  }, [currentData]);

  const handleTitleKey = ({ key }: Ikey) => {
    props.handleRoute(key)
  }
  const handleOpen = (openKeys: any) => {
    setOpenKey(openKeys);
  }
  const calcMenu = function calcMenu(data: Array<menuItem>) {
    return data.map(item => {
      if (item.children) {
        return <SubMenu key={item.key} title={item.title} onTitleClick={handleTitleKey}>
          {calcMenu(item.children)}
        </SubMenu>
      } else {
        return !item.isRequired ? 
        (<Menu.Item key={item.key}>
          <Link to={item.key}>{item.title}</Link>
        </Menu.Item>) : 
        (props.info.isAdmin ? <Menu.Item key={item.key}>
          <Link to={item.key}>{item.title}</Link>
        </Menu.Item> : null)
      }
    })
  }
  const menuData = useMemo(() => {
    return calcMenu(routes)
  }, [routes]);
  return (
    <div>
      <Sider className="site-layout-background" width={200}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['/home']}
          openKeys={openKey}
          selectedKeys={selectKey}
          style={{ height: '100%' }}
          onOpenChange={handleOpen}
        >
          {menuData}
        </Menu>
      </Sider>
    </div>
  )
}

export default connect((state: IStore) => {
  return {
    info: state.user
  }
}, action.route)(LeftSide);
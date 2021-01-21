import {
  getInitMenuObj,
  menuItem
} from '@/router/routeConf';
import {
  IAction
} from './index'

export interface Idefault {
  breadData: Array<menuItem>,
  routeData: Array<string>
}

const defaultState: Idefault = {
  breadData: [
    {
      title: '主页',
      key: '/home'
    }
  ],
  routeData: ['/home']
}

const routeReducer = function routeReducer(state: Idefault, action: IAction): Idefault {
  const menuData = getInitMenuObj();
  let lastRouteData = sessionStorage.getItem('routeData');
  let lastBreadData = sessionStorage.getItem('breadData');
  let defaultValue;
  if (lastRouteData && lastBreadData) {
    defaultValue = {
      breadData: JSON.parse(lastBreadData),
      routeData: JSON.parse(lastRouteData)
    };
  }
  state = state || defaultValue || defaultState;
  if (action.type === 'routeChange') {
    if (action.payload in menuData) {
      const currentMenu = menuData[action.payload];
      let data;
      if (currentMenu.length === 1) {
        data = currentMenu.map(item => item.key);
      } else {
        data = [currentMenu[0].key, currentMenu[currentMenu.length - 1].key];
      }
      // 设置所属菜单以及子菜单
      sessionStorage.setItem('breadData', JSON.stringify(currentMenu));
      sessionStorage.setItem('routeData', JSON.stringify(data));
      return {
        breadData: currentMenu,
        routeData: data
      }
    } else {
      return { ...state };
    }
  }
  return { ...state };
}

// 点击路由 => 获取当前路由 => 处理数据 => 页面获取数据
export default routeReducer;
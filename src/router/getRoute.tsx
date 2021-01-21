// 不需要
import React from 'react';
import {
  Route
} from 'react-router-dom';

interface ConfItem {
  path: string,
  component: any,
  isExact?: boolean,
  children?: Array<ConfItem>
}
export const getAllRoutes = (config: Array<ConfItem>) => {
  let result: Array<any> = [];
  const getRoute = (config: Array<ConfItem>) => {
    config.forEach((item: ConfItem) => {
      result.push(<Route path={item.path} exact={item.isExact} component={item.component} key={item.path}></Route>);
      if (item.children) getRoute(item.children);
    })
  }
  getRoute(config);
  return result;
}

export const routeRelateMap = (config: Array<ConfItem>) => {
  let routeMap: any = {};
  const getPath = (config: Array<ConfItem>, path: string) => {
    config.forEach((item: ConfItem) => {
      if (item.children) {
        (routeMap[item.path] = []);
        routeMap[item.path].push(item.path);
        getPath(item.children, item.path);
      } else {
        if (path === '') path = item.path;
        (routeMap[path] || (routeMap[path] = [])).push(item.path);
      }
    })
  }
  getPath(config, '');
  return routeMap;
}

export const findMenuPath = (config: Array<ConfItem>, path: string) => {
  let allPath = routeRelateMap(config);
  let result:string = '';
  for (let k in allPath) {
    allPath[k].forEach((p: any) => {
      let str = p.replace(/\:\S+/, '');
      if (path.indexOf(str) > -1) {
        result = k;
      }
    })
  }
  return result;
}
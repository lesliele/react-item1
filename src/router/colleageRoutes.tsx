import React from 'react';
import { 
  Switch,
  Route
} from 'react-router-dom';
import {
  getAllRoutes,
  routeRelateMap,
  findMenuPath
} from './getRoute';

const YuCom = React.lazy(() => import(/* webpackChunkName: 'yu' */'@/pages/colleage/yu/index'));
const YuComPage = React.lazy(() => import(/* webpackChunkName: 'page-form' */'@/pages/colleage/yu/page-form'));
const MathCom = React.lazy(() => import(/* webpackChunkName: 'math' */'@/pages/colleage/math/index'));

export const Conf = [
  {
    path: '/colleage/yu',
    component: YuCom,
    isExact: true,
    children: [
      {
        path: '/colleage/yu/yu-add',
        component: YuComPage,
      },
      {
        path: '/colleage/yu/yu-edit/:id',
        component: YuComPage,
      }
    ]
  },
  {
    path: '/colleage/math',
    component: MathCom,
    isExact: true,
  }
];
const HomeRoutes: React.FC = function HomeRoutes (props) {
  return (<>
    <Switch>
      {getAllRoutes(Conf)}
    </Switch>
  </>)
}

export default HomeRoutes;

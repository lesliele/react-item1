import React from 'react';
import {
  Route,
  Redirect
} from 'react-router-dom'

interface IRouteProps {
  path: string,
  component: any
}
interface IUserProps {
  info: any,
  [key: string]: any
}
export const ProtectRoute = function ProtectRoute(props: IUserProps) {
  const isAdmin = props.info.isAdmin;
  return function (routeProps: IRouteProps) {
    let {
      path,
      component
    } = routeProps;
    return (isAdmin ? <Route path={path} component={component}></Route> : <Redirect to="/illegal"></Redirect>)
  }
}
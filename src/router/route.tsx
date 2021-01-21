import React from 'react';
import {
  HashRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Loading from '../component/common/loading';

const Layout = React.lazy(() => import(/* webpackChunkName: 'layout' */'@/pages/layout/index'));
const Login = React.lazy(() => import(/* webpackChunkName: 'login' */'@/pages/login/index'));
const Register = React.lazy(() => import(/* webpackChunkName: 'register' */'@/pages/register/index'));
const Illegal = React.lazy(() => import(/* webpackChunkName: 'illegal' */'@/pages/common/illegal'));
interface protectProps{
  isMain: boolean,
  path: string,
  component: any
}
const App: React.FC = function App() {
  const ProtectRoot: React.FC<protectProps> = function ProtectRoot(props: protectProps) {
    let {
      path,
      component,
      isMain
    } = props;
    const getData = localStorage.getItem('userInfo');
    let user = {id: 0};
    if (getData) {
      user = JSON.parse(getData);
    }
    if (isMain) {
      return (user.id ? <Route path={path} component={component}></Route> : <Redirect to="/login"></Redirect>);
    } else {
      return (user.id ? <Redirect to="/home"></Redirect> : <Route path={path} component={component}></Route>);
    }
  }
  return <>
    <React.Suspense fallback={<Loading />}>
      <HashRouter>
        <Switch>
          <ProtectRoot path="/login" component={Login} isMain={false}></ProtectRoot>
          <ProtectRoot path="/register" component={Register} isMain={false}></ProtectRoot>
          <Route path="/illegal" component={Illegal}></Route>
          <ProtectRoot path="/" component={Layout} isMain={true}></ProtectRoot>
        </Switch>
      </HashRouter>
    </React.Suspense>
  </>
}

export default App;
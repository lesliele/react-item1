import React from 'react';
import {
  Switch,
  Route
} from 'react-router-dom'
import {
  connect
} from 'react-redux';
import {
  IStore
} from '@/store/reducers/index'
import {
  ProtectRoute
} from './rootProtect';

const Home = React.lazy(() => import(/* webpackChunkName: 'home' */'../pages/home/index'));
const Colleage = React.lazy(() => import(/* webpackChunkName: 'home' */'../pages/colleage/index'));
const NotFound = React.lazy(() => import(/* webpackChunkName: 'home' */'../pages/common/notFound'));
const StudentList = React.lazy(() => import(/* webpackChunkName: 'student' */'../pages/student/index'));
const UserEdit = React.lazy(() => import(/* webpackChunkName: 'user-edit' */'../pages/user/user-edit'));
const TeacherPaln = React.lazy(() => import(/* webpackChunkName: 'teacher-plan' */'../pages/teacher/teacher-plan'));
const Exam = React.lazy(() => import(/* webpackChunkName: 'exam' */'../pages/exam/index'));

const subRoute: React.FC = function subRoute(props: any) { 
  const ProtectCom = ProtectRoute(props); //初始化用户信息 => 进行权限控制
  return (<>
    <Switch>
      <Route path="/" exact component={Home}></Route>
      <Route path="/home" component={Home}></Route>
      <Route path="/colleage" component={Colleage}></Route>
      <ProtectCom path="/studentList" component={StudentList}></ProtectCom>
      <Route path="/user-edit" component={UserEdit}></Route>
      <Route path="/teacher-plan" component={TeacherPaln}></Route>
      <Route path="/exam" component={Exam}></Route>
      <Route path="/*" component={NotFound}></Route>
    </Switch>
  </>)
}

export default connect((state: IStore) => {
  return {
    info: state.user
  }
})(subRoute);
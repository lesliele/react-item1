import {
  combineReducers
} from 'redux';

import route, {
  Idefault
} from './routeReducer';
import userReducer, {
  IUserDefault
} from './userReducer';

export interface IStore{
  route: Idefault,
  user: IUserDefault
}
export interface IAction {
  type: string,
  payload: any
}

export default combineReducers({
  route: route,
  user: userReducer
});
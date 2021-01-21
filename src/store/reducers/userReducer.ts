import {
  IAction
} from './index';
import {
  SAVE_USER,
  LOG_OUT
} from '../action-types.js'

export interface IUserDefault{
  userId: string,
  id: string,
  username: string,
  address: string,
  mobile: string,
  isAdmin?: boolean
}

const initialState: IUserDefault = {
  userId: '',
  id: '',
  username: '',
  address: '',
  mobile: ''
}

function userReducer(state: IUserDefault | null, action: IAction) {
  let storageState = localStorage.getItem('userInfo');
  let defaultState;
  if (storageState) {
    defaultState = JSON.parse(storageState);
  }
  state = state || defaultState || initialState;
  if (action.type === SAVE_USER) {
    state = {
      userId: action.payload.userId,
      id: action.payload.id,
      username: action.payload.username,
      address: action.payload.address,
      mobile: action.payload.mobile
    }
    if (action.payload.username === 'admin') state.isAdmin = true;
    localStorage.setItem('userInfo', JSON.stringify(state));
  } else if (action.type === LOG_OUT) {
    state = null;
    localStorage.setItem('userInfo', '');
  }
  return {
    ...state
  }
}

export default userReducer;
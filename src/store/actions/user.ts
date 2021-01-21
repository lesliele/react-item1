import {
  SAVE_USER,
  LOG_OUT
} from '../action-types.js';
import {
  IUserDefault
} from '../reducers/userReducer';
import {
  Dispatch
} from 'redux';
import Ajax from '@/http/ajax';
import Http from '@/http/http';
import store from '../index';
import {
  IStore
} from '../reducers/index'
import {
  notification
} from 'antd';

const userAction = {
  saveUser(info: IUserDefault) {
    return {
      type: SAVE_USER,
      payload: info
    }
  },
  logout(callback: () => void) {
    const state: IStore = store.getState();
    return (dispatch: Dispatch) => {
      const key = `sign${Date.now()}`;
      notification.warning({
        message: '温馨提示',
        description: '正在登出中...',
        key
      });
      Ajax.post(Http.userLogout,{}, {
        headers: {
          'authorization': state.user.id
        }
      }).then(() => {
        notification.close(key);
        dispatch({
          type: LOG_OUT
        });
        callback();
      })
    }
  }
}

export default userAction;
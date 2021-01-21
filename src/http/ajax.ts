import Axios, {
  AxiosResponse
}  from 'axios';
import SHA1 from 'sha1';
import {
  message
} from 'antd';

const ajax = Axios.create({
  baseURL: 'https://d.apicloud.com/mcm/api'
})

ajax.interceptors.request.use(config => {
  var now = Date.now();
  var appKey = SHA1("A6156256077136" + "UZ" + "5A1C45FC-7FE9-42F3-FF4C-8B4F62861A3D" + "UZ" + now) + "." + now;

  config['headers']['X-APICloud-AppId'] = "A6156256077136";
  config['headers']['X-APICloud-AppKey'] = appKey;
  return config;
})

ajax.interceptors.response.use((response: AxiosResponse) => {
  return response.data;
}, reason => {
  let response = reason.response;
  if (response) {
    switch (response.status) {
      case 400:
        message.error('参数缺失!');
        break;
      case 401:
        message.error(response.statusText);
        break;
      case 404:
        message.error('找不到对应的接口!');
        break;
      case 500:
        message.error('服务器错误!');
        break;
      default:
        break;
    }
  } else {
    message.error('网络出错!');
  }
})

export default ajax;
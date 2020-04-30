import axios from 'axios';
import history from './history';
import {message} from 'antd';

const appID = '1sWsH7UDDDZazp57zzUaQgoH';
const appSecret = 'HLXMzJHYAaPqQ1ipSJQFLfPh';

const instance = axios.create({
  baseURL: 'https://gp-server.hunger-valley.com/',
  headers: {
    't-app-id': appID,
    't-app-secret': appSecret
  }
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  const xToken = localStorage.getItem('x-token');
  if (xToken) {
    config.headers['Authorization'] = `Bearer ${xToken}`;
  }
  return config;
}, function (error) {
  console.error(error);
  return Promise.reject(error);
});

// Add a response interceptor 拦截器
instance.interceptors.response.use(function (response) {
  // Do something with response data
  if (response.headers['x-token']) {
    localStorage.setItem('x-token', response.headers['x-token']);
  }
  return response;
}, function (error) {
  // Do something with response error
  if (error.response.status === 401) {
    history.push('/login');
  } else if (error.response.status === 422 && error.response.data.errors === '账号或密码错误') {
    message.error(error.response.data.errors);
  } else if (error.response.status === 422 && error.response.data.errors.account[0] === 'has already been taken') {
    message.error('用户名已存在');
  }
  return Promise.reject(error);
});

export default instance;
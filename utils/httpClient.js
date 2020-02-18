/**
 * Created by jithin on 30/12/19.
 */
import axios from 'axios';
import get from 'lodash/get';
import storage from './storage';
console.log(process.env.PORT);
const instance = axios.create({
  baseURL: '',
});

instance.interceptors.request.use(async request => {
  const token = await storage.getItem('token');
  if (!request.headers.common['x-auth'] && token) {
    request.headers.common['x-auth'] = token;
  }
  return request;
});

instance.interceptors.response.use(null, error => {
  const status = get(error, 'response.status');
  const errorKey = get(error, 'response.data.errorKey');
  const message = get(error, 'response.data.message');
  const payload = get(error, 'response.data.payload');
  let errorToShow = '';
  // general error message
  //console.log('printing errorkey, payload', errorKey, payload);
  //let errorToShow = new Error(
  //    `Oops! Something went wrong. Please contact customer support for further assistance.`,
  //);

  if (status === 401) {
    errorToShow = new Error('Your session has expired. Please login again.');
  } else if (status === 422) {
    // errors to show on UI
    errorToShow = new Error('refresh');
  } else {
    // console.log(message);
  }

  return Promise.reject(errorToShow);
});

export const setAccessTokenHeader = accessToken => {
  instance.defaults.headers.common['x-auth'] = accessToken;
};

export const deleteAccesTokenHeader = () => {
  instance.defaults.headers.common['x-auth'] = null;
};

export const getAccesTokenFromHeader = () => instance.defaults.headers.common['x-auth'];

export default instance
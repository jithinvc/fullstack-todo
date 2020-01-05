/**
 * Created by jithin on 30/12/19.
 */
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:4004',
});

instance.interceptors.response.use(null, error => {
  const status = get(error, 'response.status');
  const errorKey = get(error, 'response.data.errorKey');
  const message = get(error, 'response.data.message');
  const payload = get(error, 'response.data.payload');

  // general error message
  let errorToShow = new CustomError(
      'Oops! Something went wrong. Please contact customer support for further assistance.',
      errorKey,
      payload,
  );

  if (status === 401) {
    errorToShow = new Error('Your session has expired. Please login again.');
  } else if (status === 422) {
    // errors to show on UI
    errorToShow = new CustomError(message, errorKey, payload);
  } else {
    // console.log(message);
  }

  return Promise.reject(errorToShow);
});

export default instance
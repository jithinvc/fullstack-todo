/**
 * Created by jithin on 26/01/20.
 */
import axios, { setAccessTokenHeader, getAccesTokenFromHeader, deleteAccesTokenHeader } from '../../utils/httpClient';
import storage from '../../utils/storage';
import history from '../../utils/history';

const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';
const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
const USER_SIGNUP_REQUEST = 'USER_SIGNUP_REQUEST';
const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS';
const USER_SIGNUP_FAILURE = 'USER_SIGNUP_FAILURE';
const initialState = {
  isUserLoggingIn: false
};


export const login = (email, password) => async dispatch => {
  const user = { email, password };
  dispatch({type: USER_LOGIN_REQUEST, payload: user });
  try {
    const loggedInUser = await axios.post('api/user/login', user);
    //const { token } = loggedInUser.data;

    dispatch({type: USER_LOGIN_SUCCESS, payload: loggedInUser })
  }
  catch (error) {
    dispatch({type: USER_LOGIN_FAILURE, payload: error })
  }
};

export const signUp = (email, password, name) => async dispatch => {
  const user = { email, password, name };
  dispatch({type: USER_SIGNUP_REQUEST, payload: user });
  try {
    const savedUser = await axios.post('api/user/signUp', { user });
    const { token } = savedUser.data;
    await storage.setItem('token', token);
    await storage.setItem('user', JSON.stringify(savedUser.data.user));
    setAccessTokenHeader(token);
    history.push('/todos');
    window.location && window.location.reload();

    dispatch(success(USER_SIGNUP_SUCCESS, savedUser.data.user));
    //dispatch(closeOverlay(SIGNUP_OVERLAY));
    //const { token } = loggedInUser.data;
    //dispatch({type: USER_SIGNUP_SUCCESS, payload: loggedInUser })
  }
  catch (error) {
    dispatch({type: USER_SIGNUP_FAILURE, payload: error })
  }
};

export default (state = { initialState }, { type, payload={} }) => {
  switch (type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        isUserLoggingIn: true,
        isUserLoggedIn: false
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        isUserLoggingIn: false,
        isUserLoggedIn: true
      };
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        isUserLoggingIn: false,
        isUserLoggedIn: false,
        errorMessage: payload.message
      };
    case USER_SIGNUP_REQUEST:
      return {
        ...state,
        isUserLoggedIn: false,
        isUserLoggingIn: true,
        errorMessage: ''
      };
    case USER_SIGNUP_SUCCESS:
      return {
        ...state,
        isUserLoggedIn: true,
        isUserLoggingIn: false,
        errorMessage: ''
      };
    case USER_SIGNUP_FAILURE:
      return {
        ...state,
        isUserLoggedIn: false,
        isUserLoggingIn: false,
        errorMessage: payload.message
      };
    default:
      return { ...state }
  }
}
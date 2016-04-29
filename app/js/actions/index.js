import * as actions from '../constants/ActionTypes';
import fetchData from '../utils/fetch';
import md5 from 'md5';

/**
 * 用户注册
 */
function register(redirect) {
  return {
    type: actions.REGISTER,
    redirect: redirect
  };
}

export function requestRegister(username, email, password, redirect) {
  return dispatch => {
    fetchData(dispatch, '/api/register', {
      method: 'post',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: md5(md5(password))
      })
    }, function () {
      dispatch(register(redirect));
    });
  };
}

/**
 * 用户登录
 */
function login(redirect) {
  return {
    type: actions.LOGIN,
    redirect: redirect
  };
}

export function requestLogin(email, password, redirect) {
  return dispatch => {
    fetchData(dispatch, '/api/login', {
      method: 'post',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: md5(md5(password))
      })
    }, function () {
      dispatch(login(redirect));
    });
  };
}

/**
 * 用户登出
 */
function logout(redirect) {
  return {
    type: actions.LOGOUT,
    redirect: redirect
  };
}

export function requestLogout(redirect) {
  return dispatch => {
    fetchData(dispatch, '/api/logout', {
      method: 'post',
      credentials: 'include'
    }, function () {
      dispatch(logout(redirect));
    });
  };
}

/**
 * 重置错误信息
 */
export function resetErrorMessage() {
  return {
    type: actions.ERROR_MESSAGE,
    error: null
  };
}
/**
 * 路由跳转中间件
 */
import {browserHistory} from 'react-router';

export default store => next => action => {
  if (!action.redirect) {
    return next(action);
  }

  browserHistory.replace(action.redirect);
};
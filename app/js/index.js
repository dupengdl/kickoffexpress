import React from 'react';
import ReactDOM from 'react-dom';
//import 'babel-core/polyfill';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute} from 'react-router';
import configureStore from './store/configureStore';
import App from './containers/App';
import Todo from './containers/Todo';
import Register from './containers/Register';
import Login from './containers/Login';
import 'font-awesome/css/font-awesome.min.css';
import '../sass/index.scss';
import auth from './utils/auth';
import history from './utils/history';

let store = configureStore();

function requireAuth(nextState, replaceState) {
  if (!auth.loggedIn()) {
    replaceState({nextPathname: nextState.location.pathname}, '/login');
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Todo} onEnter={requireAuth}/>
        <Route path="/register" component={Register}/>
        <Route path="/login" component={Login}/>
      </Route>
      <Route path="*" component={App}/>
    </Router>
  </Provider>,
  document.getElementById('root')
);


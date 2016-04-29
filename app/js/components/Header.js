import React, {Component} from 'react';
import {Link, IndexLink} from 'react-router';
import auth from '../utils/auth';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
  }

  onLogout() {
    this.props.logout();
  }

  render() {
    return (
      <header className="header">
        <Link to={`/`} className="brand">
          <i className="fa fa-list"></i> 我的清单
        </Link>
        {auth.loggedIn() &&
        <div className="pull-right">
          <a href="https://github.com/dupengdl/kickoffexpress" target="_blank"><i className="fa fa-github"></i></a>
          <IndexLink to={`/`} activeClassName="active"><i className="fa fa-user"></i> {auth.getUser()}</IndexLink>
          <a href="#" onClick={this.onLogout}><i className="fa fa-sign-out"> </i>登出</a>
        </div>
        }
        {
          auth.loggedIn() ||
          <div className="pull-right">
            <a href="https://github.com/dupengdl/kickoffexpress" target="_blank"><i className="fa fa-github"></i></a>
            <Link to={`/login`} activeClassName="active">登录</Link>
            <Link to={`/register`} activeClassName="active">注册</Link>
          </div>
        }
      </header>
    );
  }
}

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {requestLogin, resetErrorMessage} from '../actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(resetErrorMessage());
  }

  shouldComponentUpdate(nextProps) {
    return this.props.errorMessage !== nextProps.errorMessage;
  }

  handleSubmit(e) {
    const {dispatch, location} = this.props;
    //处理重定向到登录页的情况,从nextPathname中取得,否则跳转到首页
    let redirect = location.state && location.state.nextPathname ? location.state.nextPathname : '/';
    e.preventDefault();
    dispatch(requestLogin(this.refs.email.value, this.refs.pass.value, redirect));
  }

  renderErrMsg() {
    return (
      <div className="form-group error">
        <span>{this.props.errorMessage}</span>
      </div>
    );
  }

  render() {
    return (
      <form className="login" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input type="email" className="form-control" required placeholder="邮箱" ref="email" />
        </div>
        <div className="form-group">
          <input type="password" className="form-control" required minLength="6" maxLength="20" placeholder="密码" ref="pass" />
        </div>
        {this.renderErrMsg()}
        <div className="form-group">
          <input type="submit" className="btn" value="登录" />
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  const {errorMessage} = state;
  return {
    errorMessage
  };
}

export default connect(mapStateToProps)(Login);
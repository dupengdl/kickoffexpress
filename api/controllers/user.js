/**
 * 用户路由
 */
var passport = require('passport');
var userHelper = require('../helpers/user');
var handler = require('../utils/handler');
var rtn = require('../utils/rtn');
var cookieConfig = require('../config/cookie');

/**
 * 注册用户
 * 请求类型：POST
 * email 邮箱
 * name 用户名
 * password 密码
 */
exports.register = function (req, res) {
  userHelper.create({
    email: req.body.email,
    name: req.body.username,
    password: req.body.password
  }).then(function () {
    passport.authenticate('local')(req, res, function () {
      res.cookie('username', req.user.name, cookieConfig);

      handler.send(res);
    });
  }).catch(function (err) {
    var msg = '服务器连接失败，请稍后重试';
    if (err && /duplicate/ig.test(err.errmsg)) {
      if (/name/ig.test(err.errmsg)) {
        msg = '该姓名已存在';
      }

      if (err && /email/ig.test(err.errmsg)) {
        msg = '邮箱已被注册过';
      }
    }
    handler.handleError(res, msg);
  });
};

/**
 * 用户登录
 */
exports.login = function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    //根据strategy定义的验证函数返回来进行不同处理
    if (err) {
      return handler.handleError(res, '服务器错误');
    }
    if (!user) {
      return handler.handleError(res, '邮箱或密码输入有误', rtn.NO_USER);
    }

    //req.logIn()方法为passport添加到req对象上的方法,手动调用此方法来设置session信息
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }

      res.cookie('username', req.user.name, cookieConfig);

      //验证成功,返回请求
      return handler.send(res);
    });
  })(req, res, next);
};

/**
 * 用户登出
 */
exports.logout = function (req, res, next) {
  //销毁session
  req.session.destroy(function(err){
    if (err) {
      return next(err);
    }
    //调用passport在req对象上添加的logout方法,以销毁在session当中添加的user对象
    req.logOut();
    //清除客户端cookie
    res.clearCookie('kickid');
    res.clearCookie('username');
    handler.send(res);
  });
};
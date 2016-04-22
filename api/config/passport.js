/**
 * passport配置
 */
var mongoose = require('mongoose');
var UserModel = require('../models/user');
var User = mongoose.model('User');
var LocalStrategy = require('passport-local').Strategy;

var local = new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    function (email, password, done) {
      User.findOne({username: username}, function (err, user) {
        //查询失败,标记为验证失败
        if (err) return done(err);
        //未查询到结果,标记为验证失败
        if (!user) {
          return done(null, false, {message: 'Unknown email'});
        }
        //如密码验证不通过,则标记为验证失败
        //user.authenticate(password)方法为mongoose-user plugin在Schema上添加的验证hash密码的方法
        if (!user.authenticate(password)) {
          return done(null, false, {message: 'Invalid password'});
        }
        //验证成功
        return done(null, user);
      });
    }
);

module.exports = function (passport) {
  // 使用本地策略
  passport.use(local);

  // 用户登录请求时,将用户id序列化到session中
  passport.serializeUser(function (user, done) {
    done(null, user.id)
  });

  // 后续请求根据session_id查找user并在req对象上添加user对象
  passport.deserializeUser(function (id, done) {
    User.findOne({_id: id}, function (err, user) {
      done(err, user)
    })
  });
};

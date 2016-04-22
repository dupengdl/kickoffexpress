/**
 * 用户表
 */
var mongoose = require('mongoose');
var userPlugin = require('mongoose-user');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: {type: String, 'default': '', unique: true},
  email: {type: String, 'default': '', unique: true},
  hashed_passord: {type: String, 'default': ''},
  salt: {type: String, default: ''},
  createTime: {type: Date, default: Date.now}
});

//userPlugin为一个为用户Schema添加加密密码&Salt和密码验证方法的plugin
UserSchema.plugin(userPlugin);

module.exports = mongoose.model('User', UserSchema);
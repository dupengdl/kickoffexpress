/**
 * 路由设置
 */
var express = require('express');
var router = express.Router();
var User = require('./controllers/user');

var handler = require('./utils/handler');
var rtn = require('./utils/rtn');

//CORS test
router.get('/cors', function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.json({
    text: 'CORS test success'
  });
});

function needLogin(req, res, next) {
  //req.isAuthenticated()方法为passport添加到req对象上的方法,用来判断是否登录
  if (!req.isAuthenticated()) {
    handler.handleError(res, rtn.NO_LOGIN, '用户未登录');
  } else {
    next();
  }
}

router.post('/register', User.register);
router.post('/login', User.login);

router.get('*', function(req, res) {
  res.status(404).json({
    rtn: 404
  });
});

module.exports = router;
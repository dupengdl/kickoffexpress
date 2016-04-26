var webpack = require('webpack');
var config = require('./webpack.config');
var prodConfig = require('./webpack.production');
var path = require('path');
var staticPath = path.join(__dirname, config.output.publicPath);
var express = require('express');
var app = express();
var host = 'localhost';
var port = process.env.PORT || 3000;

var env = process.env.NODE_ENV;
var passport = require('passport');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var mongoose = require('mongoose');
var mongoConfig = require('./api/config/mongo');
var cookieConfig = require('./api/config/cookie');

//express中间件配置
app.use(favicon(path.join(__dirname, 'app/image/favicon.ico')));
app.use(session({
  resave: true,
  saveUninitialized: false,
  secret: 'kickoffexpress',
  store: new RedisStore({
    db: 1
  }),
  cookie: cookieConfig
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

//passport初始化
//If enabled, be sure to use express.session() before passport.session()
app.use(passport.initialize());
app.use(passport.session());
require('./api/config/passport')(passport);

//mongodb配置
function connect() {
  mongoose.connect(mongoConfig.uri, mongoConfig.options);
}
connect();
mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

//路由配置
app.use('/api', require('./api'));

//webpack配置
if ('production' === env) {
  console.log('Webpack now compiles.');
  //启动webpack编译
  webpack(prodConfig, function (err, stats) {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Compiled Success.');
    //创建服务器
    app.use(express.static(staticPath));

    app.get('*', function (req, res) {
      res.sendFile(path.join(staticPath, 'index.html'));
    });

    app.listen(port, function (err) {
      if (err) {
        console.log(err);
        return;
      }

      console.log('Listening at ' + host + ':' + port);
    });
  });
} else {
  var compiler = webpack(config);

  app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    stats: {
      colors: true
    }
  }));

  app.use(require("webpack-hot-middleware")(compiler));

  app.get('*', function (req, res) {
    res.sendFile(path.join(staticPath, 'index.html'));
  });

  app.listen(port, host, function (err, result) {
    if (err) {
      console.log(err);
    }

    console.log('Listening at ' + host + ':' + port);
  });
}
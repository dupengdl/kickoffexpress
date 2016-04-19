var webpack = require('webpack');
var express = require('express');
var app = express();
var config = require('./webpack.config');
var host = 'localhost';
var port = process.env.PORT || 3000;
var hotArray = ['webpack-dev-server/client?http://' + host + ':' + port, 'webpack/hot/only-dev-server'];

(function (entry) {
  if (entry) {
    for (var i in entry) {
      entry[i] = [].concat(hotArray, entry[i]);
    }
  }
})(config.entry);

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

app.listen(port, host, function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at ' + host + ':' + port);
});

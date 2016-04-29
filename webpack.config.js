var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var env = process.env.NODE_ENV;

var config = {
  devtool: 'inline-source-map',
  entry: {
    'index': './app/js/index.js',
    'vendor': ['react', 'react-dom', 'redux', 'redux-thunk', 'react-redux', 'react-router']
  },
  output: {
    path: path.join(__dirname, 'static'),
    filename: '[name].js',
    publicPath: '/static/'
  },
  module: {
    preLoaders: [
      {test: /\.jsx?$/, loader: 'eslint-loader', exclude: /node_modules/}
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: 'style!css!postcss!sass'
      },
      {
        test: /\.css$/,
        loader: 'style!css!postcss'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          //'image?{bypassOnDebug: true, progressive:true, optimizationLevel: 3, pngquant:{quality: "65-80"}}',
          'url?limit=10000&name=image/[name].[hash:8].[ext]'
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=10000&minetype=application/font-woff&name=font/[name].[hash:8].[ext]'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
        loader: 'file?name=font/[name].[hash:8].[ext]'
      }
    ]
  },
  sassLoader: {
    includePaths: [path.resolve(__dirname, './app/sass'), path.resolve(__dirname, './node_modules')]
  },
  postcss: [autoprefixer({browsers: ['last 2 versions']})],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",//和上面配置的入口对应
      filename: "vendor.js"//导出的文件的名称
    }),
    new HtmlWebpackPlugin({
      template: './app/index.html',
      filename: 'index.html',
      inject: 'body',
      chunks: ['vendor', 'index']
    })
  ]
};

module.exports = config;
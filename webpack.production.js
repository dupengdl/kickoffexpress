var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
  devtool: '#',
  entry: {
    'index': './app/js/index.js',
    'vendor': ['react', 'react-dom', 'redux', 'react-redux']
  },
  output: {
    path: './static/',
    filename: '[name].[chunkhash:8].js',
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
        loader: ExtractTextPlugin.extract('style', 'css!postcss!sass')
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          //'image?{bypassOnDebug: true, progressive:true, optimizationLevel: 3, pngquant:{quality: '65-80'}}',
          'url?limit=10000&name=image/[name].[hash:8].[ext]'
        ]
      },
      {
        test: /\.svg$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml&name=image/[name].[hash:8].[ext]'
      },
      {
        test: /\.(woff|eot|ttf)$/i,
        loader: 'url?limit=10000&name=font/[name].[hash:8].[ext]'
      }
    ]
  },
  sassLoader: {
    includePaths: [path.resolve(__dirname, './app/sass'), path.resolve(__dirname, './node_modules')]
  },
  postcss: [autoprefixer({browsers: ['last 2 versions']})],
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new ExtractTextPlugin('css/[name].[contenthash:8].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',//和上面配置的入口对应
      filename: 'vendor.[chunkhash:8].js'//导出的文件的名称
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: './app/index.html',
      filename: 'index.production.html',
      inject: true,
      minify: {    //压缩HTML文件
        removeComments: true,    //移除HTML中的注释
        collapseWhitespace: true    //删除空白符与换行符
      },
      chunks: ['vendor', 'index']
    })
  ]
};

module.exports = config;
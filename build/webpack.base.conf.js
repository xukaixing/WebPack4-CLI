/*
 * @Description:webpack基础配置
 * @Author: andy.ten@tom.com
 * @Date: 2020-02-20 10:47:27
 * @LastEditors: andy.ten@tom.com
 * @LastEditTime: 2020-02-21 15:17:49
 * @Version: 1.0.0
 */
'use strict';
const path = require('path');
const webpack = require('webpack'); // 这个插件不需要安装，是基于webpack的，需要引入webpack模块
const config = require('../config');
const utils = require('./utils');

module.exports = {
  context: utils.resolve('/'),
  entry: {
    index: path.join(__dirname, '../src/index.js'), // 入口文件,path.join的功能是拼接路径片段
    index2: path.join(__dirname, '../src/index2.js')
  },
  output: {
    path: config.build.assetsRoot, // 打包后的文件存放的地方dist文件夹
    filename: '[name].js',
    // publicPath + 图片相对于output.path的路径
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  module: {
    // base的loader不能与dev和prod的重复定义，否则会报错
    rules: [
      // {
      //   test: /\.css$/,
      //   loader: 'css-loader',
      //   options: {
      //     loaders: utils.cssLoaders({
      //       sourceMap: process.env.NODE_ENV === 'production' ? config.build.productionSourceMap : config.dev.cssSourceMap,
      //       extract: process.env.NODE_ENV === 'production'
      //     })
      //   }
      // },
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader?cacheDirectory', // 注意use选择如果有多项配置，可写成这种对象形式
        include: [utils.resolve('src')],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin('copyright® andy.ten@tom.com') // new一个插件的实例
  ]
};

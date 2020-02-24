/*
 * @Description:webpack开发环境配置
 * @Author: andy.ten@tom.com
 * @Date: 2020-02-20 10:47:39
 * @LastEditors: andy.ten@tom.com
 * @LastEditTime: 2020-02-24 11:00:35
 * @Version: 1.0.0
 */
'use strict';

const utils = require('./utils');
const path = require('path');
const webpack = require('webpack'); // 这个插件不需要安装，是基于webpack的，需要引入webpack模块
const config = require('../config');
const merge = require('webpack-merge'); // 引入webpack-merge功能模块
const baseWebpackConfig = require('./webpack.base.conf.js'); // 引入webpack.base.js
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 拷贝自定义静态文件插件
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 引入HtmlWebpackPlugin插件

process.env.NODE_ENV = 'development';

const HOST = process.env.HOST || config.dev.host;
const PORT = process.env.PORT || config.dev.port;

const webpackDevConfig = merge(baseWebpackConfig, { // 将webpack.base.js合并到当前文件
  mode: 'development',
  module: {
    // 添加css格式规则
    // 添加css格式规则
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  devtool: config.dev.devtool,
  devServer: {
    contentBase: './dist', // 设置服务器所加载文件的目录，当前我们设置为"./dist"
    publicPath: config.dev.assetsPublicPath,
    host: HOST,
    port: PORT, // 设置端口号，如果省略，默认为8080
    inline: true, // 设置为true，当源文件改变时会自动刷新页面
    hot: true, // 热更新，在前端代码变动的时候无需整个刷新页面，只把变化的部分替换掉。inline和hot都配置，则重新加载改变的部分，失败则刷新页面
    historyApiFallback: true, // 不跳转,设置为true，所有的跳转将指向index.html，也就是无跳转
    overlay: {
      warnings: false,
      errors: true // webpack 在编译的时候如果出现了错误，可以在网页上显示
    },
    open: config.dev.autoOpenBrowser // 设置是否自动打开浏览器
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 热更新插件
    new HtmlWebpackPlugin({ // 自动生成html文件
      filename: 'index.html',
      template: path.join(__dirname, '../src/index.template.html'),
      inject: true, // 在body的后面增加脚本
      templateParameters: {
        BASE_URL: config.dev.assetsPublicPath + config.dev.assetsSubDirectory
      }
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
});
module.exports = webpackDevConfig;

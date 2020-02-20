/*
 * @Description:webpack基础配置
 * @Author: andy.ten@tom.com
 * @Date: 2020-02-20 10:47:27
 * @LastEditors: andy.ten@tom.com
 * @LastEditTime: 2020-02-20 10:54:24
 * @Version: 1.0.0
 */
const path = require('path');
const webpack = require('webpack'); // 这个插件不需要安装，是基于webpack的，需要引入webpack模块
// const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 引入CleanWebpackPlugin插件
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 引入HtmlWebpackPlugin插件
module.exports = {
  entry: path.join(__dirname, '/src/index.js'), // 入口文件,path.join的功能是拼接路径片段
  output: {
    path: path.join(__dirname, '/dist'), // 打包后的文件存放的地方
    filename: 'bundle.js' // 打包后输出文件的文件名
  },
  module: {
    rules: [
      {
        test: /\.css$/, // 正则匹配以.css结尾的文件
        use: ['style-loader', 'css-loader'] // 需要用的loader，一定是这个顺序，因为调用loader是从右往左编译的
      },
      {
        test: /\.(scss|sass)$/, // 正则匹配以.scss和.sass结尾的文件
        use: ['style-loader', 'css-loader', 'sass-loader'] // 需要用的loader，一定是这个顺序，因为调用loader是从右往左编译的
      },
      { // jsx配置
        test: /(\.jsx|\.js)$/,
        use: { // 注意use选择如果有多项配置，可写成这种对象形式
          loader: 'babel-loader'
          // options: {
          //   presets: [
          //     'env', 'react'
          //   ]
          // }
        },
        exclude: /node_modules/ // 排除匹配node_modules模块
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 热更新插件
    new webpack.BannerPlugin('版权所有，翻版必究'), // new一个插件的实例
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/src/index.template.html')// new一个这个插件的实例，并传入相关的参数
    })
    // new CleanWebpackPlugin(), // 所要清理的文件夹名称dist
  ]
};

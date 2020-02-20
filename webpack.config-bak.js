/*
 * @Description:webpack-config
 * @Author: andy.ten@tom.com
 * @Date: 2020-02-18 21:35:49
 * @LastEditors: andy.ten@tom.com
 * @LastEditTime: 2020-02-20 21:13:28
 * @Version: 1.0.0
 * @FilePath: /nodejs-pro/Users/xukaixing/project/resource/webpack4-pro/webpack.config.js
 */
// webpack.config.js
'use strict';
const path = require('path');
const webpack = require('webpack'); // 这个插件不需要安装，是基于webpack的，需要引入webpack模块
// const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 引入CleanWebpackPlugin插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 引入分离css插件
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 引入HtmlWebpackPlugin插件
module.exports = {
  entry: path.join(__dirname, '/src/index.js'), // 入口文件,path.join的功能是拼接路径片段
  output: {
    path: path.join(__dirname, '/dist'), // 打包后的文件存放的地方
    filename: 'bundle.js' // 打包后输出文件的文件名
  },
  devServer: {
    contentBase: './dist', // 设置服务器所加载文件的目录，当前我们设置为"./dist"
    port: '8088', // 设置端口号，如果省略，默认为8080
    inline: true, // 设置为true，当源文件改变时会自动刷新页面
    hot: true, // 热更新，在前端代码变动的时候无需整个刷新页面，只把变化的部分替换掉。inline和hot都配置，则重新加载改变的部分，失败则刷新页面
    historyApiFallback: true // 不跳转,设置为true，所有的跳转将指向index.html，也就是无跳转
  },
  devtool: 'source-map', // 会生成对于调试的完整的.map文件，但同时也会减慢打包速度，生成环境设置为：false为不生成
  module: {
    rules: [
      {
        test: /\.css$/, // 正则匹配以.css结尾的文件,需要用的loader，一定是这个顺序，因为调用loader是从右往左编译的
        // use: [
        //   { loader: 'style-loader' }, // 这里采用的是对象配置loader的写法
        //   { loader: 'css-loader' },
        //   { loader: 'postcss-loader' } // 使用postcss-loader
        // ]
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              url: false
            }
          }
        ]
      },
      {
        test: /\.(scss|sass)$/, // 正则匹配以.scss和.sass结尾的文件
        use: ['style-loader', 'css-loader', 'sass-loader'] // 需要用的loader，一定是这个顺序，因为调用loader是从右往左编译的
      },
      { // jsx配置
        test: /(\.jsx|\.js)$/,
        use: { // 注意use选择如果有多项配置，可写成这种对象形式
          loader: 'babel-loader'
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

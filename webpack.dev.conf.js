/*
 * @Description:
 * @Author: andy.ten@tom.com
 * @Date: 2020-02-20 10:47:39
 * @LastEditors: andy.ten@tom.com
 * @LastEditTime: 2020-02-20 10:55:59
 * @Version: 1.0.0
 */
const merge = require('webpack-merge'); // 引入webpack-merge功能模块
const base = require('./webpack.base.conf.js'); // 引入webpack.base.js

module.exports = merge(base, { // 将webpack.base.js合并到当前文件
  devServer: {
    contentBase: './dist', // 设置服务器所加载文件的目录，当前我们设置为"./dist"
    port: '8088', // 设置端口号，如果省略，默认为8080
    inline: true, // 设置为true，当源文件改变时会自动刷新页面
    hot: true, // 热更新，在前端代码变动的时候无需整个刷新页面，只把变化的部分替换掉。inline和hot都配置，则重新加载改变的部分，失败则刷新页面
    historyApiFallback: true // 不跳转,设置为true，所有的跳转将指向index.html，也就是无跳转
  }
});

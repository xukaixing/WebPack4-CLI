/*
 * @Description:
 * @Author: andy.ten@tom.com
 * @Date: 2020-02-20 10:47:50
 * @LastEditors: andy.ten@tom.com
 * @LastEditTime: 2020-02-20 10:57:22
 * @Version: 1.0.0
 */
// webpack.prod.js
const merge = require('webpack-merge');
const base = require('./webpack.base.conf.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 引入CleanWebpackPlugin插件

module.exports = merge(base, { // 将webpack.common.js合并到当前文件
  devtool: 'source-map', // 会生成对于调试的完整的.map文件，但同时也会减慢打包速度，生成环境设置为：false为不生成
  plugins: [
    new CleanWebpackPlugin() // 所要清理的文件夹名称dist
  ]
});

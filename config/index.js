/*
 * @Description:config配置
 * @Author: andy.ten@tom.com
 * @Date: 2020-02-20 15:13:58
 * @LastEditors: andy.ten@tom.com
 * @LastEditTime: 2020-02-21 13:04:55
 * @Version: 1.0.0
 */
'use strict';

const path = require('path');

module.exports = {
  //开发环境配置定义
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    // devServer配置
    host: 'localhost',
    port: 8080,
    autoOpenBrowser: false, //是否自动打开浏览器

    // Use Eslint
    useEslint: true,

    // Source Maps
    devtool: 'cheap-source-map',
    cssSourceMap: true
  },
  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    // Source Maps
    productionSourceMap: false,
    devtool: 'source-map',

    // Gzip
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  }
};

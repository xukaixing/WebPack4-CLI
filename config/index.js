/*
 * @Description:config配置
 * @Author: andy.ten@tom.com
 * @Date: 2020-02-20 15:13:58
 * @LastEditors: andy.ten@tom.com
 * @LastEditTime: 2020-02-20 15:34:04
 * @Version: 1.0.0
 */
'use strict';

const path = require('path');

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    // Various Dev Server settings
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

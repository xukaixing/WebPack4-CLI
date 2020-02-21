/*
 * @Description:webpack基础配置
 * @Author: andy.ten@tom.com
 * @Date: 2020-02-20 10:47:27
 * @LastEditors: andy.ten@tom.com
 * @LastEditTime: 2020-02-21 23:06:02
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
    index: path.join(__dirname, '../src/js/index.js'), // 入口文件,path.join的功能是拼接路径片段
    index2: path.join(__dirname, '../src/js/index2.js')
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
      },
      // 处理图片
      // 将加载的 svg 图片拼接成 雪碧图，放到页面中
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [utils.resolve('src/components/SvgIcon/svg')],
        options: {
          symbolId: 'icon-[name]'
        }
      },
      {
        test: /\.(png|jpe?g|svg|gif|ico)(\?.*)?$/,
        loader: 'url-loader',
        exclude: [utils.resolve('src/components/SvgIcon/svg')],
        options: {
          limit: 10000, // 单位为字节， 只有小于10000字节=10K的图片才转为base64码引用
          name: utils.assetsPath('img/[name].[hash:7].[ext]') // 在相对路径/static目录下
        }
      },
      // 处理视频、音频文件
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000, // 单位为字节， 只有小于10000字节=10K的图片才转为base64码引用
          name: utils.assetsPath('media/[name].[hash:7].[ext]') // 在相对路径/static目录下
        }
      },
      // 处理字体文件
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin('copyright® andy.ten@tom.com') // new一个插件的实例
  ]
};

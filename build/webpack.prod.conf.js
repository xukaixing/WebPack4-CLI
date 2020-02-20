/*
 * @Description:
 * @Author: andy.ten@tom.com
 * @Date: 2020-02-20 10:47:50
 * @LastEditors: andy.ten@tom.com
 * @LastEditTime: 2020-02-21 00:13:36
 * @Version: 1.0.0
 */
// webpack.prod.js
'use strict';
const path = require('path');
const utils = require('./utils');
const config = require('../config');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 引入CleanWebpackPlugin插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 引入分离css插件
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin'); // 引入css压缩插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 引入HtmlWebpackPlugin插件

process.env.NODE_ENV = 'production';

const webpackProdConfig = merge(baseWebpackConfig, { // 将webpack.common.js合并到当前文件
  mode: 'production',
  devtool: config.build.productionSourceMap ? config.build.devtool : false,// 会生成对于调试的完整的.map文件，但同时也会减慢打包速度，生成环境设置为：false为不生成
  output: {
    filename: utils.assetsPath('js/[name].[chunkhash:8].js'), // 打包后输出文件的文件名，以index+8位hash文件命名
    /*
     * 涉及懒加载和预加载
     * chunkFilename用来打包require.ensure方法中引入的模块,如果该方法中没有引入任何模块则不会生成任何chunk块文件
     * 比如在main.js文件中,require.ensure([],function(require){alert(11);}),这样不会打包块文件
     * 只有这样才会打包生成块文件require.ensure([],function(require){alert(11);require('./greeter')})
     * 或者这样require.ensure(['./greeter'],function(require){alert(11);})
     * chunk的hash值只有在require.ensure中引入的模块发生变化,hash值才会改变
     * 注意:对于不是在ensure方法中引入的模块,此属性不会生效,只能用CommonsChunkPlugin插件来提取
     * */
    chunkFilename: utils.assetsPath('js/[name].[chunkhash:8].js')
  },
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      usePostCSS: true,
      extract: true
    })
  },
  // 压缩css
  optimization: {
    runtimeChunk: 'single',
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: config.build.productionSourceMap,
        uglifyOptions: {
          warnings: false
        }
      }),
      new OptimizeCSSPlugin({
        cssProcessorOptions: config.build.productionSourceMap ? { safe: true, map: { inline: false } } : { safe: true }
      })
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          name: 'app.vendors',
          test: /node_modules/,
          priority: -10,
          chunks: 'initial'
        },
        echarts: {
          name: 'app.echarts',
          priority: 100,
          test: module => /echarts/.test(module.context)
        },
        elementUI: {
          name: 'app.elementUI',
          priority: 100,
          test: module => /element-ui/.test(module.context)
        },
        components: {
          name: 'app.components',
          test: utils.resolve('src/components'),
          minChunks: 2,
          priority: 10,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    // 分离单独的css文件
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash:8].css'),
      chunkFilename: utils.assetsPath('css/[name].[contenthash:8].css')
    }),
    // new一个这个插件的实例，并传入相关的参数
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: path.join(__dirname, '../src/index.template.html'),
      // inject：向template或者templateContent中注入所有静态资源，不同的配置值注入的位置不经相同。// inject：向template或者templateContent中注入所有静态资源，不同的配置值注入的位置不经相同。
      //1、true或者body：所有JavaScript资源插入到body元素的底部
      //2、head: 所有JavaScript资源插入到head元素中
      //3、false： 所有静态资源css和JavaScript都不会注入到模板文件中
      inject: true,
      //添加特定favicon路径到输出的html文档中，这个同title配置项，需要在模板中动态获取其路径值
      favicon: utils.resolve('/favicon.ico'),
      //传递 html-minifier 选项给 minify 输出，false就是不使用html压缩
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      //chunksSortMode:  none auto dependency {function}，默认auto； 允许指定的thunk在插入到html文档前进行排序。
      chunksSortMode: 'dependency',//按照不同文件的依赖关系来排序。
      // 模版需要的参数
      templateParameters: {
        BASE_URL: config.build.assetsPublicPath + config.build.assetsSubDirectory
      }
    }),
    new CleanWebpackPlugin() // 所要清理的文件夹名称dist
  ]
});
module.exports = webpackProdConfig;

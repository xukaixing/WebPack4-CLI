/*
 * @Description:webpack生产环境配置
 * @Author: andy.ten@tom.com
 * @Date: 2020-02-20 10:47:50
 * @LastEditors: andy.ten@tom.com
 * @LastEditTime: 2020-02-24 15:14:17
 * @Version: 1.0.0
 */
// webpack.prod.js
'use strict';
const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 引入CleanWebpackPlugin插件
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 拷贝自定义静态文件插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 引入分离css插件
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 引入HtmlWebpackPlugin插件
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin'); // 引入提取公共代码插件
// 注意一定要在HtmlWebpackPlugin之后引用
// inline 的name 和你 runtimeChunk 的 name保持一致
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // 缩小（压缩优化）js文件


process.env.NODE_ENV = 'production';

const webpackProdConfig = merge(baseWebpackConfig, { // 将webpack.common.js合并到当前文件
  mode: 'production',
  devtool: config.build.productionSourceMap ? config.build.devtool : false, // 会生成对于调试的完整的.map文件，但同时也会减慢打包速度，生成环境设置为：false为不生成
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
  // 提取公共代码chunk
  // 将公共代码抽离出来，在用户打开一个页面的时候，顺便加载了公共的文件，在打开其他页面的时候，如果其他页面也引用了这个公共文件，就不用重新加载，直接从浏览器缓存中获取
  optimization: {
    // 默认为false,runtime相关的代码(各个模块之间的引用和加载的逻辑)内嵌入每个entry
    // multiple：对于每个entry会生成runtime~${entrypoint.name}的文件。
    // 'single': 会生成一个唯一单独的runtime.js文件，就是manifest,描述的是加载引用的逻辑关系
    runtimeChunk: 'single',
    // 可以自定义UglifyJsPlugin和一些配置,默认的压缩为uglifyjs-webpack-plugin
    // 如果想使用第三方的压缩插件也可以在optimization.minimizer的数组列表中进行配置
    minimizer: [
      new UglifyJsPlugin({
        exclude: /\.min\.js$/, // 过滤掉以".min.js"结尾的文件，我们认为这个后缀本身就是已经压缩好的代码，没必要进行二次压缩
        cache: true, // 启用文件缓存,默认的缓存路径为： node_modules/.cache/uglifyjs-webpack-plugin.
        parallel: true, // 使用多进程并行运行来提高构建速度。默认并发运行次数:os.cpus().length- 1
        sourceMap: config.build.productionSourceMap,
        extractComments: false, // 移除注释
        uglifyOptions: {
          warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
          compress: {
            unused: true,
            // eslint-disable-next-line camelcase
            drop_debugger: true, // 清除 debugger 语句
            // eslint-disable-next-line camelcase
            drop_console: true // 清除console语句
          },
          output: {
            // 最紧凑的输出
            beautify: false,
            // 删除所有的注释
            comments: false
          }
        }
      }),
      // 用于优化css文件
      new OptimizeCSSPlugin({
        cssProcessorOptions: config.build.productionSourceMap ? { safe: true, map: { inline: false }} : { safe: true }
      })
    ],
    // 主要就是根据不同的代码包，来分割打包出来的bundle。
    splitChunks: {
      chunks: 'all', // 显示块的范围; async（默认）：分割异步打包的代码;all:同时分割同步和异步代码,推荐。
      cacheGroups: { // 设置缓存组用来抽取满足不同规则的chunk
        // 分离出node_modules，打包后的文件是：/dlist/static/js/app.vendors.chunkhash.js
        vendors: {
          name: 'app.vendors', // 拆分出来块的名字(Chunk Names)，默认由块名和hash值自动生成，如果是true，将自动生成基于块和缓存组键的名称。如果是字符串或函数将允许您使用自定义名称。如果名称与入口点名称匹配，则入口点将被删除。
          test: /[\\/]node_modules[\\/]/,
          priority: -10, // 优先级，一个chunk很可能满足多个缓存组，会被抽取到优先级高的缓存组中
          chunks: 'initial' // 只打包初始时依赖的第三方
        },
        // 分离出echarts
        echarts: {
          name: 'app.echarts',
          priority: 100, // 权重要大于 vendors 和 app 不然会被打包进 vendors 或者 app
          test: (module) => /echarts/.test(module.context)
        },
        // 分离出elementUI
        elementUI: {
          name: 'app.elementUI',
          priority: 100,
          test: (module) => /element-ui/.test(module.context)
        },
        // 分离出公共组件
        components: {
          name: 'app.components',
          test: utils.resolve('src/components'),
          minChunks: 2, // /少被几个chunk引用
          priority: 10,
          reuseExistingChunk: true //  如果该chunk中引用了已经被抽取的chunk，直接引用该chunk，不会重复打包代码
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
      // 1、true或者body：所有JavaScript资源插入到body标签内的最底部
      // 2、head: 所有JavaScript资源插入到head元素中
      // 3、false： 所有静态资源css和JavaScript都不会注入到模板文件中
      inject: true,
      // 添加特定favicon路径到输出的html文档中，这个同title配置项，需要在模板中动态获取其路径值
      favicon: utils.resolve('/favicon.ico'),
      // 传递 html-minifier 选项给 minify 输出，false就是不使用html压缩
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      // chunksSortMode:  none auto dependency {function}，默认auto； 允许指定的thunk在插入到html文档前进行排序。
      chunksSortMode: 'dependency', // 按照不同文件的依赖关系来排序。
      // 模版需要的参数
      templateParameters: {
        BASE_URL: config.build.assetsPublicPath + config.build.assetsSubDirectory
      }
    }),
    // 打包生成的 runtime.js非常的小，gzip 之后一般只有几 kb，但这个文件又经常会改变，我们每次都需要重新请求它，它的 http 耗时远大于它的执行时间了，所以建议不要将它单独拆包，而是将它内联到我们的 index.html 之中(index.html 本来每次打包都会变)。
    new ScriptExtHtmlWebpackPlugin({
      // `runtime` must same as runtimeChunk name. default is `runtime`
      inline: /runtime\..*\.js$/
    }),
    // keep module.id stable when vendor modules does not change
    // webpack 内部维护了一个自增的 id，每个 module 都有一个 id。所以当增加或者删除 module 的时候，id 就会变化，导致其它文件虽然没有变化，但由于 id 被强占，只能自增或者自减，导致整个 id 的顺序都错乱了。
    // 如果引入了一个新文件或删掉一个文件，都可能会导致其它文件的 moduleId 发生改变，那这样缓存失效了。
    // HashedModuleIdsPlugin的原理是使用文件路径的作为 id，并将它 hash 之后作为 moduleId。
    new webpack.HashedModuleIdsPlugin(),
    // 拷贝自定义的静态文件，如：图片等
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
    new CleanWebpackPlugin() // 所要清理的文件夹名称dist
  ]
});
// 判断是否增加gzip压缩
if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin');
  webpackProdConfig.plugins.push(
    new CompressionWebpackPlugin({
      // asset: '[path].gz[query]', //1.1版本
      filename: '[path].gz[query]', // 目标资源名称。[path] 会被替换成原资路径，[query] 替换成原查询字符串
      algorithm: 'gzip',
      test: new RegExp('\\.(' + config.build.productionGzipExtensions.join('|') + ')$'),
      threshold: 10240, // 单位为字节，只处理比10240字节=10K值大的资源
      minRatio: 0.8// 只有压缩率比这个值小的资源才会被处理
    })
  );
}
module.exports = webpackProdConfig;

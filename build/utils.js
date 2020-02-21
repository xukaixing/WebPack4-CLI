/*
 * @Description:build公共方法
 * @Author: andy.ten@tom.com
 * @Date: 2020-02-20 15:10:56
 * @LastEditors: andy.ten@tom.com
 * @LastEditTime: 2020-02-21 13:38:28
 * @Version: 1.0.0
 */
'use strict';
const path = require('path');
const config = require('../config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 引入分离css插件

// 拼接路径
exports.assetsPath = function(_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory;
  // path.posix.join是path.join的一种兼容性写法，它的作用是路径的拼接，这里返回的是"static/_path"
  return path.posix.join(assetsSubDirectory, _path);
};

// 添加绝对路径
exports.resolve = function(_path) {
  return path.join(__dirname, '..', _path);
};

// 添加css的相关loader，分离css
exports.cssLoaders = function(options) {
  options = options || {};

  // 设置 css 加载器
  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  };

  // 设置 增加前缀css的postcss 加载器
  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  };

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions = {}) {
    // 加载器的数组,判断是否使用前缀postcss
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader];
    // console.log(loaders);
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      });
    }

    // 分离css文件配置
    // (在生产环境中配置)
    if (options.extract) {
      // return ExtractTextPlugin.extract({
      //   use: loaders,
      //   fallback: 'vue-style-loader'
      // })
      return [MiniCssExtractPlugin.loader].concat(loaders);
    } else {
      // return ['vue-style-loader'].concat(loaders);
      return ['style-loader'].concat(loaders);
    }
  };

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less', { javascriptEnabled: true }).concat({
      // less 变量的全局注入
      loader: 'style-resources-loader',
      options: {
        patterns: [path.resolve(__dirname, '../src/assets/css/variables.less')]
      }
    }),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  };
};

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function(options) {
  const output = [];
  const loaders = exports.cssLoaders(options);
  // console.log('styleLoaders=>loaders:', loaders);
  for (const extension in loaders) {
    const loader = loaders[extension];
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    });
  }
  // console.log('styleLoaders=>outpus:', output);
  return output;
};

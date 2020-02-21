/*
 * @Description:
 * @Author: andy.ten@tom.com
 * @Date: 2020-02-16 20:29:55
 * @LastEditors: andy.ten@tom.com
 * @LastEditTime: 2020-02-21 15:16:53
 * @Version: 1.0.0
 * @FilePath: /nodejs-pro/Users/xukaixing/project/resource/webpack4-pro/src/index.js
 */
// index.js
// import './css/style.css'; // 导入css
// const hello = require('./hello.js');
// document.querySelector('#root').appendChild(hello());

// index.js
import './css/style.css'; //  导入css
import './css/blue.scss'; // 导入scss

// eslint-disable-next-line no-unused-vars
import React from 'react';
import { render } from 'react-dom';
import Hello from './hello'; // 可省略.js后缀名

render(<Hello />, document.getElementById('root'));

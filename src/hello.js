/*
 * @Description:
 * @Author: andy.ten@tom.com
 * @Date: 2020-02-16 20:30:09
 * @LastEditors: andy.ten@tom.com
 * @LastEditTime: 2020-02-20 01:01:55
 * @Version: 1.0.0
 * @FilePath: /nodejs-pro/Users/xukaixing/project/resource/webpack4-pro/src/hello.js
 */

// hello.js
// module.exports = function() {
//   const hello = document.createElement('div');
//   hello.innerHTML = 'Long time no see!';
//   return hello;
// };

import React, { Component } from 'react'; // 这两个模块必须引入

const name = 'andyten';

export default class Hello extends Component {
  render() {
    return (
      <div>
        {name}
      </div>
    );
  }
}

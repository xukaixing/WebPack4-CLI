/*
 * @Description:多入口文件
 * @Author: andy.ten@tom.com
 * @Date: 2020-02-20 13:52:08
 * @LastEditors: andy.ten@tom.com
 * @LastEditTime: 2020-02-20 13:52:36
 * @Version: 1.0.0
 */
function index2() {
  const element = document.createElement('div');
  element.innerHTML = '我是第二个入口文件';
  return element;
}

document.getElementById('root').appendChild(index2());

# 说明

  `Webpack4-Pro` Demo，介绍了webpack打包简单用法。  
  
## 版本

> v1.0.1 : 2020.06.14
>> 增加eslint配置
>> 增加注释说明

## 环境

- 本地安装 nodejs 请使用 v12.16.0 及以上版本，建议使用 nvm 管理。
- 建议使用 yarn 管理 npm 依赖。
- 编译器统一使用 VScode，必要的插件列表：
  - Vetur
  - Prettier
  - EditorConfig
  - ESLint
  - SaveAction

### 使用 yarn 或 npm 安装

```bash
# 安装依赖
$ yarn install 或 npm install

# 启动本地服务
$ npm run start 或 npm run dev

# 发布，构建生产环境代码
$ npm run build
```

## 目录结构

``` 目录
.
├── build
│   ├── utils.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js
├── config
│   └── index.js
├── favicon.ico
├── package-lock.json
├── package.json
├── postcss.config.js
├── src
│   ├── css
│   ├── img
│   ├── index.template.html
│   └── js
├── webpack.config-bak.js
└── yarn.lock

6 directories, 12 files

```

## 个人主页

- 欢迎访问个人 [github-xukaixing](https://github.com/xukaixing) 主页.
- 欢迎访问个人 [gitee-xukaixing](https://gitee.com/xukaixing) 主页.

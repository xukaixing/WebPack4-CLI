/*
 * @Author: andy.ten@tom.com
 * @Date:   2020-02-07 13:45:59
 * @Remark eslint配置规则
 *         off   或 0：表示不验证规则
 *         warn  或 1：表示验证规则，当不满足时，给警告
 *         error 或 2：表示验证规则，不满足时报错
 */
module.exports = {
  root: true, // 此项是用来告诉eslint找当前配置文件不能往父级查找
  parserOptions: {
    ecmaVersion: 6, // ES的版本，默认为5
    parser: 'babel-eslint', // 兼容es6插件
    sourceType: 'module', // 设置为 "script" (默认) 或 "module"（如果代码是 ECMAScript 模块)
    allowImportExportEverywhere: true,
    ecmaFeatures: {
      // 使用额外的语言特性，指定要使用其他那些语言对象
      jsx: true, // 启用JSX
      modules: true, // 允许使用模块，模块内默认严格模式
      impliedStrict: true, // 启用严格校验模式
      experimentalObjectRestSpread: true // 启用对对象的扩展
    }
  },
  // 指定脚本的运行环境。每种环境都有一组特定的预定义全局变量,默认情况下，所有环境变量都为fals,且这些环境并不冲突，可以自由选择搭配
  env: {
    browser: true, // 启用浏览器全局变量
    node: true, // Node.js全局变量和Node.js范围。
    commonjs: true, // CommonJS全局变量和CommonJS范围。
    es6: true, // 启用ES6的功能。
    jquery: true // jQuery全局变量
  },
  // extends: 'eslint:recommended',
  // 此项是用来配置标准的js风格，就是说写代码的时候要规范的写
  extends: [
    // 按从上往下的规则匹配
    'eslint:recommended',
    'plugin:vue/recommended',
    'prettier',
    'prettier/vue'
  ],
  // required to lint *.vue files
  // 此项是用来提供插件的，插件名称省略了eslint-plugin-，下面这个配置是用来规范html的
  // plugins: ['vue', 'prettier'],
  plugins: ['typescript', 'import', 'node', 'standard', 'promise', 'commonjs', 'vue', 'prettier', 'html'],
  // plugins: [
  //   'eslint-plugin-html', // 检查html当中script标签
  //   'eslint-plugin-import',
  //   'eslint-plugin-promise',
  //   'eslint-plugin-vue' // vue自动格式化插件
  // ],
  settings: {
    'html/html-extensions': ['.html', '.vue'] // 除js文件外，会去检查文件中script标签配置
  },
  rules: {
    'prettier/prettier': [0], // 开启会影响 dev 环境打包速度
    // -------------------------------------------- 规范规则 ------------------------------------------
    'arrow-parens': 2, // 要求箭头函数的参数使用圆括号
    'arrow-spacing': [
      // =>的前/后括号
      2,
      {
        before: true,
        after: true
      }
    ],
    'block-spacing': [2, 'always'], // 禁止或强制在单行代码块中使用空格(禁用)
    'brace-style': [
      // if while function 后面的{必须与if在同一行，java风格。
      1,
      '1tbs',
      {
        allowSingleLine: true
      }
    ],
    camelcase: [
      // 强制使用驼峰拼写法命名规定
      2,
      {
        properties: 'always'
      }
    ],
    'comma-dangle': [2, 'never'], // always-multiline：多行模式必须带逗号，单行模式不能带逗号
    'comma-spacing': [
      // 强制在逗号前后使用一致的空格
      2,
      {
        before: false,
        after: true
      }
    ],
    'new-parens': 2, // new时必须加小括号（圆括号）
    'comma-style': [2, 'last'], // 控制逗号在行尾出现还是在行首出现 (默认行尾)
    curly: [2, 'all'], // 强制所有控制语句使用一致的括号风格，必须使用 if(){} 中的{}
    // 强制object.key 中 . 的位置，参数:
    // property，'.'号应与属性在同一行
    // object, '.' 号应与对象名在同一行
    'dot-location': [2, 'property'],
    'eol-last': 2, // 要求或禁止文件末尾存在空行，文件末尾强制换行
    'generator-star-spacing': [
      // 强制generator函数中*号周围使用一致的空格
      2,
      {
        before: true,
        after: true
      }
    ],
    indent: [
      // 强制使用一致的缩进
      2,
      2,
      {
        SwitchCase: 1
      }
    ],
    'jsx-quotes': [2, 'prefer-single'], // 强制在JSX属性中一致地使用双引号或单引号
    'key-spacing': [
      // 强制要求在对象字面量的属性中键和值之间使用一致的间距，对象冒号的前后空格
      2,
      {
        beforeColon: false,
        afterColon: true
      }
    ],
    'keyword-spacing': [
      // 强制在关键字前后使用一致的空格 (前后需要)
      2,
      {
        before: true,
        after: true
      }
    ],
    'new-cap': [
      // 要求构造函数首字母大写
      2,
      {
        newIsCap: true,
        capIsNew: false
      }
    ],
    'no-multi-spaces': 2, // 禁止使用多个空格
    'no-multi-str': 2, // 禁止使用多行字符串
    'no-multiple-empty-lines': [
      // 禁止出现多行空行
      1,
      {
        max: 2 // 最大空行数
      }
    ],
    'no-mixed-spaces-and-tabs': 2, // 禁止空格和tab的混合缩进
    'no-irregular-whitespace': 2, // 禁止在字符串和注释之外不规则的空白,不能有不规则的空格
    'no-trailing-spaces': 1, // 禁止行尾空格,一行结束后面不要有空格
    'no-spaced-func': 2, // 函数调用时 函数名与()之间不能有空格
    'no-whitespace-before-property': 2, // 禁止属性前有空白
    'padded-blocks': [2, 'never'], // 块语句内行首行尾是否要空行
    'array-bracket-spacing': [2, 'never'], // 禁止或强制在括号内使用空格,指定数组的元素之间要以空格隔开(,后面)， never参数：[ 之前和 ] 之后不能带空格，always参数：[ 之前和 ] 之后必须带空格
    quotes: [
      // 强烈使用一致的反勾号``、双引号""或单引号''
      2,
      'single',
      {
        avoidEscape: true, // 允许字符串使用单引号或者双引号，只要字符串中包含了一个其他引号，否则需要转义
        allowTemplateLiterals: true // 允许字符串使用反勾号
      }
    ],
    semi: [2, 'always'], // 语句强制分号结尾,禁止使用分号代替ASI(自动分号插入)
    'semi-spacing': [
      // 分号前后空格
      1,
      {
        before: false,
        after: true
      }
    ],
    'space-before-blocks': [2, 'always'], // 强制在块之前使用一致的空格
    'space-before-function-paren': [1, 'never'], // 强制在function的左括号之前使用一致的空格,函数定义时括号前面要不要有空格
    'space-in-parens': [1, 'never'], // 强制在圆括号内使用一致的空格,圆括号里面要不要有空格
    'space-infix-ops': 1, // 要求操作符周围有空格
    'space-unary-ops': [
      // 强制在一元操作符前后使用一致的空格，一元运算符的前/后要不要加空格
      2,
      {
        words: true,
        nonwords: false
      }
    ],
    'spaced-comment': [
      // 强制在注释// 或/*使用一致的空格,注释不要有空格
      1,
      'always',
      {
        markers: ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
      }
    ],
    'template-curly-spacing': [2, 'never'], // 禁止模板字符串中嵌入表达式周围空格的使用
    'object-curly-spacing': [
      // 大括号内是否允许不必要的空格
      2,
      'always',
      {
        objectsInObjects: false
      }
    ],
    // -------------------------------------------- 语法规则 ------------------------------------------
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off', // 生产禁止使用console
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0, // 生产禁止使用debugger
    'accessor-pairs': 2, // 定义对象的set存取器属性时，强制定义get
    'constructor-super': 2, // 强制在子类构造函数中用super()调用父类构造函数，TypeScrip的编译器也会提示
    'handle-callback-err': [2, '^(err|error)$'], // 要求回调函数中有容错处理
    eqeqeq: [2, 'allow-null'], // 要求使用 ===和 !==替代==和!
    'no-array-constructor': 2, // 禁用Array构造函数
    'no-caller': 2, // 禁用arguments.caller 或 arguments.callee
    'no-class-assign': 2, // 禁止修改类声明的变量
    'no-cond-assign': 2, // 禁止条件表达式中出现赋值操作符
    'no-const-assign': 2, // 禁止修改const声明的变量
    'no-control-regex': 0, // 禁止在正则表达式中使用控制字符 ：new RegExp("\x1f")
    'no-delete-var': 2, // 禁止对var声明的变量使用delete操作符
    'no-dupe-args': 2, // 禁止function定义中出现重名参数
    'no-dupe-class-members': 2, // 禁止类成员中出现重复的名称
    'no-dupe-keys': 2, // 在创建对象字面量时不允许键重复 {a:1,a:1}
    'no-duplicate-case': 2, // switch中的case标签不能重复
    'no-empty-character-class': 2, // 正则表达式中的[]内容不能为空
    'no-empty-pattern': 2, // 禁止使用空解构模式
    'no-eval': 2, // 禁止使用eval()
    'no-ex-assign': 2, // 禁止给catch语句中的异常参数赋值
    'no-extend-native': 2, // 禁止扩展原生类型,禁止扩展native对象
    'no-extra-bind': 2, // 禁止不必要的.bind()调用,禁止不必要的函数绑定
    'no-extra-boolean-cast': 2, // 禁止不必要的bool转换
    'no-extra-parens': [2, 'functions'], // 禁止非必要的括号
    'no-fallthrough': 2, // 禁止switch穿透,禁止 case 语句落空
    'no-floating-decimal': 2, // 禁止数字字面量中使用前导和末尾小数点,禁止省略浮点数中的0 .5 3.
    'no-func-assign': 2, // 禁止重复的函数声明,禁止对function声明重新赋值
    'no-implied-eval': 2, // 禁止使用类似eval()的方法
    'no-inner-declarations': [2, 'functions'], // 禁止在嵌套块中出现变量声明或function声明,禁止在块语句中使用声明（变量或函数）
    'no-invalid-regexp': 2, // 禁止RegExp构造函数中存在无效的正则表达式字符串
    'no-iterator': 2, // 禁用__iterator__属性
    'no-label-var': 2, // 不允许标签与变量同名,不允许标签label与变量同名
    'no-labels': [
      // 禁用标签语句
      2,
      {
        allowLoop: false,
        allowSwitch: false
      }
    ],
    'no-lone-blocks': 2, // 禁用不必要嵌套块
    'no-native-reassign': 2, // 不能重写native对象,禁止对原生对象赋值
    'no-negated-in-lhs': 2, // in 操作符的左边不能有!
    'no-new-object': 2, // 禁止使用new Object()
    'no-new-require': 2, // 禁止调用 require 时使用new操作符
    'no-new-symbol': 2, // 禁止 Symbolnew 操作符和 new 一起使用
    'no-new-wrappers': 2, // 禁止对String，Number 和 Boolean 使用new操作符
    'no-obj-calls': 2, // 禁止把全局对象作为函数调用
    'no-octal': 2, // 禁止使用八进制数字
    'no-octal-escape': 2, // 禁止使用八进制转义序列
    'no-path-concat': 2, // node中不能使用__dirname或__filename做路径拼接
    'no-proto': 2, // 禁止使用__proto__属性
    'no-redeclare': 2, // 禁止多次声明同一变量,禁止重复声明变量
    'no-regex-spaces': 2, // 禁止正则表达式字面量中出现多个空格
    'no-return-assign': [2, 'except-parens'], // return 语句中不能有赋值表达式
    'no-self-assign': 2, // 禁止自我赋值
    'no-self-compare': 2, // 禁止自我比较
    'no-sequences': 2, // 禁止使用逗号运算符
    'no-shadow-restricted-names': 2, // 禁止将标识符定义为受限的名字,严格模式中规定的限制标识符不能作为声明时的变量名使用
    'no-sparse-arrays': 2, // 禁止稀疏数组 [1,,2]
    'no-this-before-super': 2, // 在调用super()之前不能使用this或super
    'no-throw-literal': 2, // 禁止抛出异常字面量,禁止抛出字面量错误 throw "error";
    'no-undef': 2, // 禁止未声明的变量，除非它们在/*global */注释中被提到,不能有未定义的变量
    'no-undef-init': 2, // 变量初始化时不能直接给它赋值为undefined
    'no-unexpected-multiline': 2, // 禁止多行表达式
    'no-unmodified-loop-condition': 2, // 禁止一成不变的循环条件
    'no-unneeded-ternary': [
      // 禁止不必要的嵌套 var isYes = answer === 1 ? true : false;
      2,
      {
        defaultAssignment: true // 允许表达式作为默认的赋值模式
      }
    ],
    'no-unreachable': 2, // 不能有无法执行的代码,禁止在return、throw、continue、break语句之后出现访问不到的代码
    'no-unsafe-finally': 2, // 禁止在finally语句块中出现控制流语句
    'no-unused-vars': [
      // 不能有声明后未被使用的变量或参数
      2,
      {
        vars: 'all',
        args: 'none'
      }
    ],
    'no-useless-call': 2, // 禁止不必要的.call()和.apply()
    'no-useless-computed-key': 2, // 禁止在对象中使用不必要的计算属性
    'no-useless-constructor': 2, // 禁止不必要的构造函数
    'no-useless-escape': 1, // 禁止不必要的转义字符
    'no-with': 2, // 禁用with语句
    'one-var': [
      // 强制函数中的变量要么一起声明要么分开声明
      2,
      {
        initialized: 'never'
      }
    ],
    'operator-linebreak': [
      // 换行时运算符在行尾还是行首
      2,
      'after',
      {
        overrides: {
          '?': 'before',
          ':': 'before'
        }
      }
    ],
    'use-isnan': 2, // 禁止比较时使用NaN，只能用isNaN()
    'valid-typeof': 2, // 强制typeof表达式与有效的字符串进行比较
    'wrap-iife': [2, 'any'], // 要求IIFE使用括号括起来，立即执行函数表达式的小括号风格
    'yield-star-spacing': [2, 'both'],
    yoda: [2, 'never'], // 要求或禁止Yoda条件。 if("red" === color) { //字面量在前，变量在后 }，禁止尤达条件
    'prefer-const': 2, // 要求使用const声明那些声明后不再被修改的变量
    // -------------------------------------------- vue规则 ------------------------------------------
    'vue/eqeqeq': [0],
    'vue/no-v-html': [0],
    'vue/this-in-template': [0],
    'vue/attribute-hyphenation': [0],
    'vue/require-default-prop': [0],
    'vue/require-prop-types': [0],
    'vue/require-valid-default-prop': [0],
    'vue/no-unused-vars': [0],
    'vue/prop-name-casing': [0],
    'vue/name-property-casing': [0],
    'vue/component-name-in-template-casing': [0],
    'vue/no-unused-components': [0],
    'vue/no-duplicate-attributes': [0]
  }
};

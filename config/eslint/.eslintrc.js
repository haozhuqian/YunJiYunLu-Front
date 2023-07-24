module.exports = {
  // 启用对应环境变量
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  root: true,
  // 启用扩展规则配置
  extends: [
    // 启用报告常见问题的核心规则子集，具体可查看：https://zh-hans.eslint.org/docs/latest/rules/ 说明
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-essential',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  // 选择使用的解析器
  parser: 'vue-eslint-parser',
  // 指定解析器选项
  parserOptions: {
    //  启用 ESMAScript 最新版本语法
    ecmaVersion: 'latest',
    // 一个将 TypeScript 转换为与 ESTree 兼容的形式的解析器
    parser: '@typescript-eslint/parser',
    // 使用 ES 模块化规范
    sourceType: 'module',
  },
  // 启用插件
  plugins: ['@typescript-eslint', 'vue'],
  rules: {
    'vue/multi-word-component-names': 'off',
  },
};

// 这里是通俗的解释 详情请前往官方文档查阅
module.exports = {
  ignores: [(commit) => commit.includes('init')],
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 信息以空格开头
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [2, 'always'],
    // 信息最大长度
    'header-max-length': [2, 'always', 108],
    // 信息不能未空
    'subject-empty': [2, 'never'],
    // 信息类型不能未空
    'type-empty': [2, 'never'],
    // 提交信息的类型
    'type-enum': [
      2,
      'always',
      [
        'feat', //添加新功能
        'fix', //修复原有问题
        'perf',
        'style', //修改样式
        'docs', //添加项目文档
        'test', //添加测试
        'refactor', //重构代码
        'build',
        'ci',
        'chore',
        'revert',
        'wip',
        'workflow',
        'types', //添加类型
        'release', //发布版本
      ],
    ],
  },
};

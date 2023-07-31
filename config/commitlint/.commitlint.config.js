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
        'perf', //性能优化
        'style', //修改代码格式（不是css）
        'docs', //添加项目文档
        'test', //添加测试
        'refactor', //重构代码
        'build', //项目构建或者修改项目依赖
        'ci', //持续集成相关
        'chore', //杂项，不属于其他类型的提交
        'revert', //恢复上一次提交
        'wip', //提交部分代码，但未完成
        'workflow', //工作流相关修改
        'types', //添加类型
        'release', //发布版本
      ],
    ],
  },
};

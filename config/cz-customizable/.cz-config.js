module.exports = {
  types: [
    { value: 'feat', name: 'feat: 添加新功能' },
    { value: 'fix', name: 'fix: 修复原有问题' },
    { value: 'refactor', name: 'refactor: 重构代码' },
    { value: 'style', name: 'style: 调整代码风格（不是css）' },
    { value: 'build', name: 'build: 项目构建，依赖的改动' },
    { value: 'chore', name: 'chore: 杂项，不属于其他类型的提交' },
    { value: 'docs', name: 'docs: 修改项目文档' },
    { value: 'perf', name: 'perf: 性能优化' },
    { value: 'test', name: 'test: 添加测试' },
    { value: 'revert', name: 'revert: 回滚' },
    { value: 'ci', name: 'ci: 持续集成相关修改' },
    { value: 'workflow', name: 'workflow: 修改工作流' },
    { value: 'release', name: 'release: 发布版本' },
  ],

  messages: {
    type: '选择本次提交的类型',
    // used if allowCustomScopes is true
    customScope: '修改的主要范围（选填）:',
    subject: '对本次提交的简短描述（小于72字）:',
    body: '详细描述（选填， 需要的话用 "|" 换行）:\n',
    confirmCommit: '确定要继续本次提交吗',
  },

  allowCustomScopes: true,
  subjectLimit: 72,
};

/*
配置的含义：
<需要执行的文件>: <对应文件需要执行的命令数组>
*/
let cmd = {
  eslint:
    'eslint --ignore-path ./config/eslint/.eslintignore --config ./config/eslint/.eslintrc.js --fix',
  prettier:
    'prettier --ignore-path ./config/prettier/.prettierignore --config ./config/prettier/prettier.config.js --write',
  stylelint:
    'stylelint --ignore-path ./config/stylelint/.stylelintignore --config ./config/stylelint/.stylelint.config.js --fix',
};
module.exports = {
  '*.{js,jsx,ts,tsx}': [cmd.eslint, cmd.prettier],
  '{!(package)*.json,*.code-snippets,.!(browserslist)*rc}': [
    cmd.prettier + '--parser json',
  ],
  'package.json': [cmd.prettier],
  '*.vue': [cmd.eslint, cmd.prettier, cmd.stylelint],
  '*.{scss,less,styl,html}': [cmd.stylelint, cmd.prettier],
  '*.md': [cmd.prettier],
};

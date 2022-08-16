module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  rules: {
    // // hooks依赖项不能为空
    'react-hooks/exhaustive-deps': 'off',
    'no-console': 'off',
    // 缩进2
    indent: 'off',
    // 使用 === 替代 ==
    eqeqeq: [2, 'allow-null'],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': ['off'], // 关闭any类型警告
  },
};

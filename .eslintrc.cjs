module.exports = {
  root: true,
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', 'prettier'],
  env: {
    'vue/setup-compiler-macros': true,
    node: true,
  },
  globals: {
    vi: 'readonly',
  },
  rules: {
    'quote-props': [2, 'as-needed'],
    quotes: ['error', 'single'],
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
}

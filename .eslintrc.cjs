module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:mobx/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
    ],
    plugins: [
        'react',
        '@typescript-eslint',
        'mobx'
    ],
    rules: {
        'react/react-in-jsx-scope': 'off',
    },
};
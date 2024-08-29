import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] }, 
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module'
      }
    },
    settings: { react: { version: '18.3' } }, 
    plugins: { 
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,

      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ], // Chỉ export component
      'react-hooks/rules-of-hooks': 'error', // Kiểm tra Hook Rules
      'react-hooks/exhaustive-deps': 'warn', // Kiểm tra deps của useEffect
      'react/prop-types': 0, // không cần thiết phải có prop-types
      'react/display-name': 0, // không cần thiết phải có displayName

      'no-restricted-imports': [
        'error',
        {
          'patterns': ['@mui/*/*/*']
        }
      ],

      'react/jsx-no-target-blank': 'off',


      'no-console': 1, // không có console.log
      'no-lonely-if': 1, // không có if đơn lẻ
      'no-unused-vars': 1, // biến không sử dụng
      // 'no-trailing-spaces': 1, // không có dấu cách cuối dòng
      'no-multi-spaces': 1, // không có nhiều dấu cách
      'no-multiple-empty-lines': 1, // không có nhiều dòng trống
      'space-before-blocks': ['error', 'always'], // dấu cách trước dấu ngoặc mở
      'object-curly-spacing': [1, 'always'], // dấu cách sau dấu ngoặc mở
      'indent': ['warn', 2], // 2 khoảng trắng
      'semi': [1, 'never'], // không có dấu chấm phẩy
      'quotes': ['error', 'single'], // dấu nháy đơn
      'array-bracket-spacing': 1, // dấu cách sau dấu ngoặc mở
      'linebreak-style': 0, // không kiểm tra dấu xuống dòng
      'no-unexpected-multiline': 'warn', // không có xuống dòng không mong muốn
      'keyword-spacing': 1, // dấu cách sau từ khóa
      'comma-dangle': 1, // dấu phẩy cuối cùng
      'comma-spacing': 1, // dấu cách sau dấu phẩy
      'arrow-spacing': 1 // dấu cách trước và sau dấu mũi tên
    }
  }
]

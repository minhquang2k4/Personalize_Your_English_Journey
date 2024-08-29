import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  pluginJs.configs.recommended,
  {
    languageOptions: {
      globals: globals.node, // Sử dụng các biến toàn cục cho môi trường Node.js
      ecmaVersion: 'latest', 
      sourceType: 'module' // Sử dụng cú pháp module để sử dụng import/export mà không dùng require/module.exports
    },
    files: ['**/*.js'], // Chỉ kiểm tra các tệp .js
    rules: {
      // 'no-console': 1, // không có console.log 
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
  },
];
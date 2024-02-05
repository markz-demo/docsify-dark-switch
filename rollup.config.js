const terser = require('@rollup/plugin-terser');

module.exports = {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/docsify-dark-switch.js',
      format: 'cjs'
    },
    {
      file: 'dist/docsify-dark-switch.min.js',
      format: 'cjs',
      plugins: [terser()]
    }
  ]
};
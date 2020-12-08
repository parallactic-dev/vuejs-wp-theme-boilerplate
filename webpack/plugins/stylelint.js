const path = require('path');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = new StyleLintPlugin({
  configFile: path.resolve(__dirname, '../.stylelintrc.json'),
  extends: 'stylelint-config-standard',
  context: path.resolve(__dirname, '../../src/styles'),
  files: '**/*.scss',
  failOnError: false,
  quiet: true,
});

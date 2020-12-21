const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  test: /\.scss$/,
  use: [
    MiniCssExtractPlugin.loader,
    'css-loader',
    'sass-loader',
    {
      loader: 'sass-loader',
      options: {
        additionalData: '@import \'src/styles/tools\';',
      },
    },
  ]
};

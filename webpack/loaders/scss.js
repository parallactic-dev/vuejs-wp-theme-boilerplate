module.exports = {
  test: /\.scss$/,
  use: [
    'style-loader',
    'css-loader',
    //'vue-style-loader',
    'sass-loader',
    {
      loader: 'sass-loader',
      options: {
        additionalData: '@import \'src/styles/tools\';',
      },
    },
  ]
};

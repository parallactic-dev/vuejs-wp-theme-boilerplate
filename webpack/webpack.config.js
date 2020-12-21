const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const plugins = require('./plugins');
const loaders = require('./loaders');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  devtool: isDev ? 'inline-source-map' : false,
  stats: { warnings: false }, // Hide warnings

  entry: { index: './src/main.js' },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
  },

  devtool: isDev ? 'inline-source-map' : false,

  module: {
    rules: loaders,
  },

  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '@': path.resolve(__dirname, '../src/'),
      vue$: 'vue/dist/vue.esm.js',
    },
  },

  plugins,
  
  optimization: {
    chunkIds: isDev ? 'named' : 'total-size',
    minimize: !isDev,
    minimizer: isDev
      ? []
      : [
          new UglifyJsPlugin({
            cache: true,
            parallel: true,
            extractComments: true,
            uglifyOptions: {
              warnings: false,
              parse: {},
              compress: {},
              mangle: true,
              output: null,
              ie8: false,
              keep_fnames: false,
              toplevel: false,
            },
          }),
        ],
  },
};

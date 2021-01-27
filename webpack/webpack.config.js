require('dotenv').config();

const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const plugins = require('./plugins');
const loaders = require('./loaders');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  devtool: process.env.NODE_ENV === 'development' ? 'inline-source-map' : false,
  stats: { warnings: false },

  entry: { index: './src/main.js' },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: process.env.THEME_PATH + 'dist/'
  },

  devtool: process.env.NODE_ENV === 'development' ? 'inline-source-map' : false,

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
    chunkIds: process.env.NODE_ENV === 'development' ? 'named' : 'total-size',
    minimize: !process.env.NODE_ENV === 'development',
    minimizer: process.env.NODE_ENV === 'development'
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

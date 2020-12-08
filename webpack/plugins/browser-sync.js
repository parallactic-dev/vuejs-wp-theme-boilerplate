const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = new BrowserSyncPlugin({
  proxy: 'vue-wp.test',
  files: ['*.php', 'dist'],
  reloadDelay: 0,
  notify: {
    styles: {
      top: 'auto',
      bottom: '1em',
      right: '1em',
      left: 'auto',
      width: 'auto',
      padding: '1em',
      borderBottomLeftRadius: '0',
      borderBottomRightRadius: '0',
      border: 'none',
      fontSize: '18px',
      color: 'white',
      background: 'black',
    },
  },
});

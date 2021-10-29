// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.alias,
      '@': path.resolve(__dirname, 'src/')
    }
  };
  return config;
};

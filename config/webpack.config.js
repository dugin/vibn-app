var path = require('path');
var useDefaultConfig = require('@ionic/app-scripts/config/webpack.config.js');
require('dotenv').config();

module.exports = function () {
  useDefaultConfig.resolve.alias = {
    "@app/env": path.resolve('./src/environments/environment' + (process.env.IONIC_ENV === 'prod' ? '' : '.' + process.env.IONIC_ENV) + '.ts')
  };

  return useDefaultConfig;
};

'use strict';

module.exports = {
  ...require('./config'),
  ...require('./bundle-name'),
  ...require('./install'),
  ...require('./build-profile-sync')
};

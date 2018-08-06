const config = require('config');
module.exports = function() {
  console.log(config);
  if (!config.get('jwtPrivateKey')) {
    throw new Error('FATAL ERROR : jwtPrivateKey is not define');
    process.exit(1);
  }
};

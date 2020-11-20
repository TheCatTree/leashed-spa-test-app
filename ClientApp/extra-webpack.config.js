const webpack = require('webpack')
const keyPrefix = 'MYAPP_';

const keys = Object.keys(process.env).filter((key) =>
key.startsWith(KeyPrefix));

let env = {};

keys.foreEach(key => env[key] = JSON.stringify(process.env[key]));

console.log('env=', env);

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'ENV_VARS': env

    })
  ]
}

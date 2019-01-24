const fs = require('fs');
const path = require('path');

let config = {
  app: {
    port: process.env.PORT || 3010
  },
  mongodb: {
    //url: 'mongodb://用户名:登陆密码@127.0.0.1/koaapp'
    url: process.env.MONGODB_URI || 'mongodb://localhost:27017/koaapp'
  }
};

if (fs.existsSync(path.join(__dirname, './private.js'))) {
  config = Object.assign(config, require('./private.js'));
}

module.exports = config;

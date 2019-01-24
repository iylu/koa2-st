const fs = require('fs');
const path = require('path');
const Router = require('koa-router');

const router = new Router();
const basename = path.basename(module.filename); // index.js

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach((file) => {
    let route = require(path.join(__dirname, file));
    router.use(route.routes(), route.allowedMethods());
  });

module.exports = router;

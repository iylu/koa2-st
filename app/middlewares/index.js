const compose = require('koa-compose');
const response = require('./response');
const restify = require('./restify');

function middleware() {
  return compose([restify(), response]);
}

module.exports = middleware;

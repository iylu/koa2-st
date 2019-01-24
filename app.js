global.Promise = require('bluebird');
const path = require('path');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const onerror = require('koa-onerror');
const serve = require('koa-static');

// require('./app/models');
const router = require('./app/routes');
const middleware = require('./app/middlewares');
const config = require('./config/default');
const PORT = process.env.PORT || config.app.port;
const isProduction = process.env.NODE_ENV === 'production';

const app = new Koa();

// 自定义 header
app.use(async (ctx, next) => {
  const start = new Date().getTime();
  let execTime = 0;
  await next();
  execTime = new Date().getTime() - start;
  ctx.response.set('X-Response-Time', `${execTime}ms`);
  ctx.response.set('X-Powered-By', 'Koa');
});

onerror(app);

app.use(logger());

app.use(bodyParser());

if (!isProduction) {
  app.use(
    serve(path.join(__dirname, 'views'), {
      maxage: 1000 * 60 * 60 * 24 * 365, // 1年
      hidden: false // 能否返回隐藏文件, 默认false不返回
    })
  );
}

app.use(middleware());

app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`server start on port http://localhost:${PORT}`);
});

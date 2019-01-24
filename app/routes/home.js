const Router = require('koa-router');
const Home = require('../controllers/home');

const router = new Router({
  prefix: ''
});
router.get('/index', Home.index).get('', async (ctx) => {
  ctx.redirect('/index');
});

module.exports = router;

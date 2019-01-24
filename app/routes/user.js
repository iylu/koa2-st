const Router = require('koa-router');
const User = require('../controllers/user');

const router = new Router({
  prefix: 'user'
});
router.get('/query', User.query);

module.exports = router;

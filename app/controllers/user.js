const User = require('../models/user');

class UserController {
  // service
  static async query(ctx, next) {
    const { id } = ctx.request.query;
    const doc = await User.findOne({
      id
    });
    if (doc) {
      return doc;
    } else {
      ctx.body = {
        status: 'success',
        message: 'hi, gays!'
      };
    }
  }
}

module.exports = UserController;

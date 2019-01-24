class homeController {
  static async index(ctx, next) {
    ctx.body = {
      status: 'success',
      message: 'hello, world!'
    };
    return;
  }
}

module.exports = homeController;

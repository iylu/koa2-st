const response = async (ctx, next) => {
  ctx.success = ({ status = 200, data }) => {
    ctx.status = status;
    ctx.body = data;
  };

  ctx.msg = ({ status = 200, msg, code }) => {
    // status 状态码, code 错误码
    ctx.status = status;
    ctx.body = { msg, code, request: ctx.path };
  };

  ctx.error = ctx.msg;

  await next();
};

module.exports = response;

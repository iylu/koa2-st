const restify = (pathPrefix) => {
  pathPrefix = pathPrefix || '/api/';
  return async (ctx, next) => {
    // 判断是否 REST 请求
    if (ctx.request.path.startsWith(pathPrefix)) {
      ctx.rest = (data, status = 200) => {
        ctx.response.type = 'application/json';
        ctx.response.status = status;
        ctx.response.body = data;
      };
      try {
        await next();
      } catch (e) {
        ctx.response.status = 400;
        ctx.response.type = 'application/json';
        ctx.response.body = {
          code: e.code || 'internal:unknown_error',
          message: e.message || ''
        };
      }
    } else {
      // 非 REST 请求， MVC 处理
      await next();
    }
  };
};

module.exports = restify;

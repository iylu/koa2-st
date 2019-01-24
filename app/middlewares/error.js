export const errorHandle = async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    const status = e.status || 500;
    const message = e.message || '服务器内部错误';

    if (e instanceof JsonError) {
      ctx.body = {
        status: status,
        message: message
      };
      if (status == 500) {
        // 触发 koa 统一错误事件
        ctx.app.emit('error', e, ctx);
      }
      return;
    }

    ctx.status = status;
    if (status == 403) {
      ctx.body = await ctx.render('403.html', { err: e });
    }
    if (status == 404) {
      ctx.body = await ctx.render('404.html', { err: e });
    }
    if (status == 500) {
      ctx.body = await ctx.render('500.html', { err: e });
      // 触发 koa 统一错误事件
      ctx.app.emit('error', e, ctx);
    }
  }
};

// 在业务逻辑中使用
// throw new PageError('发生了一个致命错误') 不带 status,被当作 500错误
// ctx.throw(403, new JsonError('没有权限访问'))

// 继承 Error 构造器, 将错误进行细分
export class JsonError extends Error {
  constructor(message) {
    super(message);
  }
}

export class PageError extends Error {
  constructor(message) {
    super(message);
  }
}

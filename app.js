const Koa = require('koa');
const jwt = require('koa-jwt');
const router = require('koa-router')();
const json = require('koa-json');
const logger = require('koa-logger');
const auth = require('./server/routes/auth.js'); // 引入auth
const api = require('./server/routes/api.js');
const db = require('./server/config/db.js');
const serve = require('koa-static');
const path = require('path');
const historyApiFallback = require('koa-history-api-fallback'); // 引入依赖

const app = new Koa();

app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());

app.use(async (ctx, next) => {
  let start = new Date;
  ctx.body = 'Hello World!';
  await next();
  let ms = new Date - start;
  console.log('[%s] [%s] took [%s] ms', ctx.request.method, ctx.request.url, ms); // 显示执行的时间
});

app.use(async function(ctx, next) {  //  如果JWT验证失败，返回验证失败信息
  try {
    await next();
  } catch (err) {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = {
        success: false,
        token: null,
        info: 'Protected resource, use Authorization header to get access'
      };
    } else {
      throw err;
    }
  }
});


router.use('/auth', auth.routes());
router.use("/api",jwt({secret: 'vue-koa-demo'}), api.routes()); //所有走/api/打头的请求都需要经过jwt中间件的验证。secret密钥必须跟我们当初签发的secret一致



app.use(router.routes());

// app.use(historyApiFallback())
// app.use(serve(path.resolve('dist')));

app.on('error', function(err, ctx){
  console.log('server error', err);
});

app.listen(8889,() => {
  console.log('Koa is listening in 8889');
});

module.exports = app;

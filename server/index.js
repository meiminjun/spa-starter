const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('./middleware/controller');
const templating = require('./middleware/templating');
const rest = require('./middleware/rest');

// 创建一个Koa对象表示web app本身:
const app = new Koa();

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});


// static file support:
let staticFiles = require('./middleware/static-files');
app.use(staticFiles('/static/', __dirname + '/static'));

// parse request body:
app.use(bodyParser());

// add nunjucks as view:
app.use(templating('views', {
    noCache: true,
    watch: true
}));

// bind .rest() for ctx:
app.use(rest.restify());

// add controller:
app.use(controller());

// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');

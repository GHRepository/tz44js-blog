const Koa = require('koa')
const static = require('koa-static')
const views = require('koa-views')
const router = require('./routers/router')
const logger = require('koa-logger')
const body = require('koa-body')
const {join} = require('path')
const session = require('koa-session')

// 生成Koa实例
const app = new Koa()

app.keys = ['风屿是个大帅比']
// session 配置
const CONFIG = {
  key: 'Sid',
  maxAge: 3600000,
  autoCommit: true,
  overwrite: true,
  httpOnly: true,
  signed: true, //签名
  rolling: true, //是否要刷新
  renew: false,
}
// 注册日志模块
app.use(logger())


// 注册 session
app.use(session(CONFIG, app))

// 配置koa-body处理post请求数据
app.use(body())
// 配置静态资源目录
app.use(static(join(__dirname,'public')))
// 配置视图模板
app.use(views(join(__dirname,'views'),{
  extension: 'pug'
}))


// 注册路由信息
app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000, () => {
  console.log('正在监听3000端口')
})

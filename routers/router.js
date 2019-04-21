const Router = require('koa-router')
// 拿到操作user表的逻辑对象
const user = require('../control/user')
const article = require('../control/article')
const comment = require('../control/comment')
const admin = require('../control/admin')
const upload = require('../util/upload')

const router = Router()

// 设置主页
// router.get('/', user.keepLog,async (ctx) => {
//   // 需要 title
//   await ctx.render('index', {
//     title: '博客',
//     session: ctx.session
//   })
//   // ctx.body = 'index'
// })
router.get('/', user.keepLog,article.getList)
// 主要用来处理 用户登录 用户注册
// router.get('/user/:id', async (ctx) => {

// })
router.get(/^\/user\/(?=reg|login)/, async (ctx) => {
  // show为true 则显示为注册 false 显示登录
  const show = /reg$/.test(ctx.path)

  await ctx.render('register', {
    show
  })
})

// // 处理用户登录的post
// router.post('/user/login', async (ctx) => {
//   const data = ctx.request.body
//   // 把用户名提出来 ---> 上数据库查询

// })
// 用户注册
router.post('/user/reg', user.reg)

// 用户登录 
router.post('/user/login', user.login)


// restful
// 对用户的动作: 
// 登录 
// 注册
// 退出
// 新增用户 post > /user ---> 新增的用户信息
// 删除用户 delete > /user ---> 带上需要删除的用户的id
// 修改用户 
// 查询用户
// 超级管理员 ---> 用户:
// 删除某一 id 用户
// 新增一个用户:

// 用户退出
router.get('/user/logout', user.logout)

// 文章的发表页面
router.get('/article', user.keepLog, article.addPage)
// 文章添加
router.post("/article", user.keepLog, article.add)
// 文章列表分页 路由
router.get('/page/:id',article.getList)

// 文章详情页 路由
router.get("/article/:id", user.keepLog, article.details)
// 发表评论
router.post("/comment", user.keepLog, comment.save)

// 后台管理页面：文章  评论  头像上传页面
router.get("/admin/:id", user.keepLog, admin.index)
// 头像上传功能
router.post("/upload", user.keepLog, upload.single("file"), user.upload)
// 获取用户的所有评论
router.get("/user/comments", user.keepLog, comment.comlist)

// 后台：删除用户评论
router.del("/comment/:id", user.keepLog, comment.del)

// 获取用户的所有文章
router.get("/user/articles", user.keepLog, article.artlist)

// 后台：删除用户评论
router.del("/article/:id", user.keepLog, article.del)

router.get("*", async ctx => {
  await ctx.render("404", {
    title: "404"
  })
})

module.exports = router
const Router = require('koa-router')
// 拿到操作user表的逻辑对象
const user = require('../control/user')
const router = Router()

// 设置主页
router.get('/',async (ctx) => {
  // 需要 title
  await ctx.render('index', {
    title: '博客'
  })
  // ctx.body = 'index'
})
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



module.exports = router
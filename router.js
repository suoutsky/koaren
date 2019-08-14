const Koa = require('koa')
// 注意 require('koa-router') 返回的是函数:
const router = require('koa-router')()
const app = new Koa()

 // 添加路由
 router.get('/', async (ctx, next) => {
    ctx.response.body = `<h1>index page</h1>`
})

router.get('/home', async (ctx, next) => {
    ctx.response.body = '<h1>HOME page</h1>'
})

router.get('/404', async (ctx, next) => {
    ctx.response.body = '<h1>404 Not Found</h1>'
})
router.get('/user', async(ctx, next)=>{
    ctx.response.body = 
    `
      <form action="/user/register" method="post">
        <input name="name" type="text" placeholder="请输入用户名：it"/> 
        <br/>
        <input name="password" type="text" placeholder="请输入密码：1"/>
        <br/> 
        <button>GoGoGo</button>
      </form>
    `
  })
  // 增加响应表单请求的路由
  router.post('/user/register',async(ctx, next)=>{
    let {name, password} = ctx.request.body
    if( name === 'it' && password === 'i' ){
      ctx.response.body = `Hello， ${name}！`
    }else{
      ctx.response.body = '账号信息错误'
    }
  })
 // 调用路由中间件
 app.use(router.routes())

app.listen(3000, ()=>{
  console.log('server is running at http://localhost:3000')
})
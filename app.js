const Koa = require('koa')
const app = new Koa()
const router = require('./router')
const middleware = require('./middleware')
/********initdb*******/
require('./model/connector')
require('./model/initdb')

middleware(app)
router(app)
app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
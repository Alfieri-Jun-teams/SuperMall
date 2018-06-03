const koa = require('koa')
const app = new koa()

app.use(require('./swagger').middleware())
app.listen(6001, () => {
  console.log('API docs url: http://localhost:6001/apiDocs')
})

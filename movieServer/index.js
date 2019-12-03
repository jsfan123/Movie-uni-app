const express = require('express')
const app = express()


// 引入 express json 中间件
app.use(express.json())
// 解决跨域
app.use(require('cors')())


// 引入 web 路由处理文件 
require('./routers/web/router')(app)
// 引入 admin 路由处理文件 
require('./routers/admin/router')(app)
// 引入 MongoDB 数据库链接文件 
require('./plugins/db')(app)


app.listen(3000,()=>{
    console.log("http://localhost:3000/")
})
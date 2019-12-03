// 链接 MongoDB 数据库文件

module.exports = app => {
    const mongoose = require('mongoose')
    mongoose.connect('mongodb://localhost:27017/movie-uni-app',{
        useCreateIndex:true,
        useNewUrlParser:true
    })
}
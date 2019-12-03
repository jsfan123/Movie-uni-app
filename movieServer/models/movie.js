const mongoose = require('mongoose')
const MovieSchema = new mongoose.Schema({
    // 电影 名称
    name:{
        type:String
    },
    // 电影 导演
    director:{
        type:String
    },
    // 电影 主演
    protagonist:{
        type:String
    },
    // 电影 封面
    poster:{
        type:String
    },
    // 电影 预告片封面
    cover:{
        type:String
    },
    // 电影 预告片
    trailer:{
        type:String
    },
    // 电影 分数
    score:{
        type:Number
    },
    // 电影 类型  2018 / 美国 / 科幻 / 超级英雄
    movieType:{
        type:String
    },
    // 电影 原名
    originalName:{
        type:String
    },
    // 电影 制片国家/地区
    producerPlace:{
        type:String
    },
    // 电影 语言
    language:{
        type:String
    },
    // 电影 上映时间 
    releaseDate:{
        type:String
    },
    // 电影 时长
    totalTime: {
        type:String
    },
    // 电影 情节描述
    plotDesc :{
        type:String
    }
    
},
{
    timestamps:{
        createdAt:'created_time',
        updatedAt:'updated_time'
    }
})

module.exports = mongoose.model('Movie',MovieSchema)
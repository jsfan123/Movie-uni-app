const mongoose = require('mongoose')
const BannerSchema = new mongoose.Schema({
    // 轮播图 名称
    name:{
        type:String
    },
    list:[{
        // 图片链接
        image:{type:String},
        // 跳转链接
        url:{type:String},
        // sort 排序大小
        sort:{
            type:Number
        }
    }]
},
{
    timestamps:{
        createdAt:'created_time',
        updatedAt:'updated_time'
    }
})

module.exports = mongoose.model('Banner',BannerSchema)
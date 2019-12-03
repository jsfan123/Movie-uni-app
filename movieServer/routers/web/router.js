module.exports = app => {
    const express = require("express")
    const router = express.Router()

    const Banner = require('../../models/banner')
    const Movie = require('../../models/movie')

    // 引入 包装类 ResultInfo 用于数据返回规范
    const ResultInfo = require('../../entity/resultInfo')


    // 获取 首页轮播图 列表
    router.get('/index/banners/list', async (req, res) => {
        console.log(req.query)
        const model = await Banner.findOne({
            name: req.query.name
        })
        
        let result = new ResultInfo()
        result.data = model
        res.send(result)
    })

    // 获取 热门超英/预告 数据

    router.get('/index/movie/list', async (req, res) => {
        console.log(req.query)
        let model = ''
        if(req.query.type == 'superhero'){
             model = await Movie.find()
        } else if(req.query.type == 'trailer'){ // 限制显示 四条数据
            model = await Movie.find().limit(4)
        }
        
        let result = new ResultInfo()
        result.data = model
        res.send(result)
    })

    app.use('/web/api', router)

}
module.exports = app => {
    const express = require("express")
    const router = express.Router()

    const Banner = require('../../models/banner')
    const Movie = require('../../models/movie')

    // 引入 包装类 ResultInfo 用于数据返回规范
    const ResultInfo = require('../../entity/resultInfo')

    // 引入自定义 工具 函数
    const pagingFun = require('../../utils/tool')

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


    // 获取 猜你喜欢的 电影预告数据,每次请求都是不一样的数据
    router.get('/index/guess/list', async(req,res)=>{
        console.log(req.query)
        let result = new ResultInfo()
        try {
            // 随机 查询五条数据
            let model = await Movie.aggregate([{
                $sample:{size:5}
            }])
            result.data = model
            result.message = "查询成功"
        } catch (e) {
            console.log(e)
            result.message = "服务器异常"
            result.statusCode = 500
        }
        res.send(result)
    })


    // 获取
    router.get('/search/list', async(req,res)=>{
        console.log(req.query)
        let queryOptions = {}
        if (req.query.search != '' && req.query.search != null) {
            let reg = new RegExp(req.query.search,'i')
            queryOptions.$or = [{
                name: reg
            }]
        }
        console.log(queryOptions)
        pagingFun(req.query, queryOptions, Movie, res)
    })



    app.use('/web/api', router)

}
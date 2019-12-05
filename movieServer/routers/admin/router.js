module.exports = app => {
    const express = require("express")
    const router = express.Router()

    const Banner = require('../../models/banner')
    const Movie = require('../../models/movie')

    // 引入 包装类 ResultInfo 用于数据返回规范
    const ResultInfo = require('../../entity/resultInfo')

    // 引入自定义 工具 函数
    const pagingFun = require('../../utils/tool')

    // 创建一个轮播图
    router.get('/banners/create', async (req, res) => {
        // 创建轮播图数据
        let banner = {
            name: '首页轮播图',
            list: [{
                    image: '/图片.png',
                    url: '/图片.png',
                    sort: 1,
                },
                {
                    image: '/图片2.png',
                    url: '/图片2.png',
                    sort: 2,
                },
                {
                    image: '/图片3.png',
                    url: '/图片3.png',
                    sort: 3,
                },
            ]
        }

        try {
            const model = await Banner.create(banner)
            console.log(model)
            res.send({
                message: "创建成功"
            })
        } catch (e) {
            console.log(e)
            res.send({
                message: '服务器异常'
            })
        }


    })

    // 创建 8个 电影
    router.get('/movies/create', async (req, res) => {
        // 创建 电影 数据
        let movie = Array(9).fill().map((_, i) => {
            return {
                name: "少年的我",
                director: '范应彪',
                protagonist: '卤蛋 / 范应彪 / 小肥 / 肥兔 / 肥不撸嘟 / 八音布鲁肥 / 铁头娃 / 铁敷敷 / 小老憨 / 赵润南 / 郜玄铭 / 谢欣桐 / 刘然 / 何廖侣匀 / 胖虎 / 罗俊林',
                poster: '',
                cover: '',
                trailer: '',
                scroe: 8.4,
                movieType: '剧情 / 爱情 / 犯罪',
                originalName: '少年的我，如此的肥 / Better Days',
                producerPlace: '中国大陆',
                language: '汉语普通话',
                releaseDate: '2019-12-10(中国大陆)',
                totalTime: '135分钟',
                plotDesc: '　铁憨憨 （卤蛋 饰）是一名即将参加考试的高三学生，同校女生胡晓蝶（张艺凡 饰）的跳楼自杀让她的生活陷入了困顿之中。胡晓蝶死后，陈念遭到了以魏莱（周也 饰）为首的三人组的霸凌，魏莱虽然表面上看来是乖巧的优等生，实际上却心思毒辣，胡晓蝶的死和她有着千丝万缕的联系。一次偶然中，陈念邂逅了名为小北（易烊千玺 饰）的小混混，随着时间的推移，心心相惜的两人之间产生了真挚的感情。小北答应陈念在暗中保护她免受魏莱的欺凌，没想到这一决定引发了一连串的连锁反应。负责调查胡晓蝶死因的警官郑易（尹昉 饰）隐隐察觉到校园里的古怪气氛，可他的调查却屡屡遭到校方的阻挠。'
            }
        })
        console.log(movie)

        try {
            const model = await Movie.create(movie)
            console.log(model)
            res.send({
                message: "创建成功"
            })
        } catch (e) {
            console.log(e)
            res.send({
                message: '服务器异常'
            })
        }


    })

    // 获取首页轮播图列表
    router.post('/index/banners/list', async (req, res) => {
        console.log(req.params)
        const model = await Banner.findOne({
            name: req.params.name
        })
        res.send(model)
    })

    // 获取 电影列表 数据
    router.get('/movie/list', async (req, res) => {
        console.log(req.query)
        let queryOptions = {}
        if (req.query.search != '' && req.query.search != null) {
            queryOptions.$or = [{
                name: req.query.search
            }]
        }
        console.log(queryOptions)
        pagingFun(req.query, queryOptions, Movie, res)
    })

    // 创建 单个电影
    router.post('/movie/create', async (req, res) => {
        let result = new ResultInfo();
        let movie = req.body
        console.log(movie)
        try {
            const model = await Movie.create(movie)
            console.log(model)
            result.message = "创建成功"

        } catch (e) {
            console.log(e)
            result.message = "服务器异常"
        }
        res.send(result)
    })

    // 在 App 上 挂载  router 容器
    app.use("/admin/api/", router)

    // 这里上传的是一张图片，express 默认是没有接收这个文件的能力的
    // 所以需要引入一个中间件 multer 可以在 入口文件index.js 中引入
    const multer = require("multer")
    const path = require('path')
    let upload = multer({
        dest: path.join(__dirname + "/../../upload")
    })
    // dest: __dirname + '/../../upload'
    // 表示在当前文件的绝对路径下的前两级目录
    app.post("/admin/api/upload", upload.single("file"), async (req, res) => {
        const file = req.file
        // 这里返回需要返回图片的请求路径，所以需要开放静态资源文件
        file.fileUrl = `http://localhost:3000/upload/${file.filename}`
        res.send(file)
    })
}
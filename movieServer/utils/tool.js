//*************** 自定义工具函数 ***************
const resultInfo = require('../entity/resultInfo')

const Movie = require('../models/movie')

// 商品分页函数
/**
 * 
 * @param {请求参数对象} query 请求参数对象
 * @param {express的响应对象} res express的响应对象
 * @param {查询参数对象} queryOptions 查询参数对象
 * @param {数据库模型} Model 数据库模型对象
 * 
 */
async function pagingFun(query, queryOptions, Model, res) {
    let result = new resultInfo()
    try {

        let skipCount = query.pageSize * (query.currentPage - 1)
        let sortOptions = {}
        // 配置 排序参数
        sortOptions[query.orderBy] = query.sort;
        const models = await Model.find(queryOptions).limit(+query.pageSize).skip(skipCount).sort(sortOptions)
        // 返回商品数据的总长度
        const model = await Model.find(queryOptions)
        result.count = model.length
        result.data = models
        res.send(result)
    } catch (e) {
        console.log(e)
        result.message = '服务器异常'
        res.send(result)
    }
}
module.exports = pagingFun
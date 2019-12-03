class ResultInfo {
    constructor(data,message="成功",statusCode="200",count=0){
        this.message = message
        this.data = data
        this.statusCode = statusCode
        this.count = count
    }
}

let r = new ResultInfo("成功",{
        name:'123'
},200)

module.exports = ResultInfo


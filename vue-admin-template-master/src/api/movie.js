import request from '@/utils/request'

// 获取电影列表数据
export function getList(params) {
  return request({
    url: '/movie/list',
    method: 'get',
    params
  })
}

// 新建电影
export function create(params){
  return request({
    url:'/movie/create',
    method:'post',
    params
  })
}

// 保存已编辑的电影信息
export function save(data) {
  return request({
    url: '/movie/save',
    method: 'post',
    data
  })
}

// 删除单个电影
export function remove(params) {
  return request({
    url: '/movie/remove',
    method: 'delete',
    params
  })
}
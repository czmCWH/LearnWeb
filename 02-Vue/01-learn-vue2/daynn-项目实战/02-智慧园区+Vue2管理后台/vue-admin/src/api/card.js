// 默认导出的 service，导入时可以不同命。
import request from '@/utils/request'

/**
 * 获取月卡列表
 * @param {*} params 
 * @returns 
 * 接口文档地址：https://apifox.com/apidoc/shared-056d7c04-303c-43cb-9b42-8e3d457844f5/api-74531467 
 */
export function getCardListAPI(params) {
  return request({
    url: '/parking/card/list',
    method: 'get',
    params
  })
}

/**
 * 添加月卡
 * @param {*} params 参数
 * @returns 
 */
export function addCardAPI(params) {
  return request({
    url: '/parking/card',
    method: 'POST',
    data: params
  })
}
/**
 * 获取月卡详情
 * @param {*} params 
 */
export function getCardDetailAPI(id) {
  return request({
    url: `/parking/card/detail/${id}`,
    method: 'GET'
  })
}

/**
 * 编辑月卡
 * @param {*} params 
 * @returns 
 */
export function editCardAPI(params) {
  return request({
    url: '/parking/card/edit',
    method: 'put',
    data: params
  })
}

/**
 * 删除月卡
 * @param {*} id 
 * @returns 
 */
export function deleteCardAPI(id) {
  return request({
    url: `/parking/card/${id}`,
    method: 'delete',
  })
}

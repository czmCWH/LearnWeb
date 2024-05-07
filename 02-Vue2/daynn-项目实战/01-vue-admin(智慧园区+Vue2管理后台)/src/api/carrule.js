import request from '@/utils/request'

/**
 * 查看计费规则列表
 * @param {*} params 
 * @returns 
 */
export function getPackingRuleListAPI(params) {
  return request({
    url: '/parking/rule/list',
    params
  })
}

/**
 * 添加计费规则
 * @param {*} params 
 * @returns 
 */
export function addFeeRuleAPI(params) {
  return request({
    url: '/parking/rule',
    method: 'post',
    data: params
  })
}
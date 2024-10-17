// 默认导出的 service，导入时可以不同命。
import request from '@/utils/request'

// 登录函数
/**
 * @description: 登录函数
 * @param {*} data { mobile,password}
 * @return {*} promise
 * 
 * 按需导出
 */
export function loginAPI(data) {
  return request({
    url: '/park/login',
    method: 'POST',
    data
  })
}

/**
 * 登录成功-查询登录人用户、角色和权限信息
 * @param {*} params 
 * @returns 
 */
export function getUserProfileAPI(params) {
  return request({
    url: '/park/user/profile',
    method: 'GET'
  })
}
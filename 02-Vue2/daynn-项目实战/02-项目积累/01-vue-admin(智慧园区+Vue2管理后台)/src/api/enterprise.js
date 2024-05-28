import request from '@/utils/request'

// https://apifox.com/apidoc/shared-056d7c04-303c-43cb-9b42-8e3d457844f5/api-74531495
/**
 * 获取企业列表
 * @param {*} params 
 * @returns 
 */
export function getEnterpriseListAPI(params) {
  return request({
    url: '/park/enterprise',
    params
  }) 
} 

/**
 * 获取企业所属行业列表
 * @returns 
 */
export function getIndustryListAPI() {
  return request({
    url: '/park/industry'
  })
}

/**
 * 添加企业
 * @param {*} params 
 * @returns 
 */
export function addEnterpriseAPI(params) {
  return request({
    url: '/park/enterprise',
    method: 'post',
    data: params
  })
}

/**
 * 园区管理-获取企业信息
 * @param {*} id 
 * @returns 
 */
export function getEnterpriseDetailAPI(id) {
  return request({
    url: `/park/enterprise/${id}`
  })
}

/**
 * 编辑企业信息
 * @param {*} params 
 * @returns 
 */
export function updateEnterpriseAPI(params) {
  return request({
    url: '/park/enterprise',
    method: 'PUT',
    data: params
  })
}

/**
 * 删除企业
 * @param {*} id 
 * @returns 
 */
export function deleteEnterpriseAPI(id) {
  return request({
    url: `/park/enterprise/${id}`,
    method: 'Delete'
  })
}

/**
 * 获取可租赁的楼宇
 */
export function getRentBuildingAPI() {
  return request({
    url: '/park/rent/building'
  })
}

/**
 * 添加租赁合同
 * @param {*} params 
 * @returns 
 */
export function addRentAPI(params) {
  return request({
    url: '/park/enterprise/rent',
    method: 'post',
    data: params
  })
}

/**
 * 获取展开的租赁合同信息
 * @param {*} id 
 * @returns 
 */
export function getEnterpriseRentBuildingAPI(id) {
  return request({
    url: `/park/enterprise/rent/${id}`
  })
}

/**
 * 园区管理-退租租赁合同

 * @param {*} id 
 * @returns 
 */
export function rentingOutAPI(id) {
  return request({
    url: `/park/enterprise/rent/${id}`,
    method: 'put'
  })
}
// 默认导出的 service，导入时可以不同命。
import request from '@/utils/request'

/**
 * 获取角色列表
 * @returns 
 */
export function getRoleListAPI() {
  return request({
    url: '/park/sys/role'
  })
}

/**
 * 角色管理-查询所有功能权限(树形)
 * @returns 
 */
export function getPermisionTreeListAPI() {
  return request({
    url: '/park/sys/permision/all/tree'
  })
}

/**
 * 查询当前角色详情-权限和分配人数
 * @param {*} roleId 
 * @returns 
 */
export function getRoleDetailAPI(roleId) {
  return request({
    url: `/park/sys/role/${roleId}`
  })
}

/**
 * 角色管理-角色关联的用户列表
 * @param {*} param0 
 * @returns 
 */
export function getRoleUserListAPI(roleId, params) {
  return request({
    url: `/park/sys/roleUser/${roleId}`,
    params: params
  })
}

/**
 * 角色管理-添加角色
 * @param {*} params 
 * @returns 
 */
export function addRoleUserAPI(params) {
  return request({
    url: '/park/sys/role',
    method: 'POST',
    data: params
  })
}

/**
 * 角色管理-修改角色
 * @param {*} param
 * @returns 
 */
export function updateRoleUserAPI(params) {
  return request({
    url: '/park/sys/role',
    method: 'PUT',
    data: params
  })
}

/**
 * 删除角色
 * @returns
 */
export function delRoleUserAPI(roleId) {
  return request({
    url: `/park/sys/role/${roleId}`,
    method: 'DELETE'
  })
}
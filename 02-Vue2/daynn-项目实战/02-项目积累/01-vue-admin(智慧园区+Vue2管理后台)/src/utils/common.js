import request from '@/utils/request'

/**
 * 
 * @param {*} form 参数
 * @returns 
 */
export function uploadFileAPI(form) {
  return request({
    url: '/upload',
    method: 'post',
    data: form
  })
}
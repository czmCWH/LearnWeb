import type { LoginResult } from '@/types/member'
import { http } from '@/utils/http'

type LoginParams = {
  code: string,
  encryptedData: string,
  iv: string
}
/**
 * 小程序一键登录
 * @param data 请求参数
 * @returns
 */
export const postLoginWxMin = (data: LoginParams) => {
  return http<LoginResult>({
    method: 'POST',
    url: 'login/wxMin',
    data
  })
}


/**
 * 模拟小程序登录
 * @param phoneNumber 模拟手机号码
 */
export const postLoginWxMinSimple = (phoneNumber: string) => {
  return http<LoginResult>({
    method: 'POST',
    url: '/login/wxMin/simple',
    data: {
      phoneNumber
    }
  })
}

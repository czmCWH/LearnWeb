import { http } from "@/utils/http"
import type { AddressItem, AddressParams } from "@/types/address"

/**
 * 获取收获地址
 */
export const getMemberAddressAPI = () => {
  return http<AddressItem[]>({
    method: 'GET',
    url: '/member/address'
  })
}

/**
 * 获取收获地址详情
 */
export const getMemberAddressByIdAPI = (id: string) => {
  return http<AddressItem>({
    method: 'GET',
    url: `/member/address/${id}`,
  })
}

/**
 * 添加收获地址
 * @param 请求参数
 */
export const postMemberAddressAPI = (data: AddressParams) => {
  return http({
    method: 'POST',
    url: '/member/address',
    data
  })
}

/**
 * 修改收货地址
 * @param id 地址ID
 * @param data 地址信息
 */
export const putMemberAddressAPI = (id: string, data: AddressParams) => {
  return http({
    method: 'PUT',
    url: `/member/address/${id}`,
    data
  })
}

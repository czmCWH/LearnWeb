import { http } from "@/utils/http"
import type { ProfileDetail, ProfileParams } from "@/types/member"

/**
 * 获取会员信息
 * @returns
 */
export const getMemberProfileAPI = () => {
  return http<ProfileDetail>({
    method: 'GET',
    url: '/member/profile'
  })
}

/**
 * 修改会员信息
 *
 */
export const putMemberProfileAPI = (data: ProfileParams) => {
  return http<ProfileDetail>({
    method: 'PUT',
    url: '/member/profile',
    data
  })
}

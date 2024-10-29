import { useMemberStore } from '@/stores'
/**
 * 添加请求拦截器：
 *    拦截 request 请求；
 *    拦截 uploadFile 请求；
 */

const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'

// 将当前项目所有 tabBar 页面列出来
const tabBarPagePaths = [
  'pages/index/index',
  'pages/category/category',
  'pages/cart/cart',
  'pages/my/my'
]

// 添加拦截器
const httpInterceptor = {
  // 拦截前触发
  invoke(options: UniApp.RequestOptions) {

    // 1、非 http 开头需拼接基础url地址
    if (!options.url.startsWith('http')) {
      options.url = baseURL + options.url
    }

    // 2、请求超时，默认60秒，调整为10秒
    options.timeout = 10000

    // 3、添加小程序端请求头标识
    options.header = {
      ...options.header,
      'source-client': 'miniapp'
    }

    // 4、添加 token 请求头标识
    const memberStore = useMemberStore()
    const token = memberStore.profile?.token
    if (token) {
      options.header.Authorization = token
    }

  }
}
uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)


/**
 * 请求函数
 * @param  UniApp.RequestOptions
 * @returns Promise
 *
 *  2. 获取数据成功
 *    2.1 提取核心数据 res.data
 *    2.2 添加类型，支持泛型
 *  3. 获取数据失败
 *    3.1 401错误  -> 清理用户信息，跳转到登录页
 *    3.2 其他错误 -> 根据后端错误信息轻提示
 *    3.3 网络错误 -> 提示用户换网络
 */

interface Data<T> {
  code: string
  msg: string
  result: T
}

// 2.2 添加类型，支持泛型
export const http = <T>(options: UniApp.RequestOptions) => {
  // 1. 返回 Promise 对象，用于处理返回值类型
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...options,
      // 2. 获取数据成功
      success(res) {
        // 状态码 2xx，axios 是这样设计的
        if (res.statusCode >= 200 && res.statusCode < 300) {
          // 2.1 提取核心数据 res.data
          resolve(res.data as Data<T>)
        } else if (res.statusCode === 401) {
          // 3.1 401错误  -> 清理用户信息，跳转到登录页

          // 获取当前页面路径
          const pageStack = getCurrentPages()
          const currentPage = pageStack[pageStack.length - 1]
          const redirectURL = currentPage.route ?? ''
          // 判断数组中是否包含某个单元
          const routeType = tabBarPagePaths.includes(redirectURL) ? 'switchTab' : 'redirectTo'

          // 清理用户信息
          const memberStore = useMemberStore()
          memberStore.clearProfile()
          // 跳转到登录页
          // uni.navigateTo({url: '/pages/login/login'})
          // 跳转到登录页(需要在地址上拼凑参数，即回跳地址)
          uni.redirectTo({
            url: `/pages/login/login?redirectURL=/${redirectURL}&routeType=${routeType}`
          })

          // 标记请求失败
          reject(res)
        } else {
          // 3.2 其他错误 -> 根据后端错误信息轻提示
          uni.showToast({
            title: (res.data as Data<T>)?.msg || '请求错误',
            icon: 'none',
            mask: false
          })
          reject(res)
        }
      },
      // 响应失败
      fail(err) {
        // 网络错误 -> 提示用户换网络
        uni.showToast({
          icon: 'none',
          title: '网络错误，换个网络试试',
        })
        reject(err)
      }
    })
  })


}
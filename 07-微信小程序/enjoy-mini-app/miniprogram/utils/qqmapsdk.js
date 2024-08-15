/**
 * 使用《腾讯位置服务》注意事项：
 * <https://lbs.qq.com/dev/console/application/mine>
 * 1、根据其 API 需要在微信小程序管理后台添加 合法域名，添加https://apis.map.qq.com
 * 2、如果使用 小程序授权错误(比如：位置服务)，可以点击【微信开发者工具】顶部【清缓存】=> 清除所有即可。
 * 3、注意：在JS中使用 import 必须使用相对路径 !!!!!!!!
 */
import QQMapWX from '../libs/qqmap-wx-jssdk'

// 创建 QQMap 实例
const qqmapsdk = new QQMapWX({
  key: 'WQOBZ-ERLKJ-RNQFR-DZSYV-QHV6S-DTB6D'
});

export default qqmapsdk;

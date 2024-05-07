// 放置全局指令
import Vue from 'vue'
import store from '@/store'

const adminPerms = '*:*:*'

/**
 * 自定义全局指令 permission，使用时用 v-permission
 */
 Vue.directive('permission', {
  /**
   * 
   * @param {*} el 使用了该指令的 DOM 元素
   * @param {*} binding 对象 表示 指令绑定到的对象。binding.value 可以接受到外部传递过来值
   */
  inserted(el, binding) {
    // console.log('自定义指令 permission = ')
    // console.log(el)
    // console.log(binding)

    // 如果 permission 绑定的权限值，不在接口返回权限数组中，就隐藏该DOM元素
    const perms = store.state.menu.permission

    // 如果是管理员权限，则权限指令不做其它处理
    if (perms.includes(adminPerms)) {
      return
    }

    if (!perms.includes(binding.value)) {
      // 此方式让元素隐藏不可取，当用户调试时，可以改值让其显示，这样不安全
      // el.style.display = 'none'
      // 让元素从 DOM 层级中直接移除
      el.remove()
    }
  }
 })
/**
 *
 * declare module '@vue/runtime-core'
 *   现调整为
 * declare module 'vue'
 */
import XtxSwiper from '@/components/XtxSwiper.vue'
import XtxGuess from '@/components/XtxGuess.vue'

// 配置自动导入的【通用组件】是没用类型的，在此处声明组件类型，用于代码中类型识别
declare module 'vue' {
  export interface GlobalComponents {
    XtxSwiper: typeof XtxSwiper
    XtxGuess: typeof XtxGuess
  }
}

// 定义组件实例类型
export type XtxGuessInstance = InstanceType<typeof XtxGuess>

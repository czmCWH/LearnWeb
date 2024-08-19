type ResType<T> = {
  message: string
  data: T
}


// 频道相关类型
export type ChannelItem = {
  id: number
  name: string
}

// export type ChannelRes = {
//   data: {
//     channels: ChannelItem[]
//   }
//   message: string
// }

export type ChannelRes = ResType<{ channels: ChannelItem[] }>

// 文章列表相关的类型

// 文章对象类型
export type ArticleItem = {
  art_id: string
  aut_id: string
  aut_name: string
  comm_count: number
  cover: {
    type: number
    images: string[]
  }
  is_top: number
  pubdate: string
  title: string
}
// 文章接口响应数据类型
// export type ArticleResData = {
//   data: {
//     pre_timestamp: string
//     results: ArticleItem[]
//   }
//   message: string
// }
export type ArticleResData = ResType<{ 
  pre_timestamp: string 
  results: ArticleItem[]
}>
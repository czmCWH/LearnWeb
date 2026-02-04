import { Suspense, useEffect, useState } from "react";

/*
 1、结合 Suspense 实现优雅的数据加载UI
 use 和 Suspense 的结合，是 React 官方推荐的，用于在客户端获取数据的方式，它彻底改变了 “Fetch-on-render” 的模式。

*/

const delay = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  })
}

const fetchMessage = async () => {
  await delay(2000);
  return "hello world";
}

const MessageBox = () => {
  // 状态
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  // 副作用
  useEffect(() => {
    setLoading(true);
    fetchMessage().then((res) => {
      setMessage(res);
    }).finally(() => {
      setLoading(false);
    });
  }, []);
  return <div>{loading ? "loading..." : message}</div>
}

export const SuspenseNewBox = () => {
  return (
    <div>
      <Suspense fallback={<div>loading...</div>}>
        <MessageBox />
      </Suspense>
    </div>
  )
}

import { Suspense, useEffect, useState } from "react";

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

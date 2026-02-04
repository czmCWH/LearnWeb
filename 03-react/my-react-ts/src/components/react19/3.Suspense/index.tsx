import { lazy, Suspense } from "react";

/*

  1、Suspense
   Suspense 用于加载异步组件
 
 */

const ChildBox = lazy(() => import("./ChildBox"));

export const SuspenseBox = () => {
  return (
    <>
      <Suspense fallback={<div>loading...</div>}>
        <ChildBox />
      </Suspense>
    </>
  );
}
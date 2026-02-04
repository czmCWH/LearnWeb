import { createBrowserRouter } from "react-router";
import Login from "../page/Login";
// import App from "../page/App";
import App from '@/page/App';
import Article from "../page/Article";
import Reducer from "../page/Reducer";

// 1、创建 Router 实例对象，并配置路由对应关系
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
    // Component: Login   // 新配置方式
  },
  {
    path: "/reducer",
    Component: Reducer   // 新配置方式
  },
  {
    path: "/article/:id?/:name?",
    element: <Article />
  },
]);

export default router;
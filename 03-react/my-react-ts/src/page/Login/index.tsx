import { Link, useNavigate } from "react-router";
import "./index.scss";

/*
 

 */

const Login = () => {
  const navigate = useNavigate();

  const onNavigation = () => {
    navigate("/article");
  };

  const onNavigation2 = () => {
    navigate("/article?name=张三&age=18");
  };

  const onNavigation3 = () => {
    navigate("/article/1001/李四");
  };

  return (
    <div className="page-box">
      <div className="title">我是登录页面</div>
      {/* 路由导航的常用方式 */}
      {/* 1、声明式语法 */}
      <Link to={"/article"}>跳转到文章页面</Link>
      {/* 2、命令式语法 */}
      <button onClick={onNavigation}>点击跳转</button>
      <button onClick={onNavigation2}>点击跳转URL路径传参</button>
      <button onClick={onNavigation3}>点击跳转Params传参</button>
    </div>
  );
};

export default Login;

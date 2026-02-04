import { useSearchParams, useParams } from "react-router";

const Article = () => {
  // 1、获取URL查询参数
  const [params] = useSearchParams();
  const name = params.get("name");
  const age = params.get("age");

  // 2、获取URL路径参数
  const paramsObj = useParams();
  const id = paramsObj.id;
  const name2 = paramsObj.name;

  return (
    <div className="page-box">
      <div>我是文章页面</div>
      <div>
        url查询参数：{name}， {age}
      </div>
      <div>
        url路径参数：{id}， {name2}
      </div>
    </div>
  );
};

export default Article;

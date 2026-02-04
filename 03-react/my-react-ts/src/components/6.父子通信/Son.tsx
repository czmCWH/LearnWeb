import { useRef } from "react";

interface SonProps {
  title: string | null;
  count: number;
  render?: () => React.ReactNode;   // 接收父组件的渲染函数，类似于Vue的插槽。称为 render props
  onChange?: (value: string) => void;   // 子组件通过回调函数向父组件传递数据
  children: React.ReactNode | null;  // ⚠️，children 表示子组件标签内嵌套的组件
}

function Son(props: SonProps) {

  // 解构接收的 Props - props 对象中包含了父组件传递的所有数据
  const { title, count, render, onChange } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    onChange?.(inputRef.current?.value ?? '');
  }

  return (
    <>
      <h4>Son - 子组件</h4>
      {/* 1、渲染父组件传递的数据 */}
      <div>
        {`title = ${title}, count = ${count}`}
      </div>
      {/* 2、渲染父组件需要渲染的内容 */}
      {
        render?.()
      }
      {/* 3、发送数据到父组件 */}
      <div>
        <input ref={inputRef} />
        <button onClick={handleSend}>发送数据</button>
      </div>
      {/* 4、渲染子组件内嵌套的组件 */}
      {
        props.children
      }
    </>
  )

}

export default Son
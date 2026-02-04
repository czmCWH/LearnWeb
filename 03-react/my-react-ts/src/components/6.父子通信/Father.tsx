import { useState } from "react";
import Son from "./Son"

/*
 1、父子组件通信 Props
  父组件通过 Props 将数据和函数传递给子组件，从而实现对子组件的配置和控制。实现步骤：
    - 父组件传递数据：在子组件标签上绑定属性
    - 子组件接收数据：子组件通过 props 参数接收数据
  
  props就是函数式组件的形式参数，用于接收父组件传递的任意类型的数据。
  props 是只读对象，子组件只能读取 props 中的数据。
  当把内容嵌套在子组件标签中时，父组件会自动在名为 children 的 prop 属性中接收该内容。

 2、使用 “状态提升” 可实现兄弟组件通信
  A组件通过子传父的方式把数据传递给父组件 App;
  App 拿到数据后通过父传子的方式再传递给 B 组件；

  
 3、React 组件的状态：
    Props 属性：外部给组件输入的数据
      - 属性传值；
    State 状态：组件内部维持的数据
      - 内部状态管理；
 */
interface AProps {
  onGetName: (name: string) => void;
}
function A({onGetName}: AProps) {
  const name = '我是A组件的数据';

  return (
    <>
      <button onClick={() => onGetName(name)}>A 组件发送数据</button>
    </>
  )
}

function B({name}: {name: string}) {
  return (
    <>
      <div>我是B组件：{name}</div>
    </>
  )
}

function Father() {

  const [num, setNum] = useState(0);

  const [name, setName] = useState('');

  return (
    <>
      <h3>Father - 父组件</h3>
      <div>
        <span>{num}</span> <button onClick={() => setNum(num + 1)}>增加</button>
      </div>
      <Son 
        title={'说吧'}
        count={num}
        render={() => {
          return <div>
            <p>天高云淡，望断南飞雁。</p>
            <p>不到长城非好汉，屈指行程二万。</p>
          </div>
        }}
        onChange={(val: string) => {
          console.log('--- 子组件传递 = ', val);
        }}
      >
        <span style={{color: 'red', fontSize: '18px'}}>我是子组件内嵌的组件</span>
      </Son>

      {/* 兄弟组件通信：“状态提升” */}
      <div style={{marginTop: '30px'}}>
        <A onGetName={(val) => setName(val)}/>
        <B name={name} />
      </div>
    </>
  )

}

export default Father
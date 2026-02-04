import { useState, useReducer } from 'react';

// function ReducerBox() {
  
//   const [info, setInfo] = useState({
//     name: 'jack',
//     age: 18,
//   })

//   return (
//     <>
//       <p>info: { info.name }</p>
//       <p>info: { info.age }</p>

//       <input
//         value={info.name}
//         onChange={(ev) => {
//           setInfo((pre) => ({
//             ...pre,
//             name: ev.target.value,
//           }))
//         }}
//       />
//     </>
//   )
// }

// 1. 定义状态类型
interface InfoState {
  name: string;
  age: number;
}

// 2. 定义 Action 类型（使用联合类型增强安全性）
type Action =
  | { type: 'changeName'; payload: string }
  | { type: 'changeAge'; payload: string };

const initialState: InfoState = {
  name: 'jack',
  age: 18,
}

const reducer = (state: InfoState, action: Action) => {
  switch (action.type) {
    case 'changeName':
      return {
        ...state,
        name: action.payload
      }
    case 'changeAge': 
      return {
        ...state,
        age: Number(action.payload)
      }
    default:
      return state
  }
}


function ReducerBox() {
  
  const [info, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <p>info: { info.name }</p>
      <p>info: { info.age }</p>

      <input
        value={info.name}
        onChange={(ev) => {
          dispatch({
            type: 'changeName',
            payload: ev.target.value,
          })
        }}
      />
      <input
        value={info.age}
        onChange={(ev) => {
          dispatch({
            type: 'changeAge',
            payload: ev.target.value,
          })
        }}
      />
    </>
  )
}

export default ReducerBox;

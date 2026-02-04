import { createSlice, nanoid } from '@reduxjs/toolkit'


function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const initialState = {
  list: [],
}

/*
  channelSlice 定义异步逻辑
 */

const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    setChannels: (state, action) => {
      state.list = action.payload
    },
  }
})

export const { setChannels } = channelSlice.actions

const fetchChannelList = () => {
  return async (dispatch: any) => {
    const res: any = await fetch('http://geek.itheima.net/v1_0/channels');
    const jsonRes = await res.json();
    dispatch(setChannels(jsonRes.data.channels));
  }
}

export { fetchChannelList }
export default channelSlice.reducer
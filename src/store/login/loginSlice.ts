import { createSlice } from '@reduxjs/toolkit';

const { actions, reducer: LoginReducer } = createSlice({
  // 命名空间，作为action type前缀
  name: 'login',
  // 初始化状态数据
  initialState: {
    token: 'test.token',
    userInfo: {}, // 用户信息
    routeList: [], // 用户路由
  },
  // reducer更新函数  dispatch使用的action函数
  reducers: {
    setToken: (state, { payload }) => {
      state.token = payload;
    },
  },
});

// 异步操作
export const asyncOption = (payload: any) => {
  return async (dispatch: any, getState: any) => {
    setTimeout(() => {
      dispatch(setToken(payload));
    }, 3000);
  };
};

// 导出action函数
export const { setToken } = actions;

// 导出reducer, 创建store
export default LoginReducer;

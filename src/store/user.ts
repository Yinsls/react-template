import { USER_ROLE_ENUM } from '@/constants/user'
import { createSlice } from '@reduxjs/toolkit'

export interface UserStateProps {
  userId: string
  name: string
  phone: string
  // 添加角色字段
  role: USER_ROLE_ENUM
}

// export const setUserInfo = (info: UserStateProps) => {
//   return {
//     ...info,
//   }
// }

// export const initUser = (): UserStateProps => {
//   return {
//     userId: '',
//     name: '',
//     phone: '',
//     // 默认给个游客角色
//     role: USER_ROLE_ENUM.GUEST,
//   }
// }

const { actions, reducer: UserReducer } = createSlice({
  // 命名空间，作为action type前缀
  name: 'login',
  // 初始化状态数据
  initialState: {
    userId: '',
    name: '',
    phone: '',
    role: USER_ROLE_ENUM.GUEST,
  },
  // reducer更新函数  dispatch使用的action函数
  reducers: {
    setUserInfo: (state, { payload }) => {
      const { userId, name, phone, role } = payload
      state.userId = userId
      state.name = name
      state.phone = phone
      state.role = role
    },
    initUser: (state) => {
      state.userId = ''
      state.name = ''
      state.phone = ''
      state.role = USER_ROLE_ENUM.GUEST
    },
  },
})

export const { setUserInfo, initUser } = actions
export default UserReducer

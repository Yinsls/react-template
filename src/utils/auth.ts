import { USER_ROLE_ENUM } from '@/constants/user'
// import { dispatch } from '@/store'
import { initUser, setUserInfo } from '@/store/user'
import { useDispatch } from 'react-redux'

/**
 * 这里本该是读取登录态
 * 我们直接写死 每次进来都是未登录
 */

let isLogin = false

export function useAuth() {
  const dispatch = useDispatch()

  const signIn = () => {
    isLogin = true

    dispatch(
      setUserInfo({
        userId: '123',
        name: 'awefeng',
        phone: '',
        role: USER_ROLE_ENUM.ADMIN,
      })
    )
  }

  const signOut = () => {
    isLogin = false
    dispatch(initUser())
  }

  return {
    signIn,
    signOut,
    isLogin,
  }
}

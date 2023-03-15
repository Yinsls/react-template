import { FC } from 'react'
import { useParams } from 'react-router-dom'

const User: FC = () => {
  const { userId = null } = useParams()
  return <div>userId: {userId}</div>
}

export default User

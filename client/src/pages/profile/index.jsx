
import { useAppStore } from '@/store'
const { userInfo} = useAppStore
const Profile = () => {
  return (
    <div>Profile
      <div>email :{userInfo.}</div>
    </div>
  )
}

export default Profile
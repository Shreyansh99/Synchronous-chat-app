
import { useAppStore } from '@/store'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoArrowBack } from 'react-icons/io5'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { getColor } from '@/lib/utils'
import {FaTrash, FaPlus} from 'react-icons/fa'

const Profile = () => {
  const { userInfo, setUserInfo } = useAppStore()
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [image, setImage] = useState(null)
  const [hovered, setHovered] = useState(false)
  const [SelectedColor, setSelectedColor] = useState(0)
  return (
    <div className='bg-gradient-to-r from-slate-900 to-slate-700 h-[100vh] flex items-center justify-center flex-col gap-10'>
      <div className="flex flex-col gap-10 w-[80vw] md:w-max ">
        <div>
          <IoArrowBack className='text-4xl lg:text-6xl text-white/90 cursor-pointer' />
        </div>
        <div className="grid grid-cols-2">
          <div className="h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}>
            <Avatar className='h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden'>
              {
                image ? <AvatarImage src={image} classname='object-cover w-full h-full bg-black' alt='profile' />
                  : (<div className={` uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] flex items-center justify-center rounded-full ${getColor(SelectedColor)}`}>
                        {firstName ? firstName.split("").shift() : userInfo.email.split("").shift()}</div>)   
              }
            </Avatar>
            {
              hovered && (<div className='absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer '>{image ? <FaTrash/> : <FaPlus/>}</div>)
            }

          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom"

import Auth from "./pages/auth"
import Chat from "./pages/chat"
import Profile from "./pages/profile"
import { useEffect, useState } from "react"
import { useAppStore } from "./store"
import { apiClient } from "./lib/api-client"
import { GET_USER_INFO } from "./utils/constants"

const PrivateRoute = ({children }) => {
  const { userInfo } = useAppStore()
  const isAuthenticated = Boolean(userInfo)
  return isAuthenticated ? children : <Navigate to='/auth'/>
}

const AuthRoute = ({children}) => {
  const { userInfo } = useAppStore()
  const isAuthenticated = Boolean(userInfo)
  return isAuthenticated ? <Navigate to='/chat'/> : children
}


const App = () => {
  const { userInfo, setUserInfo } = useAppStore()
  const [loading, setloading] = useState(true)

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await apiClient.get(GET_USER_INFO, {
          withCredentials : true
        })
        console.log(res.data)
        if (res.status === 200 && res.data.id) {
          setUserInfo(res.data)

        }
        else {
          setUserInfo(undefined)
        }
      } catch (error) {
        console.log(error.message)
        setUserInfo(undefined)
      }finally{
        setloading(false)
      
      }
    }
    if (!userInfo) {
      getUserData()
    }
  }, [userInfo,setUserInfo])

  if(loading){
    return <div>Loading....</div>
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthRoute><Auth /></AuthRoute>} />
        <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="*" element={<Navigate to='/auth' />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Signup from '../pages/Signup'
import Login from '../pages/Login'
import Home1 from '../pages/Home1'
import { GlobalContext } from '../context/Context'
import Home2 from '../pages/Home2'

const CustomRoutes = () => {
    let {state, dispatch } = useContext(GlobalContext)
  return (
    <div>
        {(state?.isLogin == true )?
      <Routes>
        <Route path="/" element={<Home1 />} />
        <Route path="home2" element={<Home2 />} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
      :
      (state?.isLogin == false )?
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to={"/login"} />} />
      </Routes>
      :
      <p>Loading....</p>
     }
    </div>
  )
}

export default CustomRoutes

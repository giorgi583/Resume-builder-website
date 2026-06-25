import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import api from './configs/api.js'
import { login } from './app/features/authSlice.js'
import {Toaster} from 'react-hot-toast'
// pages
import Home from './pages/Home'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import ResumeBuilder from './pages/ResumeBuilder'
import Preview from './pages/Preview'
import Login from './pages/Login'
import { setLoading } from './app/features/authSlice.js'
const App = () => {
  const dispatch = useDispatch()
  const getUserData = async () => {
    const token = localStorage.getItem('token')
    try {
if(token) {
  const {data} = await api.get('/api/users/data', {headers: {Authorization: `Bearer ${token}`}})
  if(data.user) {
    dispatch(login({user: data.user, token}))
}
dispatch(setLoading(false))
    }
  else {
    dispatch(setLoading(false)) }
  }
    catch(error) {
      console.log(error.message)
      dispatch(setLoading(false))
    }
  }
  useEffect(() => {
    getUserData()
  }, [])
  return (
    <>
    <Toaster/>
    <Routes>
<Route path="/" element={<Home />} />
<Route path="app" element={<Layout />} >
<Route index element={<Dashboard />} />
<Route path="builder/:resumeId" element={<ResumeBuilder />} />
</Route>
<Route path="view/:resumeId" element={<Preview />} />

    </Routes>
    </>
  )
}

export default App
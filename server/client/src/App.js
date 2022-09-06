import React, {useEffect,createContext, useReducer, useContext, useState} from 'react'
import NavBar from './components/Navbar'
import "./App.css"
import {BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom'
import Home from './components/screens/Home'
import Signin from './components/screens/Login'
import Signup from './components/screens/Signup'
import Profile from './components/screens/Profile'
import CreatePost from './components/screens/CreatePost'
import {reducer, initialState} from './reducers/userReducer'
import SubscribeUserPosts from './components/screens/SubscribesUserPosts'
import UserProfile from './components/screens/UserProfile'

export const UserContext = createContext()

const Routing = ()=>{
  const navigate = useNavigate()
  const {state, dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER", payload:user})
      // navigate('/')
    }else{
      navigate('/signin')
    }
  },[])
  
  return(
    <Routes>
        <Route path="/" element={<Home/>} />
         
        <Route path="/signin" element={<Signin/>} />
        <Route path="/signup" element={<Signup/>} />
          

        <Route path="/profile" element={<Profile/>} />
        <Route path="/create" element={<CreatePost/>} />
        <Route path="/profile/:userid" element={<UserProfile/>} />
        <Route path="/myfollowingpost" element={<SubscribeUserPosts/>} />
      </Routes>

  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <UserContext.Provider value={{state, dispatch}}>
    <BrowserRouter>
      <NavBar />
      <Routing />
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;

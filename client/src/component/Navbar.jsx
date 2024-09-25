import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

function Navbar() {

  const {data} = useSelector((state) => state.userSlice )

  return (
    <div>
      <NavLink to={`auth/login`}>
         Login
      </NavLink><br />
      <NavLink to={`auth/signup`}>
         Signup
      </NavLink>

      <button onClick={() => {
        console.log(data)
      }}>Click me</button>
    </div>
  )
}

export default Navbar
import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {

  return (
    <div>
      <NavLink to={`auth/login`}>
         Login
      </NavLink>
    </div>
  )
}

export default Navbar
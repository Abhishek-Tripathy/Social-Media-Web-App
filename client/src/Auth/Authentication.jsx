import React from 'react'
import { useParams } from 'react-router-dom'
import Login from '../Pages/Login'
import Signup from '../Pages/Signup'

function Authentication() {
  const parameter = useParams()
  const type = parameter.type

  switch (type) {
    case 'login' : 
      return <Login />

    case 'signup' : return <Signup />

    default : return <div>Error</div>
  }
}

export default Authentication
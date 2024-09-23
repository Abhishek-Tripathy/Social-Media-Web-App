import React, { useState } from 'react'
import {toast} from 'react-toastify'
import axios from 'axios'

function Login() {
   function handleSubmit (e) {
      e.preventDefault()

      const formData = new FormData(e.target)
      const obj = Object.fromEntries(formData.entries())
      
      axios.post('http://localhost:8000/api/v1/signin', obj)
      .then(
        (res) => {
          const {status, message} = res.data
          
          if(!status) return toast(message)
        } 
      )
      .catch(
        (error) => {
         if(error.response.status === 400) return toast(error.response.data.message)

         toast("Network Connection Error")
        }
      )

      
   }
   const formElements = [{type: 'text', placeholder: 'Email', name: 'emailOrUsername', label: 'Email or User Name' },
      {type: 'password', placeholder: 'Password', name: 'password', label: 'Password'}
   ]
  return (
    <div>
      <form onSubmit={handleSubmit}>
         {formElements.map(({type, placeholder, label, name}) => (
            <div key={name}>
               <label htmlFor={name}>{label}</label>
               <input type={type} name={name} placeholder={placeholder} id={name} />
            </div>
         ) )}
         <button>Login</button>
      </form>
    </div>
  )
}

export default Login
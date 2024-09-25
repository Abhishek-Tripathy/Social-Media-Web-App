import React from 'react'
import {toast} from 'react-toastify'
import axios from 'axios'
import { addUser } from '../Redux_Component/Features/userSlice.mjs'

function Signup() {

  const formElements = [{type: 'text', placeholder: 'First Name', name: 'firstName', label: 'First Name' },
    {type: 'text', placeholder: 'Last Name', name: 'lastName', label: 'Last Name' },
    {type: 'text', placeholder: 'Gender', name: 'gender', label: 'Gender' },
    {type: 'email', placeholder: 'Email', name: 'email', label: 'Email' },
    {type: 'number', placeholder: 'MobileNo', name: 'mobileNo', label: 'MobileNo' },
    {type: 'text', placeholder: 'Username', name: 'username', label: 'Username' },
    {type: 'password', placeholder: 'Password', name: 'password', label: 'Password'},
    {type: 'password', placeholder: 'Confirm Password', name: 'confPassword', label: 'Confirm Password'}
 ]

 function handleSubmit (e) {
  e.preventDefault()

  const formData = new FormData(e.target)
  const obj = Object.fromEntries(formData.entries())
  // console.log(obj);
  
  if(obj.password !== obj.confPassword) return toast("Passwords does not matched")
  
  axios.post('http://localhost:8000/api/v1/signup', obj)
  .then(
    (res) => {
      const {status, message} = res.data
      
      if(!status) return toast(message)

      addUser(message)
    } 
  )
  .catch(
    (error) => {
     if(error.response.status === 400) return toast(error.response.data.message)

     toast("Network Connection Error")
    }
  )
}

  return (
    <div className='border border-red-300'>
      <form onSubmit={handleSubmit}>
         {formElements.map(({type, placeholder, label, name}) => (
            <div key={name}>
               <label htmlFor={name}>{label}</label>
               <input type={type} name={name} placeholder={placeholder} id={name} />
            </div>
         ) )}
         <button>Create</button>
      </form>
    </div>
  )
}

export default Signup
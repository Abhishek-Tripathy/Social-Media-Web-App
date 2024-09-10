import axios from 'axios'
import { useState } from 'react'
import signOut from '../../server/controllers/SignOut/signOut.mjs'

function App() {
  const [login, setLogin] = useState({emailOrUsername: "", password: ""})

  function handleChange(e) {
    const {name, value} = e.target
    setLogin({...login, [name]: value})
  }
  function handleSubmit(e) {
    e.preventDefault()
    axios.post('http://localhost:8000/api/v1/signin', login)
    .then(
      (res) => {
        const {status, message} = res.data
        console.log(message);
      } 
    )
    .catch(
      (error) => {console.error(error)}
    )
  }
  function handleSignout () {
    axios.get('http://localhost:8000/api/v1/signout')
  } 
  return (
    
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} name='emailOrUsername' placeholder='Email' /><br /><br />
        <input type="password" onChange={handleChange} name='password' placeholder='password' className=''/>
        <button type='submit' className='border text-white' >Signin</button>
        
      </form>
      <button className='border text-white' onClick={handleSignout}>Signout</button>
      <br /><br /><br /><br /><br />

      
    </>
  )
}

export default App

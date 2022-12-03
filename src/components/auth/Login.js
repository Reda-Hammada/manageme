import axios from 'axios'
import React from 'react'
import { useState,useRef } from 'react'
const Login = () => {

  const form = useRef(null)

  const [token, setToken] = useState(null)
  const [user,SetUser] = useState({})

  const handleLogin = async (e) => {
    e.preventDefault();

        const loggedUser =  new FormData(form.current);
          

    axios({
      method:'POST',
      url:"http://127.0.0.1:8000/api/Login",
      data:loggedUser,
    })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })

  } 

  return (

    <div>
        <h1>Login page</h1>
        <form  ref={form} method='POST'>
          <div>
            <input type='email'
                   name='email'
                   required />
            <input type='password' 
                   name='password'
                   required />
            
            <input type='submit'
                   value='Log in'
                   onClick={
                    handleLogin
                   }
                   />
          </div>
        </form>
    </div>

  )
}

export default Login
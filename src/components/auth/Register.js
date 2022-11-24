import React from 'react'
import { useState,useRef,useEffect} from 'react';
import axios from 'axios';


function Register() 
{
    const form = useRef(null)
    const [error,setError] = useState('error')

    // handle submit 
    const registerHandler = (e) => {        
        e.preventDefault();

        const data = new FormData(form.current);
   
            
            axios({
                method: "post",
                url:"http://localhost:8000/api/register",
                data:data,

            }).then(res=>{
                console.log(res.data)
            }).catch(err=>{
                    console.log(error)
            })
      
           
    }

  return (
    <div>
        <form ref={form} encType="multipart/form-data">
            <div>
                <input type='file'
                       name='user_image'
                      
                    
                />
            </div>
            <div>
                <input type='text'
                       name='name'
                      
                     />
        
            </div>
            <div>
                <input type='email'
                        name='email'
                        
                        />    
            </div>
            <div>
                <input  type='password'
                        name='password' 
                       

                
                        />
            </div>
            <div>
                <input  type='password'
                        name='password_confirmation' 
                       

                
                        />
            </div>
            <div>
                <input type='submit'
                       value='Sign up'
                       onClick={registerHandler}

                    />
            </div>
            <p>{error}</p>
        </form>
    </div>
  )
}

export default Register
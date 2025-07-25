import React, { useState } from 'react'
import Header from './Header'

const Login = () => {

  const [isSignInForm, setIsSignInForm] = useState(true)
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);

  }

  return (
    <div>
      <Header />
      <div>
        <div className='absolute'>
          <img src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="Logo" />
        </div>
        <form className='w-1/4 absolute p-12 bg-black my-36 mx-auto left-0 right-0 text-white rounded-lg bg-opacity-80'>
          <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
          {!isSignInForm && <input type="text" placeholder='Full Name' className='p-4 my-4 w-full bg-gray-700' />
          }
          <input type="text" placeholder='Email Address' className='p-4 my-4 w-full bg-gray-700 ' />


          <input type="password" placeholder='Password' className='p-4 my-4 w-full bg-gray-700' />
          <button className='p-2 my-2 bg-red-700 w-full rounded-lg' type='button'  >{isSignInForm ? "Sign In" : "Sign Up"}</button>

          <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>
            {isSignInForm ? "New to Netflix? Sign up Now." : "Alerady a user? Sign in Now."}

          </p>
        </form>
      </div>
    </div>
  )
}

export default Login

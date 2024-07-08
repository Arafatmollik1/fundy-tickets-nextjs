'use client'
import Image from 'next/image'

import logo from '@/public/main-logo.png'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'

const LoginPage = () => {
  const { handleGoogleLogin, showLoginError, setShowLoginError } = useAuth()


  // Handle Google auth
  const handleGoogleSignin = () => {
    setShowLoginError(false);
    handleGoogleLogin();
  }

  // Handle email auth
  const handleSignUpWithEmail = (e) => {
    e.preventDefault()
    setShowLoginError(false);
  }

  return (
    <div className='mx-auto flex min-h-screen max-w-[360px] flex-col items-center justify-center px-[40px]'>
      <div className='text-end'>
        <div className='mb-2 flex items-end gap-1.5'>
          <Image src={logo} alt='logo' height={80} />
          <h1 className='josefin-sans text-[33.47px] font-bold leading-9 text-[#364C6F]'>
            Fundy
          </h1>
        </div>

        <p className='pr-3 text-[13.47px] font-medium text-[#364C6F]'>
          Get set Funded!
        </p>
      </div>

      <div className='mt-[90px] flex w-full flex-col items-center'>

        <div className='w-full relative'>

          <h1

            className={`w-full rounded-[4px] p-1 text-sm font-medium text-center text-red-700 absolute -top-8 capitalize ${showLoginError ? 'block' : 'hidden'}`}>
            Failed to log in !
          </h1>

          <button
            className='w-full rounded-[5px] border border-[#97BFD7] p-3 text-sm font-medium text-[#364C6F] transition-all hover:shadow-sm hover:shadow-[#97bed781]'
            onClick={handleGoogleLogin}>
            Login with Google
          </button>
        </div>

        <div className='my-[44.5px] w-full border-t border-[#D1D1D1]' />

        <form className='flex w-full flex-col gap-[22px]'>
          <input
            type='text'
            name='name'
            id='name'
            className='rounded-[5px] border border-[#97BFD7] bg-transparent p-3 text-sm outline-none placeholder:text-sm placeholder:font-medium placeholder:text-[#364C6F]'
            placeholder='Your name'
          />

          <input
            type='email'
            name='email'
            id='email'
            className='rounded-[5px] border border-[#97BFD7] bg-transparent p-3 text-sm outline-none placeholder:text-sm placeholder:font-medium placeholder:text-[#364C6F]'
            placeholder='Your email address'
          />

          <button
            className='mx-auto -mt-0.5 w-fit rounded-[5px] border border-[#97BFD7] bg-[#364C6F] px-[23px] py-2 text-sm font-medium tracking-wide text-white transition-all duration-200 hover:shadow-sm hover:shadow-[#97bed767] active:scale-95'
            onClick={handleSignUpWithEmail}
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage

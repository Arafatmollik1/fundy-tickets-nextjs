'use client'

const LoginPage = () => {
  const handleLoginWithGoogle = () => {
    console.log('Login with Google button clicked!')
  }

  return (
    <div className='min-h-screen bg-white'>
      <h1 className='text-blue-900'>Login Page</h1>
      <a className='text-blue-900' href='#' onClick={handleLoginWithGoogle}>
        Login with Google
      </a>
    </div>
  )
}

export default LoginPage

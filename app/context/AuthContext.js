'use client'

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup
} from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../utils/firebaseConfig'
import { useRouter } from 'next/navigation'

const AuthContext = createContext()

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const router = useRouter()
  const [showLoginError, setShowLoginError] = useState(false);


  // Google Auth
  const provider = new GoogleAuthProvider()
  const handleGoogleLogin = async () => {

    try {
      router.push('/login-validation');
      const result = await signInWithPopup(auth, provider)

      //Id token validation
      const idToken = await result.user.getIdToken()
      const response = await fetch(`/api/login-validation/${result?.user?.uid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idToken })
      })

      if (response.ok) {

        setShowLoginError(false);
        router.push('/home')

      } else {

        setShowLoginError(true);
        router.push('/login');

        const data = await response.json();
        if (data.error) {
          console.error(error.message);
        }

      }



    } catch (error) {

      setShowLoginError(true);

      console.error(error);
      router.push('/login')
    }
  }

  // Auth Event Listener
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser)

      } else {
        setUser(null)
      }
    })
  }, [])

  const contextData = { handleGoogleLogin, user, showLoginError, setShowLoginError }

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}

export default ContextProvider

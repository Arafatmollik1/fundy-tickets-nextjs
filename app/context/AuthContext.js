'use client'

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup
} from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../utils/firebaseConfig'
import { useParams, usePathname, useRouter } from 'next/navigation'

const AuthContext = createContext()

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const router = useRouter()
  const pathname = usePathname()

  // Google Auth
  const provider = new GoogleAuthProvider()
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      router.push('/login-validation')
    } catch (error) {
      console.error('Error during login: ', error)
    }
  }

  // Auth Event Listener
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser)

        //Token validation
        // const idToken = await currentUser.getIdToken();
        // const response = await fetch('/api/login-validation', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ idToken }),
        // });

        // console.log(currentUser, idToken);
      } else {
        setUser(null)
      }
    })
  }, [])

  const contextData = { handleGoogleLogin, user }

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}

export default ContextProvider

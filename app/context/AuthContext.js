'use client'

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut
} from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { doc, getDoc, setDoc } from '@firebase/firestore'
import db from '../utils/firestore'
import { auth } from '../utils/firebaseConfig'

const AuthContext = createContext()

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const router = useRouter()
  const [showLoginError, setShowLoginError] = useState(false)

  // Storing User data in Firestore
  const storeUserData = async (AuthUser) => {
    const userRef = doc(db, 'users', AuthUser.uid)

    const createdAtUnix = new Date(Number(AuthUser?.reloadUserInfo?.createdAt))
    const createdAt = createdAtUnix.toUTCString()

    try {
      const docSnap = await getDoc(userRef)

      if (!docSnap.exists()) {
        await setDoc(userRef, {
          createdAt,
          userId: AuthUser.uid,
          name: AuthUser.displayName,
          email: AuthUser.email,
          photo: AuthUser.photoURL
        })
      }
    } catch (error) {
      signOut(auth)

      setShowLoginError(true)
      router.push('/login')

      console.error(error)
    }
  }

  // Google Auth
  const provider = new GoogleAuthProvider()
  const handleGoogleLogin = async () => {
    try {
      router.push('/login-validation')
      const result = await signInWithPopup(auth, provider)

      //Id token validation
      const idToken = await result.user.getIdToken()
      const response = await fetch(
        `/api/login-validation/${result?.user?.uid}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ idToken })
        }
      )

      if (response.ok) {
        await storeUserData(result.user)

        setShowLoginError(false)
        router.push('/home')

        console.log('User Has Logged In')
      } else {
        signOut(auth)

        setShowLoginError(true)
        router.push('/login')

        const data = await response.json()
        if (data.error) {
          console.error(error.message)
        }
      }
    } catch (error) {
      signOut(auth)

      setShowLoginError(true)

      console.error(error)
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

  const contextData = {
    handleGoogleLogin,
    user,
    showLoginError,
    setShowLoginError
  }

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}

export default ContextProvider

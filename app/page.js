'use client'
import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import db from '@/app/utils/firestore'

export default function Home() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'Posts'))
        console.log('snapshot: ', snapshot)
        const docs = snapshot.docs.map((doc) => doc.data())
        setData(docs)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching Firestore data: ', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h1 className='text-4xl font-bold'>Next.js + Firebase Starter</h1>
      <div>
        <h1>Firestore testing:</h1>
        <pre>{loading ? 'loading..' : JSON.stringify(data, null, 2)}</pre>
      </div>
    </main>
  )
}

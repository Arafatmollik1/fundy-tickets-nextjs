import admin from 'firebase-admin'
import { getApps } from 'firebase-admin/app'

import credentials from '@/credentials.json'

if (getApps().length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(credentials)
  })
}

export default admin

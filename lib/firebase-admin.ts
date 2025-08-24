import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { getAuth } from 'firebase-admin/auth'

let adminDb: any = null
let adminAuth: any = null

// Verificar si ya hay apps inicializadas
if (!getApps().length) {
  try {
    // Obtener credenciales del service account
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
    
    if (serviceAccount) {
      // Parsear el JSON del service account
      const serviceAccountJson = JSON.parse(serviceAccount)
      
      // Inicializar Firebase Admin
      initializeApp({
        credential: cert(serviceAccountJson),
        databaseURL: `https://${serviceAccountJson.project_id}.firebaseio.com`
      })
      
      // Inicializar instancias
      adminDb = getFirestore()
      adminAuth = getAuth()
    }
  } catch (error) {
    console.error('Error inicializando Firebase Admin:', error)
    // En desarrollo, podemos continuar sin Firebase Admin
    if (process.env.NODE_ENV === 'production') {
      throw error
    }
  }
}

// Exportar instancias con fallback
export { adminDb, adminAuth }

export default getApps()[0] || null

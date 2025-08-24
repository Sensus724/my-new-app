import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  Timestamp 
} from 'firebase/firestore'
import { db } from './firebase'

// Tipos para los tests
export interface StressTest {
  id?: string
  userId: string
  score: number
  answers: Record<string, string>
  level: string
  createdAt: Date
}

export interface DepressionTest {
  id?: string
  userId: string
  score: number
  answers: Record<string, string>
  level: string
  createdAt: Date
}

export interface HamiltonTest {
  id?: string
  userId: string
  score: number
  answers: Record<string, string>
  result: string
  createdAt: Date
}

// Servicios para Stress Test
export const saveStressTest = async (testData: Omit<StressTest, 'id' | 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'stressTests'), {
      ...testData,
      createdAt: Timestamp.now()
    })
    return { id: docRef.id, success: true }
  } catch (error) {
    console.error('Error saving stress test:', error)
    throw error
  }
}

export const getStressTestsByUser = async (userId: string) => {
  try {
    const q = query(
      collection(db, 'stressTests'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate()
    }))
  } catch (error) {
    console.error('Error getting stress tests:', error)
    throw error
  }
}

// Servicios para Depression Test
export const saveDepressionTest = async (testData: Omit<DepressionTest, 'id' | 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'depressionTests'), {
      ...testData,
      createdAt: Timestamp.now()
    })
    return { id: docRef.id, success: true }
  } catch (error) {
    console.error('Error saving depression test:', error)
    throw error
  }
}

export const getDepressionTestsByUser = async (userId: string) => {
  try {
    const q = query(
      collection(db, 'depressionTests'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate()
    }))
  } catch (error) {
    console.error('Error getting depression tests:', error)
    throw error
  }
}

// Servicios para Hamilton Test
export const saveHamiltonTest = async (testData: Omit<HamiltonTest, 'id' | 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'hamiltonTests'), {
      ...testData,
      createdAt: Timestamp.now()
    })
    return { id: docRef.id, success: true }
  } catch (error) {
    console.error('Error saving hamilton test:', error)
    throw error
  }
}

export const getHamiltonTestsByUser = async (userId: string) => {
  try {
    const q = query(
      collection(db, 'hamiltonTests'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate()
    }))
  } catch (error) {
    console.error('Error getting hamilton tests:', error)
    throw error
  }
}

// Servicios para usuarios
export const createUser = async (userData: {
  id: string
  email: string
  name?: string
  role?: string
}) => {
  try {
    const docRef = await addDoc(collection(db, 'users'), {
      ...userData,
      createdAt: Timestamp.now()
    })
    return { id: docRef.id, success: true }
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}

export const getUserById = async (userId: string) => {
  try {
    const q = query(
      collection(db, 'users'),
      where('id', '==', userId)
    )
    const querySnapshot = await getDocs(q)
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0]
      return {
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()
      }
    }
    return null
  } catch (error) {
    console.error('Error getting user:', error)
    throw error
  }
}

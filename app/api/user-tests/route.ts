import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

export async function GET() {
  try {
    const session = await getServerSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    if (!adminDb) {
      return NextResponse.json({ error: 'Base de datos no disponible' }, { status: 503 })
    }

    const userId = session.user.id

    // Obtener todos los tests del usuario
    const [stressTests, depressionTests, hamiltonTests] = await Promise.all([
      adminDb.collection('stressTests')
        .where('userId', '==', userId)
        .orderBy('createdAt', 'desc')
        .limit(10)
        .get(),
      adminDb.collection('depressionTests')
        .where('userId', '==', userId)
        .orderBy('createdAt', 'desc')
        .limit(10)
        .get(),
      adminDb.collection('hamiltonTests')
        .where('userId', '==', userId)
        .orderBy('createdAt', 'desc')
        .limit(10)
        .get()
    ])

    const tests = {
      stressTests: stressTests.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt
      })),
      depressionTests: depressionTests.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt
      })),
      hamiltonTests: hamiltonTests.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt
      }))
    }

    return NextResponse.json(tests)
  } catch (error) {
    console.error('Error getting user tests:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}

import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

export async function POST(request: Request) {
  try {
    const session = await getServerSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    if (!adminDb) {
      return NextResponse.json({ error: 'Base de datos no disponible' }, { status: 503 })
    }

    const { score, answers, level } = await request.json()
    if (typeof score !== 'number' || !answers || !level) {
      return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 })
    }

    // Usar Firebase Admin para guardar en el servidor
    const docRef = await adminDb.collection('depressionTests').add({
      userId: session.user.id,
      score,
      answers,
      level,
      createdAt: new Date()
    })

    return NextResponse.json({ id: docRef.id }, { status: 201 })
  } catch (error) {
    console.error('Error saving depression test:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}



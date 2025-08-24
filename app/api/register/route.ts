import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { analytics } from '@/lib/analytics'
import { notifications } from '@/lib/notifications'

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    // Validaciones
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'La contraseña debe tener al menos 6 caracteres' },
        { status: 400 }
      )
    }

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'El email ya está registrado' },
        { status: 400 }
      )
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 12)

    // Crear usuario
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    })

    // Enviar analytics y notificaciones
    try {
      await analytics.trackUserRegister(user.id, { email: user.email, name: user.name })
      await notifications.sendWelcomeNotification(user.id, user.name || 'Usuario')
    } catch (error) {
      console.error('Error sending analytics/notifications:', error)
    }

    return NextResponse.json(
      { 
        message: 'Usuario registrado exitosamente',
        user 
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Error en registro:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

#!/bin/bash

echo "🚀 Configurando Sensus - Aplicación Web para el Manejo de Ansiedad"
echo "================================================================"

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Por favor instala Node.js 18+ primero."
    exit 1
fi

# Verificar versión de Node.js
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js versión 18+ es requerida. Versión actual: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detectado"

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

# Verificar si existe .env.local
if [ ! -f .env.local ]; then
    echo "🔧 Creando archivo de variables de entorno..."
    cp env.example .env.local
    echo "⚠️  IMPORTANTE: Edita el archivo .env.local con tus credenciales de base de datos"
    echo "   - DATABASE_URL: URL de tu base de datos PostgreSQL"
    echo "   - NEXTAUTH_SECRET: Genera un secreto seguro (mínimo 32 caracteres)"
    echo "   - NEXTAUTH_URL: URL de tu aplicación (http://localhost:3000 para desarrollo)"
else
    echo "✅ Archivo .env.local ya existe"
fi

# Generar cliente de Prisma
echo "🗄️  Generando cliente de Prisma..."
npx prisma generate

echo ""
echo "🎉 ¡Configuración completada!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Edita el archivo .env.local con tus credenciales"
echo "2. Configura tu base de datos PostgreSQL"
echo "3. Ejecuta: npx prisma db push"
echo "4. Ejecuta: npm run dev"
echo ""
echo "🌐 La aplicación estará disponible en: http://localhost:3000"
echo ""
echo "📚 Para más información, consulta el README.md"

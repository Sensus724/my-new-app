# Sensus - Plataforma de Bienestar Mental

Una aplicación web moderna para el manejo de la ansiedad y el bienestar mental, construida con Next.js 14, TypeScript, Tailwind CSS e integrada con Google Cloud Platform.

## 🚀 Características

- **Test de Hamilton**: Evaluación profesional del nivel de ansiedad
- **Dashboard Personalizado**: Seguimiento del progreso y estadísticas
- **Autenticación Segura**: Sistema de login y registro con NextAuth.js
- **Base de Datos PostgreSQL**: Almacenamiento robusto con Prisma ORM
- **Google Cloud Integration**: Analytics, Storage y Notificaciones
- **Diseño Responsivo**: Interfaz moderna y accesible
- **Notificaciones Inteligentes**: Sistema de alertas y recordatorios
- **Analytics Avanzados**: Seguimiento de uso y progreso

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Next.js 14**: Framework React con App Router
- **React 18**: Biblioteca de UI
- **TypeScript**: Tipado estático
- **Tailwind CSS**: Framework de estilos
- **Framer Motion**: Animaciones

### Backend
- **NextAuth.js**: Autenticación
- **Prisma ORM**: Base de datos
- **PostgreSQL**: Base de datos principal

### Google Cloud Platform
- **Cloud Storage**: Almacenamiento de archivos
- **BigQuery**: Analytics y reportes
- **Pub/Sub**: Notificaciones en tiempo real
- **Cloud Scheduler**: Notificaciones programadas

### Herramientas
- **ESLint**: Linting de código
- **Prettier**: Formateo de código
- **React Hook Form**: Manejo de formularios
- **React Hot Toast**: Notificaciones UI

## 📦 Instalación

### 1. Clonar el repositorio
```bash
git clone <repository-url>
cd sensus-web-app
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
```bash
cp env.development .env.local
```

Edita `.env.local` con tus credenciales:
```env
# Base de datos PostgreSQL
DATABASE_URL="postgresql://username:password@localhost:5432/sensus_db"

# NextAuth.js
NEXTAUTH_SECRET="tu-secreto-super-seguro-aqui-minimo-32-caracteres"
NEXTAUTH_URL="http://localhost:3000"

# Google Cloud Platform (opcional)
GOOGLE_CLOUD_PROJECT_ID="sensus-app"
GOOGLE_CLOUD_KEY_FILE="path/to/your/service-account-key.json"
GOOGLE_CLOUD_STORAGE_BUCKET="sensus-app-storage"
GOOGLE_CLOUD_BIGQUERY_DATASET="sensus_analytics"
GOOGLE_CLOUD_PUBSUB_TOPIC="sensus-notifications"
```

### 4. Configurar la base de datos
```bash
npx prisma generate
npx prisma db push
```

### 5. Ejecutar en desarrollo
```bash
npm run dev
```

## 🏗️ Estructura del Proyecto

```
sensus-web-app/
├── app/                    # App Router de Next.js
│   ├── api/               # API Routes
│   │   ├── auth/          # Autenticación NextAuth
│   │   └── register/      # Registro de usuarios
│   ├── dashboard/         # Páginas del dashboard
│   ├── globals.css        # Estilos globales
│   └── layout.tsx         # Layout principal
├── components/            # Componentes React
│   ├── dashboard/         # Componentes del dashboard
│   └── providers/         # Providers de contexto
├── lib/                   # Utilidades y configuración
│   ├── prisma.ts          # Cliente Prisma singleton
│   ├── google-cloud.ts    # Configuración Google Cloud
│   ├── analytics.ts       # Servicio de analytics
│   └── notifications.ts   # Servicio de notificaciones
├── prisma/                # Schema de base de datos
├── public/                # Archivos estáticos
├── types/                 # Definiciones de tipos
└── docs/                  # Documentación
```

## 🔧 Funcionalidades Principales

### 1. Test de Hamilton
- ✅ Evaluación profesional del nivel de ansiedad
- ✅ Resultados inmediatos con interpretación
- ✅ Historial de evaluaciones
- ✅ Recomendaciones personalizadas

### 2. Dashboard Personalizado
- ✅ Estadísticas de progreso
- ✅ Gráficos de evolución
- ✅ Actividades recientes
- ✅ Objetivos y metas
- ✅ Seguimiento de estado de ánimo

### 3. Sistema de Autenticación
- ✅ Registro seguro de usuarios
- ✅ Login con email y contraseña
- ✅ Protección de rutas
- ✅ Sesiones persistentes

### 4. Base de Datos Robusta
- ✅ Esquema completo con Prisma
- ✅ Relaciones entre entidades
- ✅ Migraciones automáticas
- ✅ Tipos TypeScript generados

### 5. Google Cloud Integration
- ✅ **Analytics**: Seguimiento de eventos y métricas
- ✅ **Storage**: Almacenamiento de archivos
- ✅ **Pub/Sub**: Notificaciones en tiempo real
- ✅ **BigQuery**: Reportes y análisis avanzados

## 📊 Analytics y Métricas

### Eventos Rastreados
- Registro de usuarios
- Inicios de sesión
- Completación de tests
- Actividades realizadas
- Estados de ánimo registrados
- Objetivos creados/completados
- Acceso a recursos

### Reportes Disponibles
- Estadísticas de usuario
- Métricas de la aplicación
- Análisis de progreso
- Uso de funcionalidades

## 🔔 Sistema de Notificaciones

### Tipos de Notificaciones
- **Bienvenida**: Para nuevos usuarios
- **Recordatorios**: Tests y actividades
- **Progreso**: Actualizaciones de mejora
- **Logros**: Objetivos completados
- **Resúmenes**: Reportes semanales
- **Seguridad**: Alertas de seguridad

### Canales de Entrega
- Notificaciones en la aplicación
- Email (configurable)
- Push notifications (futuro)

## 🚀 Deployment

### Vercel (Recomendado)
1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno
3. Deploy automático en cada push

### Otros Proveedores
- **Netlify**: Configura build command y publish directory
- **Railway**: Soporte nativo para PostgreSQL
- **Heroku**: Configura add-ons para base de datos

## 🔒 Seguridad

### Mejores Prácticas Implementadas
- ✅ Autenticación segura con NextAuth.js
- ✅ Contraseñas hasheadas con bcrypt
- ✅ Variables de entorno para credenciales
- ✅ Validación de datos con TypeScript
- ✅ Protección CSRF
- ✅ Headers de seguridad

### Google Cloud Security
- Service accounts con permisos mínimos
- Claves rotadas regularmente
- Logs de auditoría
- Monitoreo de acceso

## 📈 Monitoreo y Logs

### Google Cloud Logging
- Logs de aplicación
- Logs de errores
- Métricas de rendimiento
- Alertas automáticas

### Cloud Monitoring
- Uso de recursos
- Latencia de respuesta
- Errores de API
- Métricas de usuario

## 💰 Costos Estimados

### Google Cloud Platform
- **Storage**: ~$5-20/mes
- **BigQuery**: ~$10-50/mes
- **Pub/Sub**: ~$5-15/mes
- **Total**: ~$20-85/mes

### Otros Servicios
- **Vercel**: Gratis para proyectos pequeños
- **PostgreSQL**: ~$5-25/mes (dependiendo del proveedor)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Para soporte técnico o preguntas:
- **Email**: sensusdes@gmail.com
- **Instagram**: @sensus_des
- **Documentación**: Ver carpeta `docs/`

## 🗺️ Roadmap

### Próximas Funcionalidades
- [ ] Integración con Google Calendar
- [ ] Notificaciones push nativas
- [ ] Modo offline con PWA
- [ ] Exportación de datos (PDF/Excel)
- [ ] API pública para desarrolladores
- [ ] Aplicación móvil (React Native)
- [ ] Chat en vivo con terapeutas
- [ ] Integración con wearables
- [ ] Machine Learning para recomendaciones
- [ ] Múltiples idiomas

### Mejoras Técnicas
- [ ] Tests automatizados
- [ ] CI/CD pipeline
- [ ] Docker containerization
- [ ] Microservicios
- [ ] GraphQL API
- [ ] Real-time collaboration

## 📚 Documentación Adicional

- [Configuración de Google Cloud](./docs/google-cloud-setup.md)
- [Guía de Deployment](./docs/deployment-guide.md)
- [API Reference](./docs/api-reference.md)
- [Contributing Guidelines](./docs/contributing.md)

---

**Sensus** - Tu espacio seguro para el manejo de la ansiedad 💜

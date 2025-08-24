# Configuración de Google Cloud Platform para Sensus

## 1. Crear Proyecto en Google Cloud

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto llamado `sensus-app`
3. Habilita la facturación para el proyecto

## 2. Habilitar APIs Necesarias

Habilita las siguientes APIs en tu proyecto:

```bash
# Google Cloud Storage
gcloud services enable storage.googleapis.com

# BigQuery
gcloud services enable bigquery.googleapis.com

# Pub/Sub
gcloud services enable pubsub.googleapis.com

# Cloud Scheduler (opcional, para notificaciones programadas)
gcloud services enable cloudscheduler.googleapis.com
```

## 3. Crear Service Account

1. Ve a "IAM & Admin" > "Service Accounts"
2. Crea una nueva cuenta de servicio llamada `sensus-app-service`
3. Asigna los siguientes roles:
   - Storage Object Admin
   - BigQuery Data Editor
   - Pub/Sub Publisher
   - Pub/Sub Subscriber

4. Crea y descarga la clave JSON

## 4. Configurar Variables de Entorno

Agrega las siguientes variables a tu archivo `.env.local`:

```env
# Google Cloud Platform
GOOGLE_CLOUD_PROJECT_ID="sensus-app"
GOOGLE_CLOUD_KEY_FILE="path/to/your/service-account-key.json"

# Google Cloud Storage
GOOGLE_CLOUD_STORAGE_BUCKET="sensus-app-storage"

# Google Cloud BigQuery
GOOGLE_CLOUD_BIGQUERY_DATASET="sensus_analytics"

# Google Cloud Pub/Sub
GOOGLE_CLOUD_PUBSUB_TOPIC="sensus-notifications"
```

## 5. Crear Bucket de Storage

```bash
# Crear bucket para almacenar archivos
gsutil mb gs://sensus-app-storage

# Configurar permisos públicos (opcional)
gsutil iam ch allUsers:objectViewer gs://sensus-app-storage
```

## 6. Configurar BigQuery

```bash
# Crear dataset para analytics
bq mk --dataset sensus_app:sensus_analytics

# Crear tabla para eventos
bq mk --table sensus_app:sensus_analytics.events \
  event_type:STRING,user_id:STRING,session_id:STRING,timestamp:TIMESTAMP,properties:STRING,user_agent:STRING,ip_address:STRING
```

## 7. Configurar Pub/Sub

```bash
# Crear topic para notificaciones
gcloud pubsub topics create sensus-notifications

# Crear subscription (opcional, para procesar notificaciones)
gcloud pubsub subscriptions create sensus-notifications-sub \
  --topic=sensus-notifications
```

## 8. Configurar Cloud Scheduler (Opcional)

Para notificaciones programadas:

```bash
# Crear job para recordatorios semanales
gcloud scheduler jobs create pubsub weekly-reminders \
  --schedule="0 9 * * 1" \
  --topic=sensus-notifications \
  --message-body='{"type":"weekly_reminder"}'
```

## 9. Verificar Configuración

Ejecuta el siguiente comando para verificar que todo esté configurado correctamente:

```bash
# Verificar que las APIs estén habilitadas
gcloud services list --enabled --filter="name:storage.googleapis.com OR name:bigquery.googleapis.com OR name:pubsub.googleapis.com"

# Verificar permisos del service account
gcloud projects get-iam-policy sensus-app --flatten="bindings[].members" --filter="bindings.members:sensus-app-service"
```

## 10. Funciones Disponibles

### Google Cloud Storage
- `uploadFile()`: Subir archivos al bucket
- `deleteFile()`: Eliminar archivos del bucket

### BigQuery Analytics
- `trackUserRegister()`: Registrar registro de usuario
- `trackUserLogin()`: Registrar inicio de sesión
- `trackTestCompleted()`: Registrar completación de test
- `trackActivityCompleted()`: Registrar actividad completada
- `trackMoodRecorded()`: Registrar estado de ánimo
- `trackGoalCreated()`: Registrar creación de objetivo
- `trackGoalCompleted()`: Registrar objetivo completado
- `trackResourceAccessed()`: Registrar acceso a recursos

### Pub/Sub Notifications
- `sendWelcomeNotification()`: Notificación de bienvenida
- `sendTestReminder()`: Recordatorio de test
- `sendActivityReminder()`: Recordatorio de actividad
- `sendGoalReminder()`: Recordatorio de objetivo
- `sendProgressUpdate()`: Actualización de progreso
- `sendAchievementNotification()`: Notificación de logro
- `sendWeeklySummary()`: Resumen semanal
- `sendSecurityAlert()`: Alerta de seguridad

## 11. Monitoreo y Logs

### Cloud Logging
Los logs se pueden ver en Google Cloud Console > Logging

### Cloud Monitoring
Configura alertas para:
- Errores de API
- Uso de recursos
- Latencia de respuesta

## 12. Costos Estimados

Para una aplicación pequeña-mediana:
- Storage: ~$5-20/mes
- BigQuery: ~$10-50/mes
- Pub/Sub: ~$5-15/mes
- Total estimado: ~$20-85/mes

## 13. Seguridad

### Mejores Prácticas
1. Usa variables de entorno para credenciales
2. Limita permisos del service account
3. Rota las claves regularmente
4. Monitorea el uso de recursos
5. Configura alertas de seguridad

### Configuración de CORS (si es necesario)
```bash
# Configurar CORS para el bucket
gsutil cors set cors.json gs://sensus-app-storage
```

Donde `cors.json` contiene:
```json
[
  {
    "origin": ["https://tu-dominio.com"],
    "method": ["GET", "POST", "PUT", "DELETE"],
    "responseHeader": ["Content-Type"],
    "maxAgeSeconds": 3600
  }
]
```


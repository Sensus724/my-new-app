import { publishMessage } from './google-cloud'

// Tipos de notificaciones
export enum NotificationType {
  WELCOME = 'welcome',
  TEST_REMINDER = 'test_reminder',
  ACTIVITY_REMINDER = 'activity_reminder',
  GOAL_REMINDER = 'goal_reminder',
  PROGRESS_UPDATE = 'progress_update',
  ACHIEVEMENT = 'achievement',
  WEEKLY_SUMMARY = 'weekly_summary',
  SECURITY_ALERT = 'security_alert'
}

// Interfaz para notificaciones
export interface NotificationData {
  type: NotificationType
  userId: string
  title: string
  message: string
  priority: 'low' | 'medium' | 'high'
  data?: Record<string, any>
  scheduledAt?: Date
}

// Servicio de Notificaciones
export class NotificationService {
  private static instance: NotificationService
  private topicName = process.env.GOOGLE_CLOUD_PUBSUB_TOPIC || 'sensus-notifications'

  private constructor() {}

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService()
    }
    return NotificationService.instance
  }

  // Enviar notificación de bienvenida
  async sendWelcomeNotification(userId: string, userName: string) {
    const notification: NotificationData = {
      type: NotificationType.WELCOME,
      userId,
      title: '¡Bienvenido a Sensus!',
      message: `Hola ${userName}, nos alegra que hayas decidido comenzar tu viaje hacia el bienestar mental con nosotros.`,
      priority: 'medium',
      data: {
        action_url: '/dashboard',
        action_text: 'Ir al Dashboard'
      }
    }

    await this.sendNotification(notification)
  }

  // Enviar recordatorio de test
  async sendTestReminder(userId: string, testType: string) {
    const notification: NotificationData = {
      type: NotificationType.TEST_REMINDER,
      userId,
      title: 'Recordatorio: Evaluación de Ansiedad',
      message: `Es momento de realizar tu evaluación semanal de ansiedad para mantener un seguimiento de tu progreso.`,
      priority: 'medium',
      data: {
        test_type: testType,
        action_url: `/hamilton-test`,
        action_text: 'Realizar Test'
      }
    }

    await this.sendNotification(notification)
  }

  // Enviar recordatorio de actividad
  async sendActivityReminder(userId: string, activityTitle: string) {
    const notification: NotificationData = {
      type: NotificationType.ACTIVITY_REMINDER,
      userId,
      title: 'Recordatorio: Actividad Programada',
      message: `Tienes programada la actividad "${activityTitle}". ¡No olvides dedicar tiempo a tu bienestar!`,
      priority: 'low',
      data: {
        activity_title: activityTitle,
        action_url: '/dashboard/activities',
        action_text: 'Ver Actividades'
      }
    }

    await this.sendNotification(notification)
  }

  // Enviar recordatorio de objetivo
  async sendGoalReminder(userId: string, goalTitle: string, daysLeft: number) {
    const notification: NotificationData = {
      type: NotificationType.GOAL_REMINDER,
      userId,
      title: 'Recordatorio: Objetivo Pendiente',
      message: `Tu objetivo "${goalTitle}" tiene ${daysLeft} días restantes. ¡Sigue trabajando en él!`,
      priority: 'medium',
      data: {
        goal_title: goalTitle,
        days_left: daysLeft,
        action_url: '/dashboard/goals',
        action_text: 'Ver Objetivos'
      }
    }

    await this.sendNotification(notification)
  }

  // Enviar actualización de progreso
  async sendProgressUpdate(userId: string, progressData: any) {
    const notification: NotificationData = {
      type: NotificationType.PROGRESS_UPDATE,
      userId,
      title: 'Actualización de Progreso',
      message: `¡Excelente! Tu nivel de ansiedad ha mejorado un ${progressData.improvement}% desde tu última evaluación.`,
      priority: 'low',
      data: {
        improvement_percentage: progressData.improvement,
        current_score: progressData.currentScore,
        previous_score: progressData.previousScore,
        action_url: '/dashboard/progress',
        action_text: 'Ver Progreso'
      }
    }

    await this.sendNotification(notification)
  }

  // Enviar notificación de logro
  async sendAchievementNotification(userId: string, achievement: any) {
    const notification: NotificationData = {
      type: NotificationType.ACHIEVEMENT,
      userId,
      title: '¡Logro Desbloqueado!',
      message: `Has completado "${achievement.title}". ¡Felicidades por este importante paso en tu bienestar!`,
      priority: 'high',
      data: {
        achievement_title: achievement.title,
        achievement_description: achievement.description,
        achievement_badge: achievement.badge,
        action_url: '/dashboard/achievements',
        action_text: 'Ver Logros'
      }
    }

    await this.sendNotification(notification)
  }

  // Enviar resumen semanal
  async sendWeeklySummary(userId: string, summaryData: any) {
    const notification: NotificationData = {
      type: NotificationType.WEEKLY_SUMMARY,
      userId,
      title: 'Resumen Semanal',
      message: `Esta semana completaste ${summaryData.activitiesCompleted} actividades y tu nivel de ansiedad promedio fue de ${summaryData.averageAnxietyLevel}.`,
      priority: 'low',
      data: {
        activities_completed: summaryData.activitiesCompleted,
        average_anxiety_level: summaryData.averageAnxietyLevel,
        goals_progress: summaryData.goalsProgress,
        action_url: '/dashboard/summary',
        action_text: 'Ver Resumen'
      }
    }

    await this.sendNotification(notification)
  }

  // Enviar alerta de seguridad
  async sendSecurityAlert(userId: string, alertData: any) {
    const notification: NotificationData = {
      type: NotificationType.SECURITY_ALERT,
      userId,
      title: 'Alerta de Seguridad',
      message: `Se detectó un inicio de sesión desde ${alertData.location} en ${alertData.device}. Si no fuiste tú, cambia tu contraseña.`,
      priority: 'high',
      data: {
        location: alertData.location,
        device: alertData.device,
        timestamp: alertData.timestamp,
        action_url: '/settings/security',
        action_text: 'Revisar Seguridad'
      }
    }

    await this.sendNotification(notification)
  }

  // Enviar notificación personalizada
  async sendCustomNotification(userId: string, customData: NotificationData) {
    await this.sendNotification(customData)
  }

  // Enviar notificación a través de Pub/Sub
  private async sendNotification(notification: NotificationData) {
    try {
      const message = {
        ...notification,
        timestamp: new Date().toISOString(),
        id: this.generateNotificationId()
      }

      await publishMessage(this.topicName, message)
      console.log(`Notification sent: ${notification.type} to user ${notification.userId}`)
    } catch (error) {
      console.error('Error sending notification:', error)
      // En producción, podrías usar un servicio de logging como Cloud Logging
    }
  }

  // Generar ID único para notificación
  private generateNotificationId(): string {
    return `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  // Programar notificación para el futuro
  async scheduleNotification(notification: NotificationData, scheduledAt: Date) {
    // En una implementación real, esto podría usar Cloud Scheduler
    // Por ahora, simplemente agregamos la fecha programada
    notification.scheduledAt = scheduledAt
    await this.sendNotification(notification)
  }

  // Cancelar notificación programada
  async cancelScheduledNotification(notificationId: string) {
    // En una implementación real, esto cancelaría la notificación en Cloud Scheduler
    console.log(`Cancelled scheduled notification: ${notificationId}`)
  }
}

// Exportar instancia singleton
export const notifications = NotificationService.getInstance()


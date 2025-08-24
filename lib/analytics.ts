import { insertAnalyticsData } from './google-cloud'

// Tipos de eventos de analytics
export enum AnalyticsEvent {
  USER_REGISTER = 'user_register',
  USER_LOGIN = 'user_login',
  TEST_COMPLETED = 'test_completed',
  ACTIVITY_COMPLETED = 'activity_completed',
  MOOD_RECORDED = 'mood_recorded',
  GOAL_CREATED = 'goal_created',
  GOAL_COMPLETED = 'goal_completed',
  RESOURCE_ACCESSED = 'resource_accessed',
  CONTACT_SUBMITTED = 'contact_submitted'
}

// Interfaz para eventos de analytics
export interface AnalyticsEventData {
  event_type: AnalyticsEvent
  user_id?: string
  session_id?: string
  timestamp: string
  properties: Record<string, any>
  user_agent?: string
  ip_address?: string
}

// Servicio de Analytics
export class AnalyticsService {
  private static instance: AnalyticsService
  private dataset = 'sensus_analytics'
  private table = 'events'

  private constructor() {}

  public static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService()
    }
    return AnalyticsService.instance
  }

  // Registrar evento de registro de usuario
  async trackUserRegister(userId: string, userData: any) {
    const eventData: AnalyticsEventData = {
      event_type: AnalyticsEvent.USER_REGISTER,
      user_id: userId,
      timestamp: new Date().toISOString(),
      properties: {
        email: userData.email,
        name: userData.name,
        registration_method: 'email'
      }
    }

    await this.sendEvent(eventData)
  }

  // Registrar evento de login
  async trackUserLogin(userId: string, loginData: any) {
    const eventData: AnalyticsEventData = {
      event_type: AnalyticsEvent.USER_LOGIN,
      user_id: userId,
      timestamp: new Date().toISOString(),
      properties: {
        login_method: 'email',
        success: true
      }
    }

    await this.sendEvent(eventData)
  }

  // Registrar completación de test
  async trackTestCompleted(userId: string, testData: any) {
    const eventData: AnalyticsEventData = {
      event_type: AnalyticsEvent.TEST_COMPLETED,
      user_id: userId,
      timestamp: new Date().toISOString(),
      properties: {
        test_type: testData.testType,
        score: testData.score,
        level: testData.level,
        duration_seconds: testData.duration
      }
    }

    await this.sendEvent(eventData)
  }

  // Registrar actividad completada
  async trackActivityCompleted(userId: string, activityData: any) {
    const eventData: AnalyticsEventData = {
      event_type: AnalyticsEvent.ACTIVITY_COMPLETED,
      user_id: userId,
      timestamp: new Date().toISOString(),
      properties: {
        activity_type: activityData.type,
        activity_title: activityData.title,
        duration_minutes: activityData.duration
      }
    }

    await this.sendEvent(eventData)
  }

  // Registrar estado de ánimo
  async trackMoodRecorded(userId: string, moodData: any) {
    const eventData: AnalyticsEventData = {
      event_type: AnalyticsEvent.MOOD_RECORDED,
      user_id: userId,
      timestamp: new Date().toISOString(),
      properties: {
        mood: moodData.mood,
        intensity: moodData.intensity,
        activities: moodData.activities
      }
    }

    await this.sendEvent(eventData)
  }

  // Registrar creación de objetivo
  async trackGoalCreated(userId: string, goalData: any) {
    const eventData: AnalyticsEventData = {
      event_type: AnalyticsEvent.GOAL_CREATED,
      user_id: userId,
      timestamp: new Date().toISOString(),
      properties: {
        goal_category: goalData.category,
        goal_title: goalData.title,
        target_date: goalData.targetDate
      }
    }

    await this.sendEvent(eventData)
  }

  // Registrar objetivo completado
  async trackGoalCompleted(userId: string, goalData: any) {
    const eventData: AnalyticsEventData = {
      event_type: AnalyticsEvent.GOAL_COMPLETED,
      user_id: userId,
      timestamp: new Date().toISOString(),
      properties: {
        goal_category: goalData.category,
        goal_title: goalData.title,
        completion_time_days: goalData.completionTime
      }
    }

    await this.sendEvent(eventData)
  }

  // Registrar acceso a recursos
  async trackResourceAccessed(userId: string, resourceData: any) {
    const eventData: AnalyticsEventData = {
      event_type: AnalyticsEvent.RESOURCE_ACCESSED,
      user_id: userId,
      timestamp: new Date().toISOString(),
      properties: {
        resource_type: resourceData.type,
        resource_title: resourceData.title,
        resource_category: resourceData.category
      }
    }

    await this.sendEvent(eventData)
  }

  // Registrar envío de contacto
  async trackContactSubmitted(contactData: any) {
    const eventData: AnalyticsEventData = {
      event_type: AnalyticsEvent.CONTACT_SUBMITTED,
      timestamp: new Date().toISOString(),
      properties: {
        contact_subject: contactData.subject,
        contact_email: contactData.email
      }
    }

    await this.sendEvent(eventData)
  }

  // Enviar evento a BigQuery
  private async sendEvent(eventData: AnalyticsEventData) {
    try {
      await insertAnalyticsData(this.dataset, this.table, [eventData])
    } catch (error) {
      console.error('Error sending analytics event:', error)
      // En producción, podrías usar un servicio de logging como Cloud Logging
    }
  }

  // Obtener estadísticas de usuario
  async getUserStats(userId: string) {
    // Esta función podría consultar BigQuery para obtener estadísticas
    // Por ahora retornamos datos simulados
    return {
      total_tests: 0,
      average_score: 0,
      activities_completed: 0,
      goals_created: 0,
      goals_completed: 0,
      mood_entries: 0
    }
  }

  // Obtener estadísticas generales de la aplicación
  async getAppStats() {
    // Esta función podría consultar BigQuery para obtener estadísticas generales
    return {
      total_users: 0,
      total_tests_completed: 0,
      average_test_score: 0,
      most_common_anxiety_level: 'mild',
      active_users_this_month: 0
    }
  }
}

// Exportar instancia singleton
export const analytics = AnalyticsService.getInstance()


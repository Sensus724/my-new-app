import { Storage } from '@google-cloud/storage'
import { BigQuery } from '@google-cloud/bigquery'
import { PubSub } from '@google-cloud/pubsub'

// Configuración de Google Cloud
const googleCloudConfig = {
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID || 'sensus-app',
  keyFilename: process.env.GOOGLE_CLOUD_KEY_FILE,
  credentials: process.env.GOOGLE_CLOUD_CREDENTIALS ? 
    JSON.parse(process.env.GOOGLE_CLOUD_CREDENTIALS) : undefined
}

// Cliente de Google Cloud Storage
export const storage = new Storage({
  projectId: googleCloudConfig.projectId,
  keyFilename: googleCloudConfig.keyFilename,
  credentials: googleCloudConfig.credentials
})

// Cliente de BigQuery para analytics
export const bigquery = new BigQuery({
  projectId: googleCloudConfig.projectId,
  keyFilename: googleCloudConfig.keyFilename,
  credentials: googleCloudConfig.credentials
})

// Cliente de Pub/Sub para notificaciones
export const pubsub = new PubSub({
  projectId: googleCloudConfig.projectId,
  keyFilename: googleCloudConfig.keyFilename,
  credentials: googleCloudConfig.credentials
})

// Funciones de utilidad para Google Cloud Storage
export const uploadFile = async (
  bucketName: string,
  fileName: string,
  fileBuffer: Buffer,
  contentType: string
) => {
  const bucket = storage.bucket(bucketName)
  const file = bucket.file(fileName)
  
  await file.save(fileBuffer, {
    metadata: {
      contentType
    }
  })
  
  return `https://storage.googleapis.com/${bucketName}/${fileName}`
}

export const deleteFile = async (bucketName: string, fileName: string) => {
  const bucket = storage.bucket(bucketName)
  const file = bucket.file(fileName)
  
  await file.delete()
}

// Funciones para BigQuery Analytics
export const insertAnalyticsData = async (
  dataset: string,
  table: string,
  data: any[]
) => {
  const datasetRef = bigquery.dataset(dataset)
  const tableRef = datasetRef.table(table)
  
  await tableRef.insert(data)
}

// Funciones para Pub/Sub
export const publishMessage = async (
  topicName: string,
  message: any
) => {
  const topic = pubsub.topic(topicName)
  const messageBuffer = Buffer.from(JSON.stringify(message))
  
  const messageId = await topic.publish(messageBuffer)
  return messageId
}

export const subscribeToTopic = async (
  topicName: string,
  subscriptionName: string,
  callback: (message: any) => void
) => {
  const topic = pubsub.topic(topicName)
  const subscription = topic.subscription(subscriptionName)
  
  subscription.on('message', (message) => {
    const data = JSON.parse(message.data.toString())
    callback(data)
    message.ack()
  })
  
  subscription.on('error', (error) => {
    console.error('Subscription error:', error)
  })
}


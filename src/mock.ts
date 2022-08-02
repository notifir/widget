import type { IMockSubscription } from 'mock-apollo-client'
import { createMockClient, createMockSubscription } from 'mock-apollo-client'
import { faker } from '@faker-js/faker'
import { getNotifications, markAllAsRead, markAsRead, notificationChanged } from './queries'
import type { Notification } from './index'

export interface Payload {
  folder?: string
  file?: string
  user?: string
}

const userId = 'beast~mailinator.com@marvel-x-men'
const types = ['folder-created', 'file-copied']
const templates = [
  { type: 'folder-created', locale: 'en-GB', content: (payload: Payload) => `The folder ${payload.folder} was created by ${payload.user}.` },
  { type: 'folder-created', locale: 'nb-NO', content: (payload: Payload) => `Oppføringen ${payload.folder} ble opprettet av ${payload.user}.` },
  { type: 'folder-created', locale: 'sv-SE', content: (payload: Payload) => `Posten ${payload.folder} har skapats av ${payload.user}.` },
  { type: 'file-copied', locale: 'en-GB', content: (payload: Payload) => `File ${payload.file} copied from ${payload.folder} by ${payload.user}.` },
  { type: 'file-copied', locale: 'nb-NO', content: (payload: Payload) => `Filen ${payload.file} ble kopiert fra ${payload.folder} av ${payload.user}.` },
  { type: 'file-copied', locale: 'sv-SE', content: (payload: Payload) => `Filen ${payload.file} kopierades från ${payload.folder} av ${payload.user}.` },
]
let notifications: Notification[] = []

const generateNotifications = (n: number, locale: string) => {
  const notifications: Notification[] = []
  for (let i = 0; i < n; i++) {
    const date = new Date(new Date().getTime() - (n - (n - 1 - i)) * 1.1 * 60000)
    const type = faker.helpers.arrayElement(types)
    const template = templates.find(t => t.locale === locale && t.type === type)
    let payload: Payload = {}
    if (type === 'file-copied')
      payload = { file: faker.system.commonFileName(), folder: faker.random.word(), user: faker.name.findName() }

    if (type === 'folder-created')
      payload = { folder: faker.random.word(), user: faker.name.findName() }

    notifications.push({
      id: faker.datatype.uuid(),
      type,
      userId,
      read: false,
      createdAt: date.toString(),
      updatedAt: date.toString(),
      content: template ? template.content(payload) : '',
      actionUrl: 'https://notifir.github.io/widget',
    })
  }

  return notifications
}

const getAllNotifications = () => Promise.resolve({ data: { allNotifications: { nodes: notifications } } })

const markNotificationAsRead = (mockSubscription: IMockSubscription, id: string) => {
  const notification = notifications.find(n => n.id === id)

  if (notification) {
    notification.read = true
    mockSubscription.next({ data: { notificationsUpdated: { notification, event: 'notification_updated' } } })

    return Promise.resolve({ data: { updateNotificationById: { notification: { id } } } })
  }

  return Promise.resolve({ data: {} })
}

const markAllNotificationsAsRead = (mockSubscription: IMockSubscription) => {
  const unreadNotifications = notifications.filter(n => !n.read)

  unreadNotifications.forEach((notification) => {
    notification.read = true
    mockSubscription.next({ data: { notificationsUpdated: { notification, event: 'notification_updated' } } })
  })

  return Promise.resolve({ data: { markAllNotificationsAsRead: { updated: unreadNotifications.length } } })
}

export const mockClient = (locale: string) => {
  const mockClient = createMockClient()
  const mockSubscription = createMockSubscription()

  mockClient.setRequestHandler(getNotifications, getAllNotifications)
  mockClient.setRequestHandler(notificationChanged, () => mockSubscription)
  mockClient.setRequestHandler(markAsRead, variables => markNotificationAsRead(mockSubscription, variables.id))
  mockClient.setRequestHandler(markAllAsRead, () => markAllNotificationsAsRead(mockSubscription))

  notifications = generateNotifications(6, locale)

  setTimeout(() => {
    const newNotification = generateNotifications(1, locale)[0]
    notifications.unshift(newNotification)
    mockSubscription.next({ data: { notificationsUpdated: { notification: newNotification, event: 'notification_created' } } })
  }, 15000)

  setTimeout(() => {
    const newNotification = generateNotifications(1, locale)[0]
    notifications.unshift(newNotification)
    mockSubscription.next({ data: { notificationsUpdated: { notification: newNotification, event: 'notification_created' } } })
  }, 23000)

  return mockClient
}

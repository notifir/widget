import type { IMockSubscription } from 'mock-apollo-client'
import { createMockClient, createMockSubscription } from 'mock-apollo-client'
import { faker } from '@faker-js/faker'
import { getNotifications, markAllAsRead, markAsRead, notificationChanged } from './queries'
import type { Notification } from './index'

const userId = 'beast~mailinator.com@marvel-x-men'
const types = ['folder-created', 'file-copied']
const templates = [
  { type: 'folder-created', locale: 'en-GB', content: 'The folder {{ folder }} was created by {{ user }}.' },
  { type: 'folder-created', locale: 'nb-NO', content: 'Oppføringen {{ folder }} ble opprettet av {user}.' },
  { type: 'folder-created', locale: 'sv-SE', content: 'Posten {{ folder }} har skapats av {{ user }}.' },
  { type: 'file-copied', locale: 'en-GB', content: 'File {{ file }} copied from {{ folder }} by {{ user }}.' },
  { type: 'file-copied', locale: 'nb-NO', content: 'Filen {{ file }} ble kopiert fra {{ folder }} av {{ user }}.' },
  { type: 'file-copied', locale: 'sv-SE', content: 'Filen {{ file }} kopierades från {{ folder }} av {{ user }}.' },
]
let notifications: Notification[] = []

const generateNotifications = (n: number, locale: string) => {
  const notifications: Notification[] = []
  for (let i = 0; i < n; i++) {
    const date = new Date(new Date().getTime() - (n - (n - 1 - i)) * 1.1 * 60000)
    const type = faker.helpers.arrayElement(types)
    const template = templates.find(t => t.locale === locale && t.type === type)
    let payload = {}
    if (type === 'file-copied')
      payload = { file: faker.system.commonFileName(), folder: faker.random.word(), user: faker.name.findName() }

    if (type === 'folder-created')
      payload = { folder: faker.random.word(), user: faker.name.findName() }

    notifications.push({
      id: faker.datatype.uuid(),
      type,
      payload: JSON.stringify(payload),
      userId,
      read: false,
      createdAt: date.toString(),
      updatedAt: date.toString(),
      template: { content: template ? template.content : '' },
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

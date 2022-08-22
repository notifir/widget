import type { IMockSubscription } from 'mock-apollo-client'
import { createMockClient, createMockSubscription } from 'mock-apollo-client'
import { rand, randBetweenDate, randFileName, randFullName, randJobArea, randUuid } from '@ngneat/falso'
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
  const currentDate = new Date()
  for (let i = 0; i < n; i++) {
    const type = rand(types)
    const template = templates.find(t => t.locale === locale && t.type === type)
    const date = randBetweenDate({ from: new Date('08/04/2022'), to: currentDate })
    let payload: Payload = {}
    if (type === 'file-copied')
      payload = { file: randFileName(), folder: randJobArea(), user: randFullName() }

    if (type === 'folder-created')
      payload = { folder: randJobArea(), user: randFullName() }

    notifications.push({
      id: randUuid(),
      type,
      userId,
      read: false,
      createdAt: date.toString(),
      updatedAt: date.toString(),
      content: template ? template.content(payload) : '',
      actionUrl: 'https://notifir.github.io/widget',
    })
  }

  notifications.sort((a, b) =>
    new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf(),
  )
  notifications[0].actionUrl = ''

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

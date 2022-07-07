import { gql } from 'graphql-tag'

export const getNotifications = gql`
  query getUserNotifications($locale: String!) {
    allNotifications(orderBy: CREATED_AT_DESC) {
      nodes {
        id
        createdAt
        nodeId
        payload
        read
        type
        updatedAt
        userId
        template(locale: $locale) {
          content
        }
      }
    }  
  }
`

export const notificationChanged = gql`
  subscription notificationChanged($userId: String!, $locale: String!) {
    notificationsUpdated(userId: $userId) {
      event
      notification {
        id
        createdAt
        nodeId
        payload
        read
        type
        updatedAt
        userId
        template(locale: $locale) {
          content
        }
      }
    }
  }
`

export const markAsRead = gql`
  mutation markAsRead($id: UUID!) {
    updateNotificationById(input: {notificationPatch: {read: true}, id: $id}) {
      notification {
        id
      }
    }
  }
`

export const markAllAsRead = gql`
  mutation markAllAsRead {
    markAllNotificationsAsRead {
      updated
    }
  }
`

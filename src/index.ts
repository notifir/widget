import { gql } from 'graphql-tag'
import { customElement, property, state } from 'lit/decorators.js'
import { ApolloQuery, html } from '@apollo-elements/lit-apollo'
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client/core'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { bellStyles } from './bellStyles'

const createWsLink = (uri: string, userKey: string) => {
  const url = new URL(uri)
  const protocol = url.hostname.includes('localhost') ? 'ws' : 'wss'
  const options = { reconnect: true, connectionParams: { 'authorization-key': userKey } }
  const wsUri = `${protocol}://${url.host}${url.pathname}`

  return new WebSocketLink({ uri: wsUri, options })
}

const createHttpLink = (uri: string, userKey: string) =>
  new HttpLink({ uri, headers: { 'authorization-key': userKey } })

const splitLink = (uri: string, userKey: string) => ApolloLink.split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  createWsLink(uri, userKey),
  createHttpLink(uri, userKey),
)

interface Notification {
  payload: string
  type: string
  updatedAt: string
  read: boolean
}

interface Data {
  allNotifications: {
    nodes: Array<Notification>
  }
}

interface SubscriptionData {
  data: {
    notificationsUpdated: {
      notification: Notification
    }
  }
}

export const client = (uri: string, userKey: string) =>
  new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            allNotifications: {
              merge(existing = [], incoming: any) {
                return { ...existing, ...incoming }
              },
            },
          },
        },
      },
    }),
    link: splitLink(uri, userKey),
    ssrForceFetchDelay: 100,
  })

const query = gql`
  query getUserNotifications {
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
      }
    }
  }
`

const subscription = gql`
  subscription notificationChanged($userId: String!) {
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
      }
    }
  }`

/**
 * Notification Bell.
 */
@customElement('notification-bell')
export class NotificationBell extends ApolloQuery {
  static styles = bellStyles

  @property({ type: Boolean })
    mock = false

  @property({ type: String })
    apiUrl = ''

  @property({ type: String })
    userKey = ''

  @state()
  protected _open = false

  private _handleBellClick() {
    this._open = !this._open
  }

  protected _format(str: string, values: string) {
    const args = JSON.parse(values)
    for (const attr in args)
      str = str.split(`{${attr}}`).join(args[attr])

    return str
  }

  protected _templates = (type: string) => {
    switch (type) {
      case 'entry-created':
        return 'The entry {entryTitle} in {stepTitle} was created in {folderTitle} by {user}.'
      case 'entry-moved':
        return 'The entry {entryTitle} in {folderTitle} was moved from step {fromStepTitle} to step {toStepTitle} by {user}.'
      default:
        return ''
    }
  }

  render() {
    const { data, loading } = this
    const items = data && (data as Data).allNotifications && (data as Data).allNotifications.nodes
    const unreadCount = items && (items as Array<Notification>).filter(node => !node.read).length

    return html`
      <div>
        <div class="bell" @click="${this._handleBellClick}">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell-fill" viewBox="0 0 16 16">
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
          </svg>
          ${(unreadCount as number) > 0 ? html`<div class="bell-counter">${unreadCount}</div>` : ''}
        </div>

        <div class="popup">
          <div class="container ${this._open ? 'open' : 'close'}">
            <div class="header">Notifications</div>
            <div class="items-list">
              ${!loading && items && (items as Array<Notification>).map((item, index) =>
                html`<div class="item">
                  ${index !== 0 ? html`<div class="divider"></div>` : ''} 
                  ${!item.read ? html`<div class="item-unread"></div>` : ''}
                  <div class="item-text-primary">${this._format(this._templates(item.type), item.payload)}</div>
                  <div class="item-text-secondary">${new Date(item.updatedAt).toLocaleString()}</div>
                </div>`,
              )}
            </div>
          </div>
        </div>
      </div>
    `
  }

  connectedCallback() {
    super.connectedCallback()
    this.client = client(this.apiUrl, this.userKey)
    this.query = query
  }

  firstUpdated() {
    this.subscribeToMore({
      document: subscription,
      variables: { userId: this.userKey },
      updateQuery: (prev, { subscriptionData }) => {
        const { notification } = (subscriptionData as SubscriptionData).data.notificationsUpdated

        return Object.assign({}, prev, {
          allNotifications: {
            nodes: [notification, ...(prev as Data).allNotifications.nodes],
          },
        })
      },
    })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'notification-bell': NotificationBell
  }
}

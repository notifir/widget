import { nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { ApolloQuery, html } from '@apollo-elements/lit-apollo'
import { localized, msg } from '@lit/localize'
import type { StyleInfo } from 'lit/directives/style-map.js'
import { styleMap } from 'lit/directives/style-map.js'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import { bellStyles } from './bellStyles'
import { client } from './client'
import { getNotifications, markAllAsRead, markAsRead, notificationChanged } from './queries'
import { formatDate } from './util/format'
import { getLocale, setLocale } from './util/localization'
import { mockClient } from './mock'

export interface Notification {
  id: string
  type: string
  createdAt: string
  updatedAt: string
  read: boolean
  userId: string
  content: string
  actionUrl: string
}

interface Data {
  allNotifications: {
    nodes: Array<Notification>
    __typename: string
  }
}

interface SubscriptionData {
  data: {
    notificationsUpdated: {
      notification: Notification
      event: string
    }
  }
}

interface Stylesheet {
  bell: StyleInfo
  bellCounter: StyleInfo
  popup: StyleInfo
  container: StyleInfo
  header: StyleInfo
  headerLink: StyleInfo
  headerTitle: StyleInfo
  itemsList: StyleInfo
  itemContent: StyleInfo
  itemTextPrimary: StyleInfo
  itemTextSecondary: StyleInfo
}

interface Messages {
  notifications: string
  markAllAsRead: string
  empty: string
  error: string
}

/**
 * Notification Bell.
 */
@localized()
@customElement('notification-bell')
export class NotificationBell extends ApolloQuery {
  static styles = bellStyles

  @property({ type: Boolean })
    mock = false

  @property({ type: String })
    apiUrl = ''

  @property({ type: String })
    apiKey = ''

  @property({ type: String })
    userId = ''

  @property({ type: String })
    userHmac = ''

  @property({ type: Object })
    styles = {}

  @property({ type: Object })
    messages = {}

  @property({ type: String })
    locale = 'en-GB'

  @state()
  protected _open = false

  private _changeWidgetVisibility() {
    this._open = !this._open
  }

  protected async _handleItemClick(id: String, read: boolean, actionUrl: string) {
    if (this.client && !read)
      await this.client.mutate({ mutation: markAsRead, variables: { id } })

    if (actionUrl)
      window.open(actionUrl, '_self')
  }

  protected async _markAllAsRead(unreadCount: number) {
    if (this.client && unreadCount > 0)
      return await this.client.mutate({ mutation: markAllAsRead })

    return null
  }

  headerTemplate(unreadCount: number) {
    const styles = this.styles as Stylesheet
    const messages = this.messages as Messages

    return html`
      <div class="header" style=${styleMap(styles.header || nothing)}>
        <span class="header-link" style=${styleMap(styles.headerLink || nothing)} @click="${() => this._markAllAsRead(unreadCount)}">
          ${messages.markAllAsRead || msg('Mark all as read', { id: 'mark-all-as-read' })}
        </span>
        <span class="header-title" style=${styleMap(styles.headerTitle || nothing)}>${messages.notifications || msg('Notifications', { id: 'notifications' })}</span>
      </div>
    `
  }

  contentTemplate(items: Array<Notification>) {
    const { loading, error } = this
    const styles = this.styles as Stylesheet
    const messages = this.messages as Messages

    if (loading)
      return html`<div class="loader-container"><div class="loader"></div></div>`

    if (error)
      return html`<div class="status error">${messages.error || msg('Something went wrong...', { id: 'error' })}</div>`

    if (!error && items.length === 0)
      return html`<div class="status">${messages.empty || msg('You don’t have any notifications...', { id: 'empty' })}</div>`

    return html`
      <div class="items-list" style=${styleMap(styles.itemsList || nothing)}>
        ${items.map(item => item.content ? this.itemContentTemplate(item) : nothing)}
      </div>
    `
  }

  itemContentTemplate(item: Notification) {
    const styles = this.styles as Stylesheet

    return html`
      <div class="item" style=${styleMap(styles.itemContent || nothing)} @click="${() => this._handleItemClick(item.id, item.read, item.actionUrl)}">
        ${!item.read ? html`<div class="item-unread"></div>` : nothing}
        <div class="item-text-primary" style=${styleMap(styles.itemTextPrimary || nothing)}>
          ${html`${unsafeHTML(item.content)}`}
        </div>
        <div class="item-text-secondary" style=${styleMap(styles.itemTextSecondary || nothing)}>
          ${formatDate(item.createdAt, getLocale())}
        </div>
      </div>
    `
  }

  render() {
    const { data } = this
    const styles = this.styles as Stylesheet
    const nodes = data && (data as Data).allNotifications && (data as Data).allNotifications.nodes
    const items = (nodes || []) as Array<Notification>
    const unreadCount = items.filter(node => !node.read).length as number

    return html`
      <div>
        <div class="bell" style=${styleMap(styles.bell || nothing)} @click="${this._changeWidgetVisibility}">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-bell-fill" viewBox="0 0 16 16">
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
          </svg>
          ${unreadCount > 0
            ? html`<div class="bell-counter" style=${styleMap(styles.bellCounter || nothing)}>${unreadCount >= 100 ? '99+' : unreadCount}</div>`
            : nothing
          }
        </div>

        <div class="popup" style=${styleMap(styles.popup || nothing)}>
          <div class="container ${this._open ? 'open' : 'close'}" style=${styleMap(styles.container || nothing)}>
            ${this.headerTemplate(unreadCount)}
            ${this.contentTemplate(items)}
          </div>
        </div>
      </div>
    `
  }

  constructor() {
    super()
    window.addEventListener('click', (event) => {
      if (this._open && event.target !== this)
        this._changeWidgetVisibility()
    })
  }

  connectedCallback() {
    super.connectedCallback()
    this.client = this.mock ? mockClient(this.locale) : client(this.apiUrl, this.apiKey, this.userId, this.userHmac)
    this.variables = { locale: this.locale }
    this.query = getNotifications
    setLocale(this.locale)
  }

  firstUpdated() {
    this.subscribeToMore({
      document: notificationChanged,
      variables: { apiKey: this.apiKey, userId: this.userId, userHmac: this.userHmac, locale: this.locale },
      updateQuery: (prev, { subscriptionData }) => {
        const { notification, event } = (subscriptionData as SubscriptionData).data.notificationsUpdated
        const { __typename, nodes } = (prev as Data).allNotifications

        if (event === 'notification_created')
          return Object.assign({}, prev, { allNotifications: { __typename, nodes: [notification, ...nodes] } })

        // notification_updated
        const newNotifications = nodes.map(prev => prev.id === notification.id ? notification : prev)
        return Object.assign({}, prev, { allNotifications: { __typename, nodes: newNotifications } })
      },
    })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'notification-bell': NotificationBell
  }
}

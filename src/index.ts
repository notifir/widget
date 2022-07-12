import { nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { ApolloQuery, html } from '@apollo-elements/lit-apollo'
import { localized, msg } from '@lit/localize'
import type { StyleInfo } from 'lit/directives/style-map.js'
import { styleMap } from 'lit/directives/style-map.js'
import { bellStyles } from './bellStyles'
import { client } from './client'
import { getNotifications, markAllAsRead, markAsRead, notificationChanged } from './queries'
import { formatDate, formatString } from './util/format'
import { getLocale, setLocale } from './util/localization'

interface Notification {
  id: string
  payload: string
  type: string
  createdAt: string
  updatedAt: string
  read: boolean
  template: {
    content: string
  }
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
    userKey = ''

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

  protected async _markAsRead(id: String, read: boolean) {
    if (this.client && !read)
      return await this.client.mutate({ mutation: markAsRead, variables: { id } })

    return null
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
        <span class="header-title">${messages.notifications || msg('Notifications', { id: 'notifications' })}</span>
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
        ${items.map((item, index) => this.contentItemTemplate(item, index !== 0))}
      </div>
    `
  }

  contentItemTemplate(item: Notification, dividerRequired: boolean) {
    const styles = this.styles as Stylesheet

    return html`
      <div class="item" style=${styleMap(styles.itemContent || nothing)} @click="${() => this._markAsRead(item.id, item.read)}">
        ${dividerRequired ? html`<div class="divider"></div>` : nothing} 
        ${!item.read ? html`<div class="item-unread"></div>` : nothing}
        <div class="item-text-primary" style=${styleMap(styles.itemTextPrimary || nothing)}>
          ${formatString(item.template.content, item.payload)}
        </div>
        <div class="item-text-secondary" style=${styleMap(styles.itemTextSecondary || nothing)}>
          ${formatDate(item.updatedAt, getLocale())}
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
            ? html`<div class="bell-counter" style=${styleMap(styles.bellCounter || nothing)}>${unreadCount}</div>`
            : nothing
          }
        </div>

        <div class="popup">
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
    this.client = client(this.apiUrl, this.userKey)
    this.variables = { locale: this.locale }
    this.query = getNotifications
    setLocale(this.locale)
  }

  firstUpdated() {
    this.subscribeToMore({
      document: notificationChanged,
      variables: { userId: this.userKey, locale: this.locale },
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

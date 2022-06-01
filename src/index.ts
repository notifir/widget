import { gql } from 'graphql-tag'
import { css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { ApolloQuery, html } from '@apollo-elements/lit-apollo'
import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink } from '@apollo/client/core'

interface Notification {
  payload: string
  type: string
  updatedAt: string
}

interface Data {
  allNotifications: {
    nodes: Array<Notification>
  }
}

const createLink = (uri: string, userKey: string) => createHttpLink({ uri: uri || '/graphql/', headers: { 'authorization-key': userKey } })

export const client = (uri: string, userKey: string) =>
  new ApolloClient({ cache: new InMemoryCache(), link: ApolloLink.from([createLink(uri, userKey)]) })

const query = gql`
  query getUserNotifications {
    allNotifications {
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

/**
 * Notification Bell.
 */
@customElement('notification-bell')
export class NotificationBell extends ApolloQuery {
  static styles = css`
    .x-notifications-popup-container {
      width: 400px;
      height: 400px;
      z-index: 9999;
      border: 1px solid #ccc;
    }

    .x-notifications-close { display: none; }
    .x-notifications-open { display: block; }

    .x-notifications-bell {
      cursor: pointer;
      position: relative;
      width: 1.5rem;
      height: 1.5rem;
    }

    .x-notifications-bell svg {
      width: 1.5rem;
      height: 1.5rem;
    }

    .x-notifications-bell-counter { 
      position: absolute;
      top: 0%;
      left: 60%;
      font-size: 0.5rem;
      border-radius: 50%;
      width: 0.7rem;
      height: 0.7rem;
      background-color: red;
      color: #FFFFFF;
      text-align: center;
      line-height: 0.7rem;
    }

    .x-notifications-bell-counter:empty {
      display: none;
    }

    .x-notifications-popup-container {
      width: 400px;
      height: 400px;
      font-size: 1rem;
      position: absolute;
      overflow-y: scroll;
      padding: 10px;
      margin-top: 10px;
      border-radius: 1%;
      border: 1px solid rgb(0,0,0,0.1);        
      background-color: #F6FAFD;
      font-size: 14px;
      line-height: 17px;
      font-weight: 300;
      font-family: Verdana, geneva, sans-serif;
    }
    
    .x-notifications-header {
      color: #444C60;
      font-weight: bold;
      padding: 7px 15px 13px;
      border-bottom: 1px solid #bbb;
    }

    .x-notifications-list-element {
      padding: 8px;
    }
    
    .divider {
      border-top: 1px solid #bbb;
    }

    .x-notifications-list-element-text {
      font-size: 14px;
      line-height: 1.2em;
      color: #444C60;
      vertical-align: top;
      padding: 10px 0px 0px 10px;
    }
    
    .x-notifications-list-element-sub-text {
      padding: 5px 10px 0px 10px;
      color: #757C85;
      font-size: 13px;
    }
  `

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

    return html`
      <div class="x-notifications-bell-wrapper">
        <div class="x-notifications-bell" @click="${this._handleBellClick}">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell-fill" viewBox="0 0 16 16">
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
          </svg>
          ${data && (data as Data).allNotifications && (data as Data).allNotifications.nodes.length > 0
          && html`<div class="x-notifications-bell-counter">${(data as Data).allNotifications.nodes.length}</div>`}
        </div>
        
        <div class="x-notifications-popup-container ${this._open ? 'x-notifications-open' : 'x-notifications-close'}">
          <div class = "x-notifications-header">Notifications</div>
          ${!loading && data && (data as Data).allNotifications && (data as Data).allNotifications.nodes.map((item: Notification, index) =>
            html`<div class = "x-notifications-list-element">
              <div class = "x-notifications-list-element-text ${index === 0 ? '' : 'divider'}">${this._format(this._templates(item.type), item.payload)}</div>
              <div class = "x-notifications-list-element-sub-text">${new Date(item.updatedAt).toLocaleString()}</div>
              </a>
            </div>`)}
        </div>
      </div>
    `
  }

  connectedCallback() {
    super.connectedCallback()
    this.client = client(this.apiUrl, this.userKey)
    this.query = query
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'notification-bell': NotificationBell
  }
}

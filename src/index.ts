import { gql } from 'graphql-tag'
import { css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { ApolloQuery, html } from '@apollo-elements/lit-apollo'
import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink } from '@apollo/client/core'

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
      width: 2rem;
      height: 2rem;
    }

    .x-notifications-bell svg {
      width: 2rem;
      height: 2rem;
    }

    .x-notifications-bell-counter { 
      position: absolute;
      top: 0%;
      left: 60%;
      font-size: 0.6rem;
      border-radius: 50%;
      width: 1rem;
      height: 1rem;
      background-color: #FF4C13;
      color: #FFFFFF;
      text-align: center;
      line-height: 1rem;
    }

    .x-notifications-bell-counter:empty {
      display: none;
    }

    .x-notifications-popup-container {
      width: 400px;
      height: 400px;
      transition: 0.5s;
      font-size: 1rem;
      position: absolute;
      overflow-y: scroll;
      padding: 10px;
      margin-top: 10px;
      border-radius: 1%;
      background-color: #FFFFFF;
      border: 1px solid rgb(0,0,0,0.1);
      -webkit-box-shadow: 10px 10px 23px 0px rgba(0,0,0,0.1);
      -moz-box-shadow: 10px 10px 23px 0px rgba(0,0,0,0.1);
      box-shadow: 10px 10px 23px 0px rgba(0,0,0,0.1);
    }

    .x-notifications-list-element {
      padding: 10px 10px;
      background-color: #F4F4F4;
      transition: 0.5s;
      border-style: none none solid none;
      border-color: red;
    }

    .x-notifications-list-element-text {
      vertical-align: top;
      font-size: 1.15rem;
      padding: 5px 10px 0px 10px;
    }
    
    .x-notifications-list-element-sub-text {
      padding: 5px 10px 0px 10px;
      font-size: 1rem;
      color: grey;
    }
  `

  @property({ type: Boolean })
    mock = false

  @property({ type: String })
    apiUrl = null

  @property({ type: String })
    userKey = null

  @state()
  protected _open = false

  private _handleBellClick() {
    this._open = !this._open
  }

  private format(str: string, values: string) {
    const args = JSON.parse(values)
    for (const [key, value] of Object.entries(args))
      str = str.split(`{${key}}`).join(value)

    return str
  }

  private templates = {
    'entry-created': 'The entry {entryTitle} in {stepTitle} was created in {folderTitle} by {user}.',
    'entry-moved': 'The entry {entryTitle} in {folderTitle} was moved from step {fromStepTitle} to step {toStepTitle} by {user}.',
  }

  render() {
    const { data, loading } = this

    return html`
      <div class="x-notifications-bell-wrapper">
        <div class="x-notifications-bell" @click="${this._handleBellClick}">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
          </svg>
          ${data && data.allNotifications && data.allNotifications.nodes.length > 0
          && html`<div class="x-notifications-bell-counter">${data.allNotifications.nodes.length}</div>`}
        </div>
        
        <div class="x-notifications-popup-container ${this._open ? 'x-notifications-open' : 'x-notifications-close'}">
          ${!loading && data && data.allNotifications && data.allNotifications.nodes.map(item =>
            html`<div class = "x-notifications-list-element">
              <div class = "x-notifications-list-element-text">${this.format(this.templates[item.type], item.payload)}</div>
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

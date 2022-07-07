import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client/core'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'

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

export const client = (uri: string, userKey: string) =>
  new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        allNotifications: {
          keyFields: ['id'],
        },
      },
    }),
    link: splitLink(uri, userKey),
    ssrForceFetchDelay: 100,
  })

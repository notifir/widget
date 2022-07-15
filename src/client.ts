import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client/core'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import { getMainDefinition } from '@apollo/client/utilities'

const createWsLink = (uri: string, userKey: string) => {
  const url = new URL(uri)
  const protocol = url.hostname.includes('localhost') ? 'ws' : 'wss'
  const wsUri = `${protocol}://${url.host}${url.pathname}`

  return new GraphQLWsLink(
    createClient({
      url: wsUri,
      connectionParams: { 'authorization-key': userKey },
      lazy: true,
    }),
  )
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

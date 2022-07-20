import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client/core'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import { getMainDefinition } from '@apollo/client/utilities'

const createWsLink = (uri: string, apiKey: string, userId: string, userHmac: string) => {
  const url = new URL(uri)
  const protocol = url.hostname.includes('localhost') ? 'ws' : 'wss'
  const wsUri = `${protocol}://${url.host}${url.pathname}`

  const connectionParams = userHmac
    ? { 'x-api-key': apiKey, 'x-user-id': userId, 'x-user-hmac': userHmac } // HMAC authentication
    : { 'x-api-key': apiKey, 'x-user-id': userId } // Plain authentication

  return new GraphQLWsLink(
    createClient({
      url: wsUri,
      connectionParams,
      lazy: true,
    }),
  )
}

const createHttpLink = (uri: string, apiKey: string, userId: string, userHmac: string) =>
  userHmac
    ? new HttpLink({ uri, headers: { 'x-api-key': apiKey, 'x-user-id': userId, 'x-user-hmac': userHmac } }) // HMAC authentication
    : new HttpLink({ uri, headers: { 'x-api-key': apiKey, 'x-user-id': userId } }) // Plain authentication

const splitLink = (uri: string, apiKey: string, userId: string, userHmac: string) => ApolloLink.split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  createWsLink(uri, apiKey, userId, userHmac),
  createHttpLink(uri, apiKey, userId, userHmac),
)

export const client = (uri: string, apiKey: string, userId: string, userHmac: string) =>
  new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        allNotifications: {
          keyFields: ['id'],
        },
      },
    }),
    link: splitLink(uri, apiKey, userId, userHmac),
    ssrForceFetchDelay: 100,
  })

import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client/core'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import { getMainDefinition } from '@apollo/client/utilities'

function getHasuraHeaders() {
  const headers: Record<string, string> = {
    'x-hasura-role': import.meta.env.VITE_HASURA_ROLE,
  }

  const secret = import.meta.env.VITE_HASURA_ADMIN_SECRET || import.meta.env.VITE_HASURA_ACCESS_KEY
  if (secret) {
    headers['x-hasura-admin-secret'] = secret
  }

  return headers
}

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_HASURA_HTTP,
  headers: getHasuraHeaders(),
})

// Optional (for subscriptions)
const wsLink = new GraphQLWsLink(
  createClient({
    url: import.meta.env.VITE_HASURA_WS,
    connectionParams: async () => ({
      headers: getHasuraHeaders(),
    }),
  }),
)

const link = split(
  ({ query }) => {
    const def = getMainDefinition(query)
    return def.kind === 'OperationDefinition' && def.operation === 'subscription'
  },
  wsLink,
  httpLink,
)

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})
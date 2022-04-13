
import {
    ApolloClient,
    createHttpLink,
    ApolloLink,
    InMemoryCache
} from '@apollo/client';

import {onError} from '@apollo/client/link/error'
import auth from './auth'

const httpLink = createHttpLink({
    uri: 'http://localhost:4001/graphql'
});

const authMiddleware = () =>
    new ApolloLink((operation, forward) => {
        // add the authorization to the headers
        if (auth.getToken()) {
            operation.setContext({
                headers: {
                    authorization: `Bearer ${auth.getToken()}`,
                },
            });
        }

        return forward(operation);
    });

const cache = new InMemoryCache({});

export const useAppApolloClient = () => {
    return new ApolloClient({
        link: authMiddleware().concat(httpLink),
        cache,
    });
};

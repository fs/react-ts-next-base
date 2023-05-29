## Short description
1. App must be wrapped to `withApolloClient` hoc that adds access to graphql server

2. Each time when we send request to the graphql server, `withApolloClient` hoc checks or modifies the request using special modules (Apollo links): 
  - `consoleLink`: adds information about the request to the console
  - `errorLink`: checks for errors in the server response, if error is due to expired token, adds flag to the context
  - `authHeaderLink`: adds `Cookie` header to the request
  - `refreshTokenLink`: checks the token and updates expired or non existing token
  - `httpLink`: sends each request (operation) to your GraphQL server

3. GraphQL server response returns to client through all apollo links

#

## Available HOCs

### Main:
### [**withApolloClient**](./withApolloClient.tsx):
Adds apollo client and tokens (access and refresh tokens object) to the cookies.
> Use once as a wrapper for your application

### [**withAuthSyncEvents**](./auth/withAuthSyncEvents.tsx):
Listens storage event, if one of global events (`SIGN_OUT_EVENT`/`SIGN_IN_EVENT`) occurs, it reloads the page

### [**withTokensUpdate**](./auth/withTokensUpdate.tsx):
Gets user data and new pair of tokens (access and refresh) and sets them in the cookie

### [**withAuth**](./auth/withAuth.tsx):
Just combines two auth HOC's - `withTokensUpdate`
and `withAuthSyncEvents`

#

### Additional:
### [**withAuthSecurity**](./auth/withAuthSecurity.tsx):
Adds to page the ability to redirect from private content, if the user is not logged in

> **Briefly**: For not logged in user and private content

### [**withNotAuthSecurity**](./auth/withNotAuthSecurity.tsx):
Adds to page the ability to redirect from specific page, if the user is logged in, but the content of that page should not be accessible

> **Briefly**: For logged in user and private content

## Short description
> **TODO**
#

## Available HOCs

### Main:
### [**withAccessTokenManager**](./auth/withAccessTokenManager.tsx):
Creates object containing access and refresh tokens.
> **TODO:** why we need this object?

Adds accessTokenManager (access and refresh tokens object) to every page, that will be wrapped with this hoc.
Used in `withApolloClient` hoc

### [**withApolloClient**](./withApolloClient.tsx):
Uses internally `withAccessTokenManager` hoc.
Adds apollo client and accessTokenManager (access and refresh tokens object) to application.
> Use once as a wrapper for your application

### [**withAuthSyncEvents**](./auth/withAuthSyncEvents.tsx):
Listens storage event, if one of global events (`SIGN_OUT_EVENT`/`SIGN_IN_EVENT`) occurs, it reloads the page

### [**withTokensUpdate**](./auth/withTokensUpdate.tsx):
Gets new pair of tokens (access and refresh) and sets the refresh token in the cookie

### [**withAuth**](./auth/withAuth.tsx):
Just combines two auth HOC's - `withTokensUpdate`
and `withAuthSyncEvents`

#

### Additional:
### [**withAuthSecurity**](./auth/withAuthSecurity.tsx):
Adds to page the ability to redirect from private content, if the user is not logged in

> **Briefly**: For not logged in user and private content

### [**withNotAuthSecurity**](./auth/withNotAuthSecurity.tsx):
> **TODO**

Adds to page the ability to redirect from specific page, if the user is logged in, but the content of that page should not be accessible

> **Briefly**: For logged in user and private content

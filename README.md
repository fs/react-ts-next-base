# react-ts-next-base

### Install dependencies

Run `yarn`

> **Note**: you must have the required version of Node.js installed, as specified in the [package.json](package.json) file

#

### Setup environment for development

Create `.env` file at the root of project with the necessary variables that are specified in the file [.env.example](.env.example)

Request the values for the variables from the admin

> **Note**: If you create new variables, don't forget to add them to the [next.config.mjs](next.config.mjs) and [.env.example](.env.example) files

###

Ask for token and key from admin

#

### Development server

- Run `yarn server` for a dev server.
- Open `localhost:8080`.

> The app will automatically reload if you change any of the source files.

### Yarn tasks

- `server` - local server on 8080 port by default
- `build` - build Next.js
- `test` - run Jest tests with autowatch for changes
- `ci:jest` - run Jest in CI without watch
- `ci:pw-run` - run Playwright in CI with production build Next.js server
- `lint:js` - run eslint
- `lint:css` - run stylelint
- `print-env` - run print-env to print environment variables
- `pw-run` - run playwright tests
- `gen:types` - run gen graphql-codegen for generate types
- `sb` - run local storybook server on 6006 port

#

### Useful links
#### For project:
- [Best practices for working with styled components](./public/styles/bestPractiseForStyledComponents.md)
- [How auth process works](./lib/AuthProcess.md)

#### To work more efficiently:

- [Apollo Client Developer Tools](https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm)

#

### Deploy

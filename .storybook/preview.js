import React from 'react';
import { ThemeProvider } from 'styled-components';
import NiceModal from '@ebay/nice-modal-react';
import GlobalStyles from 'public/styles/globalStyles';
import theme from 'public/styles/theme';
import { MockedProvider } from '@apollo/client/testing';
import { NotifierProvider } from 'contexts/NotifierContext';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import 'react-toastify/dist/ReactToastify.css';

import Notifier from 'components/shared/atoms/Notifier';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    expanded: true,
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
  options: {
    // display panel that shows addon configurations
    showPanel: true,
    // where to show the addon panel --- @type {('bottom'|'right')}
    panelPosition: 'bottom',
  },
  apolloClient: {
    MockedProvider,
    // any props you want to pass to MockedProvider on every story
  },
};

export const decorators = [
  Story => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

    return (
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache({}) })}>
        <NotifierProvider>
          <ThemeProvider theme={theme}>
            <NiceModal.Provider>
              <GlobalStyles />
              <Story />
            </NiceModal.Provider>
          </ThemeProvider>
          <Notifier />
        </NotifierProvider>
      </ApolloProvider>
    )
  },
];

import * as jest from "jest-mock";
import { Story } from '@storybook/react';
import NiceModal from '@ebay/nice-modal-react';
import { ThemeProvider } from 'styled-components';
import { MockedProvider } from '@apollo/client/testing';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import 'react-toastify/dist/ReactToastify.css';

import theme from 'public/styles/theme';
import GlobalStyles from 'public/styles/globalStyles';
import { NotifierProvider } from 'contexts/NotifierContext';

import Notifier from 'components/shared/atoms/Notifier';
import useCalculateVh from 'hooks/useCalculateVh';

// ts-ignore
window.jest = jest as any;

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
  (Story: Story) => {
    useCalculateVh();

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
    );
  },
];

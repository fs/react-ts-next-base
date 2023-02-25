import React, { useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.css';
import NiceModal from '@ebay/nice-modal-react';
import { ThemeProvider } from 'styled-components';

import { CurrentUserProvider } from 'contexts/CurrentUserContext';
import { NotifierProvider } from 'contexts/NotifierContext';
import { HistoryProvider } from 'contexts/HistoryContext';
import { withApolloClient } from 'lib/withApolloClient';

import Notifier from 'components/shared/atoms/Notifier';

import GlobalStyles from 'public/styles/globalStyles';
import theme from 'public/styles/theme';

import { TAppPage } from 'lib/apollo/types';
import isSSR from 'config/isSSR';

// Custom styles
import 'public/styles/custom.css';
import 'public/styles/animation.css';

const MyApp: TAppPage = ({ Component, pageProps, router, accessTokenManager, apolloClient }) => {
  const { query } = router;

  const calculateVh = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  useEffect(() => {
    if (!isSSR) {
      calculateVh();
      window.addEventListener('resize', calculateVh);
      window.addEventListener('orientationchange', calculateVh);
    }
  }, []);

  return (
    <CurrentUserProvider>
      <NotifierProvider>
        <HistoryProvider router={router}>
          <Head>
            <title>React ts next base</title>
          </Head>
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            <NiceModal.Provider>
              <Component
                {...pageProps}
                query={query}
                accessTokenManager={accessTokenManager}
                apolloClient={apolloClient}
              />
            </NiceModal.Provider>
          </ThemeProvider>
          <Notifier />
        </HistoryProvider>
      </NotifierProvider>
    </CurrentUserProvider>
  );
};

export default withApolloClient(MyApp);

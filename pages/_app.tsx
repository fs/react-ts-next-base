import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { CurrentUserProvider } from 'contexts/CurrentUserContext';
import { NotifierProvider } from 'contexts/NotifierContext';
import { withApolloClient } from 'lib/withApolloClient';
import NiceModal from '@ebay/nice-modal-react';

import useCalculateVh from 'hooks/useCalculateVh';

import GlobalStyles from 'public/styles/globalStyles';
import theme from 'public/styles/theme';
import { TAppPage } from 'lib/apollo/types';

import Notifier from 'components/shared/atoms/Notifier';

import 'react-toastify/dist/ReactToastify.css';
// Custom styles
import 'public/styles/custom.css';

const MyApp: TAppPage = ({ Component, pageProps, router, accessTokenManager, apolloClient }) => {
  const { query } = router;
  useCalculateVh();

  return (
    <CurrentUserProvider>
      <NotifierProvider>
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
      </NotifierProvider>
    </CurrentUserProvider>
  );
};

export default withApolloClient(MyApp);

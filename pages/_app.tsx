import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { Provider } from '@rollbar/react';
import 'react-toastify/dist/ReactToastify.css';
import NiceModal from '@ebay/nice-modal-react';
import { ThemeProvider } from 'styled-components';
import { isIE, isMobileOnly } from 'react-device-detect';

import { CurrentUserProvider } from 'contexts/CurrentUserContext';
import { NotifierProvider } from 'contexts/NotifierContext';
import { HistoryProvider } from 'contexts/HistoryContext';
import { withApolloClient } from 'lib/withApolloClient';

import Notifier from 'components/shared/atoms/Notifier';
import IeWarning from 'components/pages/IeWarning';
import MobileWarningPage from 'components/pages/MobileWarningPage';

import GlobalStyles from 'public/styles/globalStyles';
import theme from 'public/styles/theme';

import { YANDEX_METRIKA_ID } from 'config/vars';
import { TAppPage } from 'lib/apollo/types';
import isSSR from 'config/isSSR';

// Custom styles
import 'public/styles/custom.css';
import 'public/styles/animation.css';

const rollbarConfig = {
  accessToken: `${process.env.CLIENT_ROLLBAR_KEY}`,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: 'client-side',
  },
};

const MyApp: TAppPage = ({ Component, pageProps, router, accessTokenManager, apolloClient }) => {
  const { query } = router;
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const calculateVh = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  useEffect(() => {
    setIsMobile(isMobileOnly);

    if (!isSSR) {
      calculateVh();
      window.addEventListener('resize', calculateVh);
      window.addEventListener('orientationchange', calculateVh);
    }
  }, []);

  if (isIE) {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <IeWarning />
      </ThemeProvider>
    );
  }

  if (isMobile) {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <MobileWarningPage />
      </ThemeProvider>
    );
  }

  return (
    <Provider config={rollbarConfig}>
      <CurrentUserProvider>
        <NotifierProvider>
          <HistoryProvider router={router}>
            <Head>
              <title>MEDAGREGATOR</title>
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
                {YANDEX_METRIKA_ID && (
                  <Script
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                      __html: `
                  (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                  m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                  (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

                  ym(${YANDEX_METRIKA_ID}, "init", {
                        clickmap:true,
                        trackLinks:true,
                        accurateTrackBounce:true
                  });
                `,
                    }}
                  />
                )}
              </NiceModal.Provider>
            </ThemeProvider>
            <Notifier />
          </HistoryProvider>
        </NotifierProvider>
      </CurrentUserProvider>
    </Provider>
  );
};

export default withApolloClient(MyApp);

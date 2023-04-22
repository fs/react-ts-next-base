import { useEffect } from 'react';
import Router from 'next/router';
import omit from 'lodash/omit';

import globalEvents from 'config/globalEvents.json';
import { TNextPage } from 'lib/apollo/types';

const { SIGN_IN_EVENT, SIGN_OUT_EVENT } = globalEvents;

const withAuthSyncEvents = (Page: TNextPage): TNextPage => {
  const syncAuthHandler = (event: StorageEvent) => {
    switch (event.key) {
      case SIGN_OUT_EVENT:
      case SIGN_IN_EVENT:
        Router.reload();
        break;
      default:
        break;
    }
  };

  const WithAuthSyncEvents: TNextPage = ({ ...pageProps }) => {
    useEffect(() => {
      window.addEventListener('storage', syncAuthHandler);
      return () => {
        window.removeEventListener('storage', syncAuthHandler);
      };
    }, []);

    return <Page {...pageProps} />;
  };

  WithAuthSyncEvents.getInitialProps = context => {
    const ctx = omit(context, ['req', 'res']);
    return Page.getInitialProps ? Page.getInitialProps(context) : ctx;
  };

  return WithAuthSyncEvents;
};

export default withAuthSyncEvents;

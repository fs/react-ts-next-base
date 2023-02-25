import React from 'react';
import omit from 'lodash/omit';

import checkCanVisitPage from 'rbac/checkCanVisitPage';

import ErrorPage from 'pages/_error';
import { TNextPage } from 'lib/apollo/types';

const withRoutesRules = (Page: TNextPage): TNextPage => {
  const WithRoutesRules: TNextPage = ({ ...pageProps }) => {
    const { canVisit } = pageProps;
    return canVisit ? <Page {...pageProps} /> : <ErrorPage statusCode={404} {...pageProps} />;
  };

  WithRoutesRules.getInitialProps = context => {
    const ctx = omit(context, ['req', 'res']);

    return Page.getInitialProps
      ? Page.getInitialProps({ ...context, canVisit: checkCanVisitPage(context) })
      : { ...ctx, canVisit: checkCanVisitPage(context) };
  };

  return WithRoutesRules;
};

export default withRoutesRules;

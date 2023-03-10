import React from 'react';
import omit from 'lodash/omit';

import { TNextPage } from './types';

const withGetDataFromTree = (Page: TNextPage) => {
  const WithGetDataFromTree: TNextPage = pageProps => {
    return <Page {...pageProps} />;
  };

  WithGetDataFromTree.getInitialProps = async context => {
    const { AppTree } = context;
    const pageProps = Page.getInitialProps
      ? await Page.getInitialProps(context)
      : omit(context, ['res', 'req']);

    // Only on the server
    if (typeof window === 'undefined' && 'AppTree' in context) {
      try {
        // Run all GraphQL queries
        const { getDataFromTree } = await import('@apollo/client/react/ssr');

        const props = {
          ...pageProps,
          pageProps: { ...pageProps },
        };

        await getDataFromTree(<AppTree {...props} />);
      } catch (error) {
        // Prevent Apollo Client GraphQL errors from crashing SSR.
        // Handle them in components via the data.error prop:
        // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
        console.error('Error while running `getDataFromTree`', error);
      }
    }

    return pageProps;
  };

  return WithGetDataFromTree;
};

export default withGetDataFromTree;

import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

const MyDocument = () => {
  return (
    <Html>
      <Head>
        <link rel="shortcut icon" type="image/png" href="/images/icons/favicon.ico" />
        <link href="/styles/fonts.css" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const styledComponentsSheet = new ServerStyleSheet();
  const view = ctx.renderPage;
  try {
    ctx.renderPage = () =>
      view({
        enhanceApp: App => props => {
          return styledComponentsSheet.collectStyles(<App {...props} />);
        },
      });
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: [initialProps.styles, styledComponentsSheet.getStyleElement()],
    };
  } finally {
    styledComponentsSheet.seal();
  }
};

export default MyDocument;

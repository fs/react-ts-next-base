import { NextPageContext } from 'next';

export type TErrorPage = {
  statusCode?: number;
};

export type TInitialProps = NextPageContext & {
  statusCode: number;
};

export type TStatusCode = Pick<NextPageContext, 'res' | 'err'>;

import { NextPage } from 'next';
import Link from 'next/link';

import useRouter from 'hooks/useRouter';

import { HOME } from 'config/routes';

import { Description, StyledLink, TitleWrapper } from './styled';
import { TErrorPage, TInitialProps } from './types';

const ErrorPage: NextPage<TErrorPage> = ({ statusCode }) => {
  const is404 = statusCode === 404;
  const { back } = useRouter();

  const links = (
    <>
      <StyledLink onClick={back}>Back to previous page</StyledLink> or{' '}
      <Link passHref href={HOME}>
        contact us
      </Link>{' '}
      for help.
    </>
  );

  let title = 'Something went wrong.';
  let description = links;

  if (is404) {
    title = "The page you're looking for can't be found.";
    description = <>You didn&apos;t do anything wrong, we may have moved the page. {links}</>;
  }

  return (
    <TitleWrapper data-testid="error-page-text">
      <h1>{title}</h1>
      <Description>{description}</Description>
    </TitleWrapper>
  );
};

ErrorPage.getInitialProps = ({ res, err, statusCode }: TInitialProps) => {
  return {
    statusCode: statusCode || res?.statusCode || err?.statusCode || 404,
  };
};

export default ErrorPage;

import { FC } from 'react';

import { TLoader } from './types';
import { sizeConfig } from './config';
import { LoaderWrapper, Spinner } from './styled';

const Loader: FC<TLoader> = ({
  variant = 'default',
  testId,
  size = sizeConfig[variant].spinner,
  ...props
}) => {
  return (
    <LoaderWrapper data-testid={testId} size={sizeConfig[variant]}>
      <Spinner size={size} {...props}>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </Spinner>
    </LoaderWrapper>
  );
};

export default Loader;

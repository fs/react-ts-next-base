import React, { FC } from 'react';

import { HOME } from 'config/routes';

import LogoIcon from 'public/images/logo.svg';

import { LogoWrapper } from './styled';

const Logo: FC = () => {
  return (
    <LogoWrapper href={HOME} passHref>
      <LogoIcon />
    </LogoWrapper>
  );
};

export default Logo;

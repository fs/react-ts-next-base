import React from 'react';

import { HOME } from 'config/routes';

import { TLogo } from './types';
import { LogoWrapper, TextLogo, TextLogoWrapper, MainLogo } from './styled';

const Logo: React.FunctionComponent<TLogo> = ({ isLight = false }) => (
  <LogoWrapper href={HOME} passHref>
    <MainLogo
      src={`${process.env.ASSET_HOST}/images/main-Logo.png`}
      alt="mainLogo"
      isLight={isLight}
    />
    <TextLogoWrapper isLight={isLight}>
      <TextLogo />
    </TextLogoWrapper>
  </LogoWrapper>
);

export default Logo;

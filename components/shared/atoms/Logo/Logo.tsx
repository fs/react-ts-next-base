import { FC } from 'react';

import LogoIcon from 'public/images/logo.svg';
import { HOME } from 'config/routes';

import { LogoWrapper } from './styled';

const Logo: FC = () => {
  return (
    <LogoWrapper href={HOME} passHref>
      <LogoIcon />
    </LogoWrapper>
  );
};

export default Logo;

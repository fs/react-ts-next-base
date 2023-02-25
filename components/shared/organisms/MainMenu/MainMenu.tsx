import React from 'react';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';

import MenuList from './MenuList';

import { MenuWrapper, CloseButtonWrapper } from './styled';
import { TMainMenu } from './types';

const MainMenu: React.FC<TMainMenu> = ({ toggleMenu, wrapperRef }) => {
  return (
    <MenuWrapper ref={wrapperRef}>
      <MenuList />
      <CloseButtonWrapper>
        <Button
          variant="hollow"
          iconType="only"
          icon={<Icon name="close" $color="white" />}
          onClick={toggleMenu}
        />
      </CloseButtonWrapper>
    </MenuWrapper>
  );
};

export default MainMenu;

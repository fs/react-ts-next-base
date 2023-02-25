import React from 'react';

import useCurrentUser from 'hooks/useCurrentUser';
import useCloseOnOutsideClick from 'hooks/useCloseOnOutsideClick';

import Header from 'components/shared/organisms/Header';
import MainMenu from 'components/shared/organisms/MainMenu';
import SidebarMenu from 'components/shared/organisms/SidebarMenu';
import ErrorBoundary from 'components/shared/molecules/ErrorBoundary/ErrorBoundary';

import { Wrapper, Content } from './styled';
import { TLayoutTemplate } from './types';

const LayoutTemplate: React.FunctionComponent<TLayoutTemplate> = ({
  children,
  variant = 'light',
  isShowMainMenu = true,
  testId = 'layout-template',
  isShowScroll = true,
  contentRef,
}) => {
  const { user } = useCurrentUser();
  const [isMenuOpened, setIsMenuOpened, refMainMenu, refTogglerMenu] = useCloseOnOutsideClick();
  const [isSidebarOpened, setIsSidebarOpened, refSidebarMenu] = useCloseOnOutsideClick();

  const toggleMenu = () => {
    setIsMenuOpened(!isMenuOpened);
  };

  const toggleSidebar = () => {
    setIsSidebarOpened(!isSidebarOpened);
  };

  return (
    <Wrapper data-testid={testId} data-cy={testId}>
      {isShowMainMenu && <MainMenu toggleMenu={toggleMenu} wrapperRef={refMainMenu} />}
      <Content
        isMenuOpened={isMenuOpened}
        isShowScroll={isShowScroll}
        id="layout-template-content"
        ref={contentRef}
      >
        <Header
          toggleMenu={toggleMenu}
          toggleSidebar={toggleSidebar}
          isLight={variant === 'light'}
          isShowMenu={isShowMainMenu}
          contentRef={contentRef}
          // @ts-ignore
          refTogglerMenu={refTogglerMenu}
        />

        <ErrorBoundary>{children}</ErrorBoundary>
      </Content>

      {user && (
        <SidebarMenu
          user={user}
          isSidebarOpened={isSidebarOpened}
          toggleSidebar={toggleSidebar}
          wrapperRef={refSidebarMenu}
        />
      )}
    </Wrapper>
  );
};

export default LayoutTemplate;

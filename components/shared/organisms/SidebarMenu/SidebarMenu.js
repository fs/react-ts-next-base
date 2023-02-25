import React, { useState, useEffect } from 'react';

import { useModal } from '@ebay/nice-modal-react';
import { useSignOut } from 'lib/apollo/hooks/actions/auth';

import { BUYER } from 'config/constants/directions';
import {
  HOME,
  COMPANIES_RATING,
  DASHBOARD,
  EDIT_PROFILE,
  DASHBOARD_COMPANY_PRODUCTS,
  DASHBOARD_COMPANY_ORDERS,
  DASHBOARD_COMPANY_INFO,
  DASHBOARD_COMPANY_REVIEWS,
} from 'config/routes';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';
import ActionLink from 'components/shared/atoms/ActionLink';
import SupportRequestModal from 'components/shared/molecules/SupportRequestModal';

import MenuSettings from './MenuSettings';
import Menu from './Menu';

import { Wrapper, RowFooter, SettingsLink, CloseButton } from './styled';

const SidebarMenu = ({ user, toggleSidebar, isSidebarOpened, wrapperRef }) => {
  const [signOut] = useSignOut();
  const [isSidebarSettingsActive, setIsSidebarSettingsActive] = useState(false);
  const supportRequestModal = useModal(SupportRequestModal);

  const { menuItems, mainCompany } = user;
  // TODO: need add condition if mainCompany = null , Links call error
  // params.mainCompanyId should be string or don't render
  const { id: mainCompanyId, direction } = mainCompany || { id: 'null' };
  const isBuyer = direction === BUYER;

  useEffect(() => {
    setIsSidebarSettingsActive(false);
  }, [isSidebarOpened]);

  const onSignOut = () => {
    toggleSidebar();
    signOut();
  };

  const onSupportRequestLinkClick = async () => {
    await supportRequestModal.show({});
  };

  const toggleSidebarSettings = () => {
    setIsSidebarSettingsActive(!isSidebarSettingsActive);
  };

  const links = [
    { text: 'Личный кабинет', url: DASHBOARD, id: 'DASHBOARD' },
    // TODO: https://www.pivotaltracker.com/story/show/181507205
    // { text: 'Уведомления', url: HOME, id: 'NOTIFICATIONS' },
    { text: 'Настройки профиля', url: EDIT_PROFILE, id: 'EDIT_PROFILE' },
    mainCompany && {
      text: isBuyer ? 'Мои заказы / Споры' : 'Заказы / Споры',
      url: DASHBOARD_COMPANY_ORDERS,
      params: { companyId: mainCompanyId },
      id: 'ORDERS',
    },
    isBuyer && { text: 'Избранное', url: HOME, id: 'FAVORITES' },
  ].filter(Boolean);

  const additionalLinks = {
    MY_PRODUCTS: {
      text: 'Мои товары',
      url: DASHBOARD_COMPANY_PRODUCTS,
      params: { companyId: mainCompanyId },
      id: 'MY_PRODUCTS',
      isSelected: false,
    },
    REVIEWS: {
      text: 'Отзывы',
      url: DASHBOARD_COMPANY_REVIEWS,
      params: { companyId: mainCompanyId },
      id: 'REVIEWS',
      isSelected: false,
    },
    COMPANY: {
      text: 'Данные о компании',
      url: DASHBOARD_COMPANY_INFO,
      params: { companyId: mainCompanyId },
      id: 'COMPANY',
      isSelected: false,
    },
    RATING: { text: 'Рейтинг', url: COMPANIES_RATING, id: 'RATING', isSelected: false },
    // TODO: https://www.pivotaltracker.com/story/show/181507205
    // SERVICE_PACKAGE: { text: 'Пакет услуг', url: HOME, id: 'SERVICE_PACKAGE', isSelected: false },
    // PERSONAL_ASSISTANT: {
    //   text: 'Персональный помощник',
    //   url: HOME,
    //   id: 'PERSONAL_ASSISTANT',
    //   isSelected: false,
    // },
    // TRANSACTION_INSURANCE: {
    //   text: 'Страхование сделки',
    //   url: HOME,
    //   id: 'TRANSACTION_INSURANCE',
    //   isSelected: false,
    // },
    // FINANCIAL_INSTRUMENTS: {
    //   text: 'Финансовые инструменты',
    //   url: HOME,
    //   id: 'FINANCIAL_INSTRUMENTS',
    //   isSelected: false,
    // },
  };

  if (menuItems && menuItems.length > 0) {
    menuItems.forEach(menuItem => {
      if (!additionalLinks[menuItem.itemType]) {
        return;
      }

      if (isSidebarSettingsActive) {
        additionalLinks[menuItem.itemType] = {
          ...additionalLinks[menuItem.itemType],
          isSelected: true,
        };
      } else {
        const { text, url, params, id } = additionalLinks[menuItem.itemType];
        if (isBuyer && id === 'MY_PRODUCTS') return;
        links.push({ text, url, params, id });
      }
    });
  }

  links.push({ text: 'Выйти', onClick: onSignOut, type: 'action' });

  return (
    <Wrapper isSidebarOpened={isSidebarOpened} data-cy="sidebar" ref={wrapperRef}>
      {isSidebarSettingsActive ? (
        <MenuSettings
          links={links}
          additionalLinks={additionalLinks}
          setIsSidebarSettingsActive={setIsSidebarSettingsActive}
        />
      ) : (
        <Menu links={links} user={user} />
      )}

      <RowFooter isSidebarSettingsActive={isSidebarSettingsActive}>
        {!isSidebarSettingsActive && (
          <>
            <Icon name="menu-settings" $size={40} $color="blue" onClick={toggleSidebarSettings} />
            <SettingsLink onClick={toggleSidebarSettings}>Настроить меню</SettingsLink>
          </>
        )}

        <ActionLink $mt={8} size={14} $color="greyA3" onClick={onSupportRequestLinkClick}>
          Обратиться в поддержку
        </ActionLink>
      </RowFooter>

      <CloseButton>
        <Button
          variant="hollow"
          size="large"
          iconType="only"
          icon={<Icon name="arrow" $color="greyA3" />}
          onClick={isSidebarSettingsActive ? toggleSidebarSettings : toggleSidebar}
          testId="sidebar-close-button"
        />
      </CloseButton>
    </Wrapper>
  );
};

export default SidebarMenu;

import React from 'react';
import { useModal } from '@ebay/nice-modal-react';

import ActionLink from 'components/shared/atoms/ActionLink';
import SupportRequestModal from 'components/shared/molecules/SupportRequestModal';

import {
  HOME,
  ABOUT_US,
  AGREEMENT,
  CONTRACT,
  DASHBOARD,
  CATALOG,
  NEWS,
  COMPANIES_RATING,
  COMPANIES_BLACK_LIST,
} from 'config/routes';

import { MenuListWrapper, TopList, BottomList, BottomNestedList, BottomHelpList } from './styled';

const MenuList = () => {
  const supportRequestModal = useModal(SupportRequestModal);

  const onSupportRequestLinkClick = async () => {
    await supportRequestModal.show({});
  };
  return (
    <MenuListWrapper>
      <TopList>
        <ActionLink label="Главная" href={HOME} size={18} $color="white" />

        <ActionLink label="О нас" href={ABOUT_US} size={18} $color="white" />

        <ActionLink label="Каталог товаров" href={CATALOG} size={18} $color="white" />

        <ActionLink label="Рейтинг компаний" href={COMPANIES_RATING} size={18} $color="white" />

        <ActionLink label="Черный список" href={COMPANIES_BLACK_LIST} size={18} $color="white" />

        <ActionLink label="Новости" href={NEWS} size={18} $color="white" />
      </TopList>

      <BottomList>
        <BottomNestedList>
          <ActionLink label="Личный кабинет" href={DASHBOARD} size={18} $color="white" />

          <ActionLink label="Правила пользования" href={CONTRACT} size={18} $color="white" />

          <ActionLink
            label="Обработка персональных данных"
            href={AGREEMENT}
            size={18}
            $color="white"
          />
        </BottomNestedList>

        <BottomHelpList>
          <ActionLink
            label="Пример электронного договора"
            href={`${process.env.ASSET_HOST}/files/example-e-contract.pdf`}
            size={18}
            $color="white"
            target="_blank"
            rel="no-referrer"
          />

          <ActionLink
            label="Обратиться в поддержку"
            onClick={onSupportRequestLinkClick}
            size={18}
            $color="white"
          />
        </BottomHelpList>
      </BottomList>
    </MenuListWrapper>
  );
};

export default MenuList;

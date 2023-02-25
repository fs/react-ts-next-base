import React from 'react';
import useRouter from 'hooks/useRouter';

import { SELLER } from 'config/constants/directions';

import {
  DASHBOARD_COMPANY_PRODUCTS,
  DASHBOARD_COMPANY_PRODUCT,
  DASHBOARD_COMPANY_ORDERS,
  DASHBOARD_COMPANY_ORDER,
  DASHBOARD_COMPANY_ORDER_TRACKING,
  DASHBOARD_COMPANY_INFO,
  DASHBOARD_COMPANY_ADDRESSES,
  DASHBOARD_COMPANY_NOTIFICATIONS,
  DASHBOARD_COMPANY_RATING,
  DASHBOARD_COMPANY_DOCUMENTS,
  DASHBOARD_COMPANY_CREATE_DEMAND,
  DASHBOARD_COMPANY_ADVERTISEMENT,
  DASHBOARD_COMPANY_ASSISTANT,
  DASHBOARD_COMPANY_INSURANCE,
  DASHBOARD_COMPANY_FINANCIAL_INSTRUMENTS,
  DASHBOARD_COMPANY_TARIFF,
  DASHBOARD_COMPANY_REVIEWS,
  DASHBOARD_COMPANY_OPEN_DISPUTE,
  DASHBOARD_COMPANY_CREATE_DISPUTE_PROPOSAL,
  DASHBOARD_COMPANY_ORDER_DOCUMENTS,
  DASHBOARD_COMPANY_CREATE_RETURNED_SHIPMENT,
} from 'config/routes';

import { productTypes } from 'components/pages/dashboard/companyProducts/constants';
import { documentsTypes } from 'components/pages/dashboard/companyDocuments/constants';

import Finances from './Finances';

import { MenuWrapper, StyledMenuLink } from './styled';

const sellerMenu = [
  { url: DASHBOARD_COMPANY_INFO, label: 'Данные о компании' },
  { url: DASHBOARD_COMPANY_NOTIFICATIONS, label: 'Уведомления' },
  {
    url: DASHBOARD_COMPANY_PRODUCTS,
    label: 'Мои товары',
    params: { type: productTypes.ACTIVE },
    routes: [DASHBOARD_COMPANY_PRODUCT, DASHBOARD_COMPANY_PRODUCTS],
  },
  {
    url: DASHBOARD_COMPANY_ORDERS,
    label: 'Заказы / Споры',
    routes: [
      DASHBOARD_COMPANY_ORDER,
      DASHBOARD_COMPANY_ORDERS,
      DASHBOARD_COMPANY_OPEN_DISPUTE,
      DASHBOARD_COMPANY_CREATE_DISPUTE_PROPOSAL,
    ],
  },
  { url: DASHBOARD_COMPANY_REVIEWS, label: 'Отзывы' },
  { url: DASHBOARD_COMPANY_RATING, label: 'Рейтинг' },
  { url: DASHBOARD_COMPANY_ADDRESSES, label: 'Адреса' },
  {
    url: DASHBOARD_COMPANY_DOCUMENTS,
    params: { type: documentsTypes.ALL },
    label: 'Документы',
    routes: [DASHBOARD_COMPANY_ORDER_DOCUMENTS, DASHBOARD_COMPANY_DOCUMENTS],
  },
  { url: DASHBOARD_COMPANY_ADVERTISEMENT, label: 'Моя реклама / О нас в новостях' },
  { url: DASHBOARD_COMPANY_ASSISTANT, label: 'Персональный помощник' },
  { url: DASHBOARD_COMPANY_INSURANCE, label: 'Страхование сделки' },
  { url: DASHBOARD_COMPANY_FINANCIAL_INSTRUMENTS, label: 'Финансовые инструменты' },
  { url: DASHBOARD_COMPANY_TARIFF, label: 'Тариф' },
];

const buyerMenu = [
  { url: DASHBOARD_COMPANY_INFO, label: 'Данные о компании' },
  { url: DASHBOARD_COMPANY_NOTIFICATIONS, label: 'Уведомления' },
  {
    url: DASHBOARD_COMPANY_ORDERS,
    label: 'Мои заказы / Споры',
    routes: [
      DASHBOARD_COMPANY_ORDER,
      DASHBOARD_COMPANY_ORDERS,
      DASHBOARD_COMPANY_ORDER_TRACKING,
      DASHBOARD_COMPANY_OPEN_DISPUTE,
      DASHBOARD_COMPANY_CREATE_DISPUTE_PROPOSAL,
      DASHBOARD_COMPANY_CREATE_RETURNED_SHIPMENT,
    ],
  },
  { url: DASHBOARD_COMPANY_REVIEWS, label: 'Отзывы' },
  { url: DASHBOARD_COMPANY_ADDRESSES, label: 'Адреса' },
  {
    url: DASHBOARD_COMPANY_DOCUMENTS,
    params: { type: documentsTypes.ALL },
    label: 'Документы',
    routes: [DASHBOARD_COMPANY_ORDER_DOCUMENTS, DASHBOARD_COMPANY_DOCUMENTS],
  },
  { url: DASHBOARD_COMPANY_CREATE_DEMAND, label: 'Создать спрос на товар' },
  { url: DASHBOARD_COMPANY_ASSISTANT, label: 'Персональный помощник' },
  { url: DASHBOARD_COMPANY_INSURANCE, label: 'Страхование сделки' },
  { url: DASHBOARD_COMPANY_FINANCIAL_INSTRUMENTS, label: 'Финансовые инструменты' },
  { url: DASHBOARD_COMPANY_TARIFF, label: 'Тариф' },
];

const CompanyMenu = ({ company }) => {
  const { id: companyId, direction } = company || {};

  const { pathname } = useRouter();

  const menuItems = direction === SELLER ? sellerMenu : buyerMenu;

  return (
    <MenuWrapper data-cy="company-menu-sidebar">
      {menuItems.map(({ url, label, params, routes }) => {
        const isActive = routes ? routes.some(page => pathname === page) : pathname === url;

        return (
          <StyledMenuLink
            $isActive={isActive}
            href={{ pathname: url, query: { companyId, ...params } }}
            passHref
            key={label}
          >
            {label}
          </StyledMenuLink>
        );
      })}

      <Finances company={company} />
    </MenuWrapper>
  );
};

export default CompanyMenu;

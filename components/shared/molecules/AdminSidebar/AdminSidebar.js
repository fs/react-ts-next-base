import React from 'react';
import useRouter from 'hooks/useRouter';

import useCurrentUser from 'hooks/useCurrentUser';

import checkAccess from 'rbac/checkAccess';
import { showAdministratorsRule } from 'rbac/rules';

import {
  ADMIN_ACCOUNT,
  ADMIN_REQUESTS,
  ADMIN_REQUEST,
  ADMIN_USERS,
  ADMIN_COMPANIES,
  ADMIN_COMPANY,
  ADMIN_ADMINISTRATORS,
  ADMIN_ADMINISTRATOR,
  ADMIN_CREATE_ADMINISTRATOR,
  ADMIN_ANALYTICAL_ACCOUNT,
  ADMIN_PRODUCTS,
  ADMIN_PRODUCT,
  ADMIN_PRODUCT_CONFIRM,
  ADMIN_USER,
  ADMIN_REVIEWS,
  ADMIN_ADDRESSES,
  ADMIN_CATEGORIES,
  ADMIN_ADDRESS,
  ADMIN_CHARACTERISTICS,
  ADMIN_CHARACTERISTIC,
  ADMIN_CATEGORY,
  ADMIN_ANALYTICAL_ACCOUNT_DOCUMENTS,
  ADMIN_DISPUTES,
  ADMIN_DISPUTE,
  ADMIN_ORDERS,
  ADMIN_CREATE_DISPUTE_PROPOSAL,
  ADMIN_PRIORITY_PRODUCTS,
} from 'config/routes';

import { AdminSidebarWrapper, StyledMenuLink } from './styled';

const AdminSidebar = () => {
  const { user } = useCurrentUser();
  const { pathname } = useRouter();

  const isShowAdministrators = checkAccess(user?.systemRole, showAdministratorsRule);

  const menu = [
    { label: 'Личный кабинет', url: ADMIN_ACCOUNT },
    {
      label: 'Заявки',
      url: ADMIN_REQUESTS,
      routes: [ADMIN_REQUESTS, ADMIN_REQUEST],
    },
    {
      label: 'Споры по заказам',
      url: ADMIN_DISPUTES,
      routes: [ADMIN_DISPUTES, ADMIN_DISPUTE, ADMIN_CREATE_DISPUTE_PROPOSAL],
    },
    { label: 'Пользователи', url: ADMIN_USERS, routes: [ADMIN_USERS, ADMIN_USER] },
    {
      label: 'Компании',
      url: ADMIN_COMPANIES,
      routes: [ADMIN_COMPANY, ADMIN_COMPANIES],
    },
    isShowAdministrators && {
      label: 'Админы',
      url: ADMIN_ADMINISTRATORS,
      routes: [ADMIN_ADMINISTRATORS, ADMIN_ADMINISTRATOR, ADMIN_CREATE_ADMINISTRATOR],
    },
    {
      label: 'Аналитический счет',
      url: ADMIN_ANALYTICAL_ACCOUNT,
      routes: [ADMIN_ANALYTICAL_ACCOUNT, ADMIN_ANALYTICAL_ACCOUNT_DOCUMENTS],
    },
    {
      label: 'Товары',
      url: ADMIN_PRODUCTS,
      routes: [ADMIN_PRODUCTS, ADMIN_PRODUCT, ADMIN_PRODUCT_CONFIRM],
    },
    {
      label: 'Приоритетная выдача',
      url: ADMIN_PRIORITY_PRODUCTS,
      routes: [ADMIN_PRIORITY_PRODUCTS],
    },
    {
      label: 'Адреса и лицензии',
      url: ADMIN_ADDRESSES,
      routes: [ADMIN_ADDRESSES, ADMIN_ADDRESS],
    },
    {
      label: 'Отзывы',
      url: ADMIN_REVIEWS,
    },
    {
      label: 'Категории',
      url: ADMIN_CATEGORIES,
      routes: [ADMIN_CATEGORIES, ADMIN_CATEGORY],
    },
    {
      label: 'Характеристики',
      url: ADMIN_CHARACTERISTICS,
      routes: [ADMIN_CHARACTERISTICS, ADMIN_CHARACTERISTIC],
    },
    {
      label: 'Заказы',
      url: ADMIN_ORDERS,
      routes: [ADMIN_ORDERS],
    },
  ].filter(Boolean);

  return (
    <AdminSidebarWrapper>
      {menu.map(({ label, url, routes }, index) => {
        const isActive = routes ? routes.some(page => pathname === page) : pathname === url;
        return (
          <StyledMenuLink $isActive={isActive} href={url} passHref key={index}>
            {label}
          </StyledMenuLink>
        );
      })}
    </AdminSidebarWrapper>
  );
};

export default AdminSidebar;

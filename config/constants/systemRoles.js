import { SystemRoleEnum } from 'graphql/types';

export const systemRole = {
  [SystemRoleEnum.Admin]: 'Администратор',
  [SystemRoleEnum.Superadmin]: 'Супер-администратор',
  [SystemRoleEnum.Client]: 'Пользователь',
  [SystemRoleEnum.Guest]: 'Гость',
};

export const getSystemRole = role => systemRole[role];

export const isUserAdmin = role => [SystemRoleEnum.Admin, SystemRoleEnum.Superadmin].includes(role);

export const isRegisteredUser = role =>
  [SystemRoleEnum.Admin, SystemRoleEnum.Superadmin, SystemRoleEnum.Client].includes(role);

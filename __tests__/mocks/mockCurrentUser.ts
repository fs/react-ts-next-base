import { ApolloError } from '@apollo/client';
import { OrderCheckoutStatusEnum, SystemRoleEnum } from 'graphql/types';

import mockCompany from './mockCompany';
import { mockGuestReservedUserOrders, mockGuestUserOrders } from './mockGuestUserOrders';

export const mockCurrentUser = {
  __typename: 'CurrentUser' as const,
  id: '1',
  email: 'test.test@test.com',
  firstName: 'Test',
  lastName: 'Test',
  menuItems: [],
  middleName: 'Test',
  phoneNumber: '9171234567',
  avatarUrl: null,
  emailMailingEnabled: false,
  emailNotificationsDisabled: false,
  phoneMailingEnabled: false,
  phoneNotificationsDisabled: false,
  guestUserOrders: [],
  role: {
    id: 'owner',
    name: 'Владелец',
  },
  mainCompany: mockCompany,
  systemRole: SystemRoleEnum.Client,
};

export const mockUseCurrentUserRegisteredData = {
  user: mockCurrentUser,
  mainCompanyId: '1',
  isUserBuyer: true,
  isRegisteredUser: true,
  isAdmin: false,
  isGuest: false,
  loading: false,
  error: new ApolloError({}),
  refetch: jest.fn(),
  networkStatus: 7,
};

export const mockUseCurrentUserRegisteredWithGuestOrdersData = {
  user: {
    ...mockCurrentUser,
    guestUserOrders: mockGuestUserOrders,
    systemRole: SystemRoleEnum.Guest,
  },
  mainCompanyId: undefined,
  isUserBuyer: false,
  isRegisteredUser: false,
  isGuest: true,
  isAdmin: false,
  loading: false,
  error: new ApolloError({}),
  refetch: jest.fn(),
  networkStatus: 7,
};

export const mockUseCurrentUserRegisteredWithReservedGuestOrdersData = {
  user: {
    ...mockCurrentUser,
    guestUserOrders: mockGuestReservedUserOrders,
    systemRole: SystemRoleEnum.Guest,
  },
  mainCompanyId: undefined,
  isUserBuyer: false,
  isRegisteredUser: false,
  isGuest: true,
  isAdmin: false,
  loading: false,
  error: new ApolloError({}),
  refetch: jest.fn(),
  networkStatus: 7,
};

export const mockUseCurrentUserGuestData = {
  user: {
    ...mockCurrentUser,
    mainCompany: null,
    guestUserOrders: mockGuestUserOrders,
    systemRole: SystemRoleEnum.Guest,
  },
  mainCompanyId: undefined,
  isUserBuyer: false,
  isRegisteredUser: false,
  isGuest: true,
  isAdmin: false,
  loading: false,
  error: new ApolloError({}),
  refetch: jest.fn(),
  networkStatus: 7,
};

export const mockUseCurrentWithGuestOrdersData = {
  user: {
    ...mockCurrentUser,
    mainCompany: null,
    guestUserOrders: mockGuestUserOrders,
    systemRole: SystemRoleEnum.Client,
  },
  mainCompanyId: undefined,
  isUserBuyer: false,
  isRegisteredUser: true,
  isGuest: true,
  isAdmin: false,
  loading: false,
  error: new ApolloError({}),
  refetch: jest.fn(),
  networkStatus: 7,
};

export const mockUseCurrentWithReservedGuestOrdersData = {
  user: {
    ...mockCurrentUser,
    mainCompany: null,
    guestUserOrders: mockGuestUserOrders.map(guestOrder => ({
      ...guestOrder,
      order: { ...guestOrder.order, checkoutStatus: OrderCheckoutStatusEnum.Reserved },
    })),
    systemRole: SystemRoleEnum.Client,
  },
  mainCompanyId: undefined,
  isUserBuyer: false,
  isRegisteredUser: true,
  isGuest: true,
  isAdmin: false,
  loading: false,
  error: new ApolloError({}),
  refetch: jest.fn(),
  networkStatus: 7,
};

export const mockUseCurrentWithoutGuestOrdersData = {
  user: {
    ...mockCurrentUser,
    mainCompany: null,
    guestUserOrders: [],
    systemRole: SystemRoleEnum.Guest,
  },
  mainCompanyId: undefined,
  isUserBuyer: false,
  isRegisteredUser: false,
  isGuest: true,
  isAdmin: false,
  loading: false,
  error: new ApolloError({}),
  refetch: jest.fn(),
  networkStatus: 7,
};

export const mockUseCurrentInvitedUser = {
  user: { ...mockCurrentUser, email: 'joined.user@test.com', phoneNumber: null, firstName: null },
  mainCompanyId: '1',
  isUserBuyer: false,
  isRegisteredUser: false,
  isGuest: false,
  isAdmin: false,
  loading: false,
  error: new ApolloError({}),
  refetch: jest.fn(),
  networkStatus: 7,
};

export default mockCurrentUser;

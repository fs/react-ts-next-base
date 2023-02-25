import { mockOrder, mockReservedOrder } from './mockOrders';
import { mockCities } from './mockCities';
import { mockUsers } from './mockUsers';

export const mockGuestUserOrders = [
  {
    __typename: 'GuestUserOrder' as const,
    city: mockCities[0],
    id: '1',
    user: mockUsers[0],
    order: mockOrder,
  },
];

export const mockGuestReservedUserOrders = [
  {
    __typename: 'GuestUserOrder' as const,
    city: mockCities[0],
    id: '1',
    user: mockUsers[0],
    order: mockReservedOrder,
  },
];

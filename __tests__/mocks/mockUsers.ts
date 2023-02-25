import { mockPageInfo } from './mockPageInfo';

export const mockUsers = [
  {
    __typename: 'User' as const,
    id: '136',
    avatarUrl: null,
    blockedAt: null,
    companyMembers: [
      {
        id: '332',
        user: {
          id: '136',
        },
        role: {
          id: 'owner',
          name: 'Владелец',
        },
        company: {
          __typename: 'Company' as const,
          id: '1',
          officialName: 'FIRST COMPANY',
          unofficialName: 'company medagregator',
        },
      },
      {
        id: '333',
        user: {
          id: '136',
        },
        role: {
          id: 'owner',
          name: 'Владелец',
        },
        company: {
          __typename: 'Company' as const,
          id: '1',
          officialName: 'FIRST COMPANY',
          unofficialName: 'company medagregator',
        },
      },
    ],
    createdAt: '2021-11-01T11:47:35Z',
    email: '1635767225833@test.com',
    firstName: 'Михаил',
    fullName: 'Булгаков Михаил Афанасьевич',
    lastName: 'Булгаков',
    middleName: 'Афанасьевич',
    phoneNumber: '5767225833',
    role: {
      id: 'owner',
      name: 'Владелец',
    },
    systemRole: null,
  },
];

export const mockUsersData = {
  users: {
    edges: mockUsers.map(user => ({
      node: user,
      cursor: '',
    })),
    pageInfo: mockPageInfo,
  },
};

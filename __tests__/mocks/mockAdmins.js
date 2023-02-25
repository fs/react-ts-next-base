import { mockPageInfo } from './mockPageInfo';

export const mockAdmins = [
  {
    __typename: 'User',
    avatarUrl: 'http://api.medagregator.ru/uploads/user/144/f24095a032de2697a2926a164ba291dc.png',
    companyMembers: [],
    email: 'superadmin@test.com',
    firstName: 'Dmitrii',
    id: '1',
    lastName: 'Dmitrievich',
    middleName: 'Sergeevich',
    phoneNumber: '1234561110',
    systemRole: 'SUPERADMIN',
  },
  {
    __typename: 'User',
    avatarUrl: 'http://api.medagregator.ru/uploads/user/143/eeb64ef77fe5d60e7a8e01d6d0530831.jpg',
    companyMembers: [],
    email: 'admin@test.com',
    firstName: 'Bob',
    id: '2',
    lastName: 'Ross',
    middleName: '',
    phoneNumber: '1234561114',
    systemRole: 'ADMIN',
  },
];

export const mockAdminsData = {
  admins: {
    edges: mockAdmins.map(admin => ({ cursor: '', node: admin })),
    pageInfo: mockPageInfo,
  },
};

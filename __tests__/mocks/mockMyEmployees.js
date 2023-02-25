import mockCompany from './mockCompany';

export const mockMyEmployees = [
  {
    __typename: 'User',
    email: 'test@gmail.com',
    id: '71',
    companyMembers: [
      {
        company: mockCompany,
      },
    ],
  },
  {
    __typename: 'User',
    email: 'test@gmail.com',
    id: '73',
    companyMembers: [
      {
        company: mockCompany,
      },
    ],
  },
];

export const mockMyEmployeessData = {
  myEmployees: {
    edges: mockMyEmployees.map(employee => ({ node: employee })),
  },
};
